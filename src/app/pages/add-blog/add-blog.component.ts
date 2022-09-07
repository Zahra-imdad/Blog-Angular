import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';


@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {
  htmlContent:string=''
  fg:any = new FormControl()
  fb = new FormBuilder()
  addTitle:string=''
  addContent:string=''
  uploaded:string=''
  //addTag:any[]=[];
  store:any[]=[]
  tag:string[]=[];
  //@Output() addedBlogs = new EventEmitter()
  

  constructor(private authService:AuthService,private blogService:BlogService) { }

  ngOnInit(): void {
    this.fg = this.fb.group({
      title: ['',[Validators.required]],
      content: ['',[Validators.required,Validators.minLength(550)]],
    })
    
  }
  get TitleInput(){
    return this.fg.get('title')
  }
  get ContentInput(){
    return this.fg.get('content')
  }
  // get TagInput(){
  //   return this.fg.get('tag')
  // }
  
  addBlogs(){
    console.log(this.TitleInput)
      if(this.TitleInput.value =='' || this.ContentInput.value==''){
        this.uploaded='UPLOAD FAILED'
      }
      else{
        
        this.addTitle = this.fg.value.title
        this.addContent = this.fg.value.content
        //this.addTag = this.fg.value.tag
        // console.log("TAG VAL",this.addTag)
        // console.log(this.addTag)
        console.log(this.addTitle)
        console.log(this.addContent)
        //console.log("checking tag:",this.fg.value.tag)
        
        // for (var j = 0; j < this.addTag.length; j++){
        //   this.store.push(this.addTag[j].value)
        //   console.log("TAG ARRAY",this.store);
        // }

        const userId = this.authService.getLocalStorage()
        console.log(userId);
        if(!this.ContentInput.errors?.['minlength']){
          this.blogService.addNewBlog( this.fg.value.title,this.fg.value.content,this.store,userId).subscribe((data:any)=>{
            console.log(data)
            console.log(data.blogPost.authorDetail)
            //this.addedBlogs.emit(data)
            this.uploaded='BLOG ADDED SUCCESSFULLY'
            this.addTitle='';
            this.addContent=''
            //this.addTag=[]
          },
          err=>{
            console.log(err.message)
            this.uploaded='FAILED'
          })
        }
        
        
      }
      
    
  }
  
  onTagAdd(e:any){
    //this.tag.push(e.value)
    console.log("VALUE EVENT: ",e.value)
    console.log("on Tag ADD:" ,this.tag)
  }
  onTagRemove(e:any){
    this.tag = this.tag.filter( (tag:any) => tag !== e)
    console.log("EVENT : ",e)
    console.log("TAG : ",this.tag)
  }
  

}

