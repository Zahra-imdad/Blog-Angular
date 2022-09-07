import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @ViewChild('commentInput') commentInput:any;
  @Input() blogId:any;
  comment:String=''
  Allcomments:any[]=[]
  @Output() commentHandle = new EventEmitter()
  //userName:string=''
  userId:any
  constructor(private blogService:BlogService,private authService:AuthService) { }
  
  ngOnInit(): void {
    this.showComments(this.blogId)

  }

  
  addComment(){
    
    console.log(this.commentInput.nativeElement.value)
    this.comment = this.commentInput.nativeElement.value
    console.log("ID:",this.blogId)
    this.blogService.addComment(this.blogId,{comment:this.comment}).subscribe((data:any)=>{
     this.Allcomments = data.blogComment.comments
     console.log("ALL COMMENTS : ",this.Allcomments)
      console.log("ADD: ",data)
      this.showComments(this.blogId)
      console.log("emitin : ",this.Allcomments)
      
    })
  }
  showComments(id:any){
    this.blogService.CurrentBlogComments(this.blogId).subscribe((data:any)=>{
      console.log("COMMENTS:" ,data.blogPosts)
      this.Allcomments = data.blogPosts
      console.log("ALL COMMENTS (SHOW)", this.Allcomments)
      this.commentHandle.emit(this.Allcomments)
      console.log("CHECKING CHILD",this.Allcomments[0].comments)
    })
  }

}
