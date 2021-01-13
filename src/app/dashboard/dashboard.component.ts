import { Component, OnInit } from '@angular/core';
import { MainservService } from '../mainserv.service';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  searchText="";
  faThumbsUp=faThumbsUp;
  faComment=faComment;
  faPowerOff=faPowerOff;
  constructor(public serv:MainservService,private router:Router) { }

  ngOnInit(): void {
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
