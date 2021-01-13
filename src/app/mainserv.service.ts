import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class MainservService {
  header;
  currentUser;
  likedPost=[];
  constructor(private http:HttpClient,private router:Router) { 
    this.setHeader();
  }
  setHeader(){
    let data=this.getLoginData()
    if(data){
      this.header=new HttpHeaders({
        authorization: data['token'],
        email:data['email'],
      });
      this.currentUser=data['email'];
    }
    
  }
  setLoginData(details){
    let key='customerDetails';
    details=JSON.stringify(details);
    localStorage.setItem(key,details);
  }
  getLoginData(){
    let key='customerDetails';
    let details=localStorage.getItem(key);
    if(details){
      details=JSON.parse(details);
    }
    return details;
  }
  signOut(){
    let key='customerDetails';
    localStorage.removeItem(key);
    this.router.navigate(['/']);
  }
  register(data):Observable<any>{
    return this.http.post(`${environment.serverURL}/register`,data);
  }
  login(details):Observable<any>{

    return this.http.post(`${environment.serverURL}/login`,details);
}

//posts
getPosts():Observable<any>{
  return this.http.get(`${environment.serverURL}/getPosts`, {
    headers:this.header
  });
}
createPost(details):Observable<any>{
  details.owner=this.getLoginData()['email'];
  return this.http.post(`${environment.serverURL}/createPost`,details, {
    headers:this.header
  });
}
addLike(details):Observable<any>{
  details.likedPerson=this.getLoginData()['email'];
  return this.http.put(`${environment.serverURL}/addLike`,details, {
    headers:this.header
  });
}
unlike(details):Observable<any>{
  details.unlikedPerson=this.getLoginData()['email'];
  return this.http.put(`${environment.serverURL}/unlike`,details, {
    headers:this.header
  });
}
//search
searchUser(searchTerm):Observable<any>{
  return this.http.get(`${environment.serverURL}/searchUser/${searchTerm}`, {
    headers:this.header
  });
}
}
