import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MainservService } from './mainserv.service';

@Injectable({
  providedIn: 'root'
})
export class NewsfeedGuard implements CanActivate {
  constructor(private serv:MainservService,private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(this.serv.getLoginData() && this.serv.getLoginData()['token'] && this.serv.getLoginData()['email']){
        return true;
      }else{
        this.router.navigate(['/']);
        return false;
      }
  }
  
}
