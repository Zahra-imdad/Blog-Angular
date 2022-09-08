import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css'],
})
export class AddBlogComponent implements OnInit {
  fg: any = new FormControl();
  fb = new FormBuilder();
  addTitle: string = '';
  addContent: string = '';
  uploaded: string = '';
  tag: string[] = [];
  clicked:boolean=false

  constructor(
    private authService: AuthService,
    private blogService: BlogService
  ) {}

  ngOnInit(): void {
    this.fg = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required, Validators.minLength(200)]],
    });
  }
  get TitleInput() {
    return this.fg.get('title');
  }
  get ContentInput() {
    return this.fg.get('content');
  }

  addBlogs() {
    this.clicked=true
    if (this.TitleInput.value == '' || this.ContentInput.value == '') {
      this.uploaded = 'UPLOAD FAILED';
    } else {
      this.addTitle = this.fg.value.title;
      this.addContent = this.fg.value.content;

      const userId = this.authService.getLocalStorage();
      console.log(userId);
      if (!this.ContentInput.errors?.['minlength']) {
        this.blogService
          .addNewBlog(
            this.fg.value.title,
            this.fg.value.content,
            this.tag,
          )
          .subscribe(
            (data: any) => {
              console.log(data);
              console.log(data.blogPost.authorDetail);
              this.uploaded = 'BLOG ADDED SUCCESSFULLY';
            },
            (err) => {
              console.log(err.message);
              this.uploaded = 'FAILED';
            }
          );
        this.fg.value.title = '';
        this.fg.value.content = '';
      }
    }
  }

  onTagRemove(e: any) {
    this.tag = this.tag.filter((tag: any) => tag !== e);
    console.log('EVENT : ', e);
    console.log('TAG : ', this.tag);
  }
}
