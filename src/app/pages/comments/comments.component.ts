import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  @ViewChild('commentInput') commentInput: any;
  @Input() blogId: any;
  comment: String = ''
  Allcomments: any[] = []
  @Output() commentHandle = new EventEmitter()

  userId: any
  constructor(private blogService: BlogService, private authService: AuthService) { }

  ngOnInit(): void {
    this.showComments(this.blogId)
  }

  addComment() {
    this.comment = this.commentInput.nativeElement.value
    console.log("ID:", this.blogId)
    this.blogService.addComment(this.blogId, { comment: this.comment }).subscribe((data: any) => {
      this.Allcomments = data.blogComment.comments
      console.log("ALL COMMENTS : ", this.Allcomments)
      this.showComments(this.blogId)

    })
    this.commentInput.nativeElement.value = ''
  }
  showComments(id: any) {
    this.blogService.CurrentBlogComments(this.blogId).subscribe((data: any) => {
      console.log("COMMENTS:", data.blogPosts)
      this.Allcomments = data.blogPosts
      this.commentHandle.emit(this.Allcomments)

    })
  }

}
