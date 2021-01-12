import { Component, OnInit } from '@angular/core';
import { MainservService } from '../mainserv.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private serv:MainservService) { }

  ngOnInit(): void {
  }

}
