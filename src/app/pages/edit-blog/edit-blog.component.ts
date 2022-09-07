import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  blogs:any[]=[]
  showDiv:boolean =false 
  currentId:any=''
  editTitle: any;
  editVal:string=''
  contentVal:string=''
  tagVal:any;
  updateId:string=''
  actionStatus:string='default'
  totalBlogs:number=0
  tagsCount:number=0

  tag:String[]=[];
  //tagStore:any[]=[]

  @ViewChild('cardTitle') cardTitle:any
  @ViewChild('cardContent') cardContent:any
  @ViewChild('inputTitle') inputTitle:any
  @ViewChild('inputContent') inputContent:any
  @ViewChild('cardTags') cardTags:any

  fg:any = new FormControl()
  fb = new FormBuilder()

  constructor(private blogService:BlogService,private authServie:AuthService) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      title: ['',[Validators.required]],
      content: ['',[Validators.required,Validators.minLength(550)]],
      
    })
    this.currentId = this.authServie.getLocalStorage();
    this.getBlogs()
    
  }
  getBlogs(){
    this.blogService.CurrentUserBlogs(this.currentId).subscribe((data:any)=>{
      console.log(data.blogPosts)
      this.blogs = data.blogPosts
      this.totalBlogs = this.blogs.length
      console.log("TAGS",this.blogs)
    })
  }
  edit(blog:any,e:any){
    this.showDiv=true
    window.scrollTo(0, 0)
    console.log(this.cardTitle)
    this.editVal =this.cardTitle.nativeElement.value
    this.editVal = blog.title
    this.contentVal = this.cardContent.nativeElement.innerHTML
    this.contentVal = blog.content
    // this.tagVal = this.cardTags.nativeElement.innerHTML
    // this.tagVal = blog.tags

    this.tag = blog.tags
    // console.log("TagsVal",this.tagVal)
    // this.tag = this.tagVal
    console.log("Tags Val",this.tag)
    this.updateId = blog._id;
    
  }
  updateBlog(e:any){
    this.actionStatus = "UPDATED SUCCESSFULLY"
    this.editVal=this.inputTitle.nativeElement.value

   
    console.log(this.tag)
    this.blogService.updateBlog(this.updateId,{title:this.editVal,content:this.contentVal,tags:this.tag}).subscribe((data)=>{
      console.log(data)
      this.getBlogs()
      
    })
    this.showDiv = false 
  }
  delete(blog:any,e:any){
    console.log(blog._id)
    this.blogService.deleteBlog(blog._id).subscribe((data)=>{
      this.actionStatus=`DELELTED BLOG : ${blog._id}`
      console.log(data)
      this.getBlogs()
    })
    
  }
  get TitleInput(){
    return this.fg.get('title')
  }
  get ContentInput(){
    return this.fg.get('content')
  }

  onTagAdd(e:any){
    //console.log("ADD TAG: ",this.tag)
    
    //this.tag.push(e.value)
    // console.log("VALUE EVENT: ",e.value)
    // console.log("on Tag ADD:" ,this.tag)
  }
  onTagRemove(e:any){
    this.tag = this.tag.filter( (tag) => tag !== e)
    console.log("EVENT : ",e)
    console.log("TAG : ",this.tag)
  }

}
