import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AddBlogComponent } from './pages/add-blog/add-blog.component';
import { EditBlogComponent } from './pages/edit-blog/edit-blog.component';
import { BlogComponent } from './pages/blog/blog.component';




const routes:Routes =[
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  {
    path : 'login',
    component: LoginComponent,
  },
  {
    path : 'register',
    component: RegisterComponent,
  },
  {
    path : 'home',
    component: HomeComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'add_blog',
    component: AddBlogComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'edit',
    component: EditBlogComponent,
    canActivate:[AuthGuard]
  },
  {
    path : 'blog/:id',
    component: BlogComponent,
    canActivate:[AuthGuard]
  },
  
]


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }

