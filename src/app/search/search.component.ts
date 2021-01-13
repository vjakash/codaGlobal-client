import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MainservService } from '../mainserv.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchTerm="";
results=[];
loader=false;
  constructor(private serv:MainservService,private activeRoute:ActivatedRoute) { 
    this.searchTerm=activeRoute.snapshot.params.term;
    this.loadResult();
  }
  loadResult(){
    this.loader=true;
    this.serv.searchUser(this.searchTerm).subscribe(data=>{
      console.log(data);
      this.results=data['results'];
      this.loader=false;
    },err=>{
      this.loader=false;
      if(err.error['signout']){
        alert(err.error['message']);
        this.serv.signOut();
      }
      console.log(err);
    })
  }
  ngOnInit(): void {
  }

}
