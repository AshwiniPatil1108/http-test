import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PostService } from '../../service/post.service';
import { Ipost } from '../../model/post';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit {
  userIdArr :Array<number>=[1,2,3,4,5,6,7,8,9,10]
  postForm!: FormGroup;
  editPostObj !:Ipost;
  isInEditMode:boolean=false;
  constructor(
    private _postSer : PostService
  ) { }

  ngOnInit(): void {
    this.createPostform()

    this._postSer.editPostSub$
                  .subscribe(post=>{
                    console.log(post)
                    this.editPostObj=post
                    this.isInEditMode=true;
                    this.postForm.patchValue(post)
                  })  
  }
  createPostform(){
    this.postForm= new FormGroup({
      title: new FormControl(null,[Validators.required]),
      body: new FormControl(null,[Validators.required]),
      userId :new FormControl(null,[Validators.required]),
    })
  }
  onsubmit(){
    if(this.postForm.valid){
      let post = this.postForm.value;
      console.log(post)
      this._postSer.addPost(post)
                    .subscribe(res =>{
                      console.log(res)
                      let obj = {...post, id:res.name}
                      this._postSer.newPostSubj$.next(obj)
                    })
                 this.postForm.reset()    
    }

  }

  onUpdate(){
    if(this.postForm.valid){
      let updatePost  ={...this.postForm.value, id:this.editPostObj.id}
      console.log(updatePost)

      this._postSer.updatePost(updatePost)
                    .subscribe(res=>{
                      console.log(res)
                      this.postForm.reset();
                      this.isInEditMode=false
                      this._postSer.updatePostSub$.next(res)
                    })
    }
  }

}
