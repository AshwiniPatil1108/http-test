import { Component, Input, OnInit } from '@angular/core';
import { Ipost } from '../../model/post';
import { PostService } from '../../service/post.service';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent implements OnInit {
@Input() post !:Ipost
  constructor(
    private _postSer : PostService
  ) {
   
   }

  ngOnInit(): void {
  }
  onEdit(){
    this._postSer.getPost(this.post.id)
                      .subscribe(res=>{
                        console.log(res)
                        let editPost:Ipost ={...res, id:this.post.id}
                        console.log(editPost);
                        this._postSer.editPostSub$.next(editPost)

                      })
                      window.scroll(0,0)

  }
}
