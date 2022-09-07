import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './interceptor/api.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavComponent } from './pages/nav/nav.component';
import { AddBlogComponent } from './pages/add-blog/add-blog.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';
import { CommentsComponent } from './pages/comments/comments.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AngularEditorModule } from '@kolkov/angular-editor';
import {NgxPaginationModule} from 'ngx-pagination';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavComponent,
    AddBlogComponent,
    EditBlogComponent,
    CommentsComponent,
    BlogComponent,
    
  ],
  imports: [
    TagInputModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    AngularEditorModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true
     }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
