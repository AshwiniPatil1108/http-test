import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ipost } from '../model/post';

@Injectable({
  providedIn: 'root'
})
export class PostService {
BASE_URL =`${environment.baseUrl}`;
POST_URL = `${this.BASE_URL}/posts.json`;
newPostSubj$ : Subject<Ipost>= new Subject<Ipost>();
editPostSub$ : Subject<Ipost>= new Subject<Ipost>();
updatePostSub$ : Subject<Ipost>= new Subject<Ipost>();
  constructor(
    private http : HttpClient
  ) { }

  fetchAllPosts():Observable<Array<Ipost>>{
    return this.http.get<Array<Ipost>>(this.POST_URL)
                    .pipe(
                      map((data:any)=>{
                        let postArr:Array<Ipost> =[];
                        for(const key in data){
                          postArr.push({...data[key], id:key})
                        }
                        return postArr
                      })
                    )
  }

  addPost(post:Ipost):Observable<any>{
    return this.http.post<any>(this.POST_URL, post)
  }

  getPost(id:string):Observable<Ipost>{
    let POST_URL = `${this.BASE_URL}/posts/${id}.json`
    return this.http.get<Ipost>(POST_URL)
  }

  updatePost(upadtedPost:Ipost):Observable<Ipost>{
    let UPDATE_URL =`${this.BASE_URL}/posts/${upadtedPost.id}.json`
    return this.http.patch<Ipost>(UPDATE_URL, upadtedPost)
  }
}
