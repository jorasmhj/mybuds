import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
  post: any = {};
  posting: boolean;

  constructor() {}

  ngOnInit() {}

  share() {
    this.post = {};
    this.posting = true;
    const s = this;
    setTimeout(function() {
      s.posting = false;
    }, 2000);
  }
}
