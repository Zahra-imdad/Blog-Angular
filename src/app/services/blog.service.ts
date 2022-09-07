import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  constructor(private httpClient : HttpClient) { 
  }

  getBlogs(){
    return this.httpClient.get('http://localhost:3000/blog/get_all_blogs')
  }
  getOneBlog(id:any){
    return this.httpClient.get(`http://localhost:3000/blog/get_blogs/${id}`,)
  }
  addNewBlog(title:string, content:string,tags:any, authorDetail:any){
    return this.httpClient.post(`http://localhost:3000/blog/add_blog`,{title, content,tags, authorDetail})
  }
  CurrentUserBlogs(id:any){
    return this.httpClient.get(`http://localhost:3000/blog/current_user_blogs/${id}`,)
  }
  updateBlog(id:any,data:any){
    return this.httpClient.put(`http://localhost:3000/blog/update_blog/${id}`,data)
  }
  deleteBlog(id:any){
    return this.httpClient.delete(`http://localhost:3000/blog/delete_blog/${id}`)
  }

  // ================COMMENTS ======================================================
  addComment(id:any,data:any){
    return this.httpClient.put(`http://localhost:3000/blog/update_comment/${id}`,data)
  }
  CurrentBlogComments(id:any){
    return this.httpClient.get(`http://localhost:3000/blog/current_blogs_comments/${id}`)
  }

}
