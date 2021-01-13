import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainservService } from '../mainserv.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.css']
})
export class NewsfeedComponent implements OnInit {
  faThumbsUp=faThumbsUp;
  faComment=faComment;
  faPowerOff=faPowerOff;
  postText="";
  posts=[];
  postingLoader=false;
  postsLoader=false;
  date=new Date();
  likedPost=[];
  userDetails;
  searchText="";
  constructor(public serv:MainservService,private router:Router) {
    this.loadPosts();
    this.userDetails=this.serv.getLoginData();
   }

  ngOnInit(): void {
  }
  loadPosts(){
    this.postsLoader=true;
    this.serv.getPosts().subscribe(data=>{
      console.log(data);
      this.posts=data['posts'];
      this.postsLoader=false;
    },err=>{
      this.postsLoader=false;
      if(err.error['signout']){
        alert(err.error['message']);
        this.serv.signOut();
      }
      console.log(err);
    })
  }
  post(){
    if(this.postText!==""){
      this.postingLoader=true;
      this.serv.createPost({postText:this.postText}).subscribe(data=>{
        this.postText="";
        this.postingLoader=false;
        console.log(data);
        this.posts=data['posts'];
        alert(data['message']);
      },err=>{
        this.postingLoader=false;
        if(err.error['signout']){
          alert(err.error['message']);
          this.serv.signOut();
        }
        console.log(err);
      })
    }
  }
  like(postId){
    this.likedPost.push(postId);
    this.serv.addLike({postId}).subscribe(data=>{
      console.log(data);
      this.posts=data['posts'];
    },err=>{
      if(err.error['signout']){
        alert(err.error['message']);
        this.serv.signOut();
      }
      console.log(err);
    })
  }
  unlike(postId){
    this.likedPost.splice(this.likedPost.indexOf(postId),1);
    this.serv.unlike({postId}).subscribe(data=>{
      console.log(data);
      this.posts=data['posts'];
    },err=>{
      if(err.error['signout']){
        alert(err.error['message']);
        this.serv.signOut();
      }
      console.log(err);
    })
  }
  toggleLike(postId){
    if(this.likedPost.indexOf(postId)>-1){
      this.unlike(postId)
    }else{
      this.like(postId);
    }
  }
  signOut(){
    this.serv.signOut();
  }
  checkEnter(e){
    var code = (e.keyCode ? e.keyCode : e.which);
    if(code == 13) { 
      this.router.navigate(['/newsfeed/search/',this.searchText]);
    }
  }
}
