import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { post } from 'selenium-webdriver/http';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
  @Input()
  post;
  @Output()
  postRemove = new EventEmitter<any>();
  constructor() {}

  ngOnInit() {
    console.log(this.post);
  }

  removePost() {
    this.postRemove.emit(this.post);
  }
}
