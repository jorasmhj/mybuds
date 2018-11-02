import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  @Output()
  postEvent = new EventEmitter<any>();
  post: any = {};
  posting: boolean;

  constructor() {}

  ngOnInit() {}

  share() {
    this.postEvent.emit(this.post);
    this.post = {};
    this.posting = true;
    const s = this;
    setTimeout(function() {
      s.posting = false;
    }, 500);
  }
}
