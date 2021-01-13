import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainservService } from '../mainserv.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerData;
validate=false;
loader=false;
errorMessage="";
  constructor(private serv:MainservService,private fb:FormBuilder,private router:Router) { 
    this.registerData=fb.group({
      email:new FormControl("",[Validators.required,Validators.email]),
      password:new FormControl("",[Validators.required]),
      firstname:new FormControl("",[Validators.required]),
      lastname:new FormControl("",[Validators.required])
    })
  }

  ngOnInit(): void {
  }
  register(){
    this.validate=true;
    if(this.registerData.valid){
      this.loader=true;
      this.serv.register(this.registerData.value).subscribe((data)=>{
        console.log(data);
        this.loader=false;
        alert('registration successfull');
        this.router.navigate(['/']);
      },(err)=>{
        console.log(err);
        this.loader=false;
        if(err.error['message']){
          this.errorMessage=err.error['message'];
        }else{
          alert("An error occured please try again");
        }
      })
    }
  }
}
