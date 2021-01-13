import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { MainservService } from '../mainserv.service';
@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post;
  faThumbsUp=faThumbsUp;
  faComment=faComment;
  constructor(public serv:MainservService) {
   }

  ngOnInit(): void {
    console.log(this.post)

  }

}
