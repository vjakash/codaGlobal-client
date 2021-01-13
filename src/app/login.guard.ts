import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainservService } from './mainserv.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {
  constructor(private adminServ:MainservService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
     
      if(this.adminServ.getLoginData() && this.adminServ.getLoginData()['token'] && this.adminServ.getLoginData()['email']){
        this.router.navigate(['/newsfeed']);
        return false;
      }else{
        return true;
      }
  }
  
}
