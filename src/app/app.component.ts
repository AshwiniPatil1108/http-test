import { Component, inject, OnInit } from '@angular/core';
import { PostService } from './shared/service/post.service';
import { Ipost } from './shared/model/post';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'http-test';

  postArr!:Array<Ipost>
  private _postSer = inject(PostService)

  ngOnInit(): void {
     this._postSer.fetchAllPosts()
      .subscribe((data: any)=>{
        console.log(data)
        this.postArr = data
      })
      this._postSer.newPostSubj$
      .subscribe(res=>{
        this.postArr.unshift(res)
      })
      this._postSer.updatePostSub$
      .subscribe(res=>{
        let getIndex = this.postArr.findIndex(post => post.id === res.id)
        this.postArr[getIndex]=res
      })
  }
  getPost(eve:any){
    this.postArr.push(eve)
  }
}
