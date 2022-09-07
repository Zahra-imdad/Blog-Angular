import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  blogs: any[] = [];
  totalLength: any;
  page: number = 1;

  @Output() blogId: any;
  constructor(private blogService: BlogService, private router: Router) {}

  ngOnInit(): void {
    this.showBlogs();
  }

  showBlogs() {
    this.blogService.getBlogs().subscribe((data: any) => {
      console.log(data.blogPosts);
      this.blogs = data.blogPosts;
    });
  }
  Blog(blog: any) {
    this.router.navigate(['/blog/' + blog._id]);
  }
}
