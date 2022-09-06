import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  blogs:any[]=[]
  comment:any[]=[]
  commentsCount:number =0 
  commentHandle:any


  constructor(private blogService:BlogService,private router:ActivatedRoute,private routerNav:Router) { }

  blogId:any
  ngOnInit(): void {
    this.SelectedBlog()
  }
  SelectedBlog(){
    this.blogId= this.router.snapshot.paramMap.get("id");
    console.log(this.blogId)
    this.blogService.getOneBlog(this.blogId).subscribe((data:any)=>{
      console.log("CHECKING DATA: ",data)
      console.log("CHECKING COMMENTS LENGTH: ",data.blogPosts[0].comments.length)
      this.commentsCount = data.blogPosts[0].comments.length
      this.blogs = data.blogPosts 
      console.log("SINGLE BLOG: ",this.blogs)
    })

  }
  back(){
    this.routerNav.navigate(['/home']);
  }
  parentComment(e:any){
  
    this.commentHandle = e;
    this.commentHandle= this.commentHandle[0].comments
    if(this.commentHandle.length !== this.commentsCount){
      this.commentsCount++
    }
    console.log("PARENT COMENT CHECK",this.commentHandle)
    console.log("PARENT Length",this.commentHandle.length)
  }
  
}
