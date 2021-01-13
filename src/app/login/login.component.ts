import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainservService } from '../mainserv.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData;
  validate=false;
  loader=false;
  errorMessage="";
    constructor(private serv:MainservService,private fb:FormBuilder,private router:Router) { 
      this.loginData=fb.group({
        email:new FormControl("",[Validators.required,Validators.email]),
        password:new FormControl("",[Validators.required]),
      })
    }
  
    ngOnInit(): void {
    }
    login(){
      this.validate=true;
      this.errorMessage="";
      if(this.loginData.valid){
        this.loader=true;
        this.serv.login(this.loginData.value).subscribe((data)=>{
          console.log(data);
          alert(data['message'])
          this.loader=false;
          this.serv.setLoginData(data['data']);
          this.serv.setHeader();
        this.router.navigate(["/newsfeed"]);
        },(err)=>{
          console.log(err);
          this.loader=false;
          if(err.error['error']){
            this.errorMessage=err.error['error'];
          }else{
            alert("An error occured please try again");
          }
        })
      }
    }
}
