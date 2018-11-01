import { Component, OnInit, Input } from '@angular/core';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input()
  post;
  constructor() {}

  ngOnInit() {
    console.log(this.post);
  }
}
