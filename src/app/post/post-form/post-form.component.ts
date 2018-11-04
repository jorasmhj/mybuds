import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

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

  constructor(private postService: PostService) {}

  ngOnInit() {}

  share() {
    this.posting = true;
    this.postService.createPost(this.post).subscribe(data => {
      this.postEvent.emit(data);
      this.post = {};
      this.posting = false;
    });
  }
}
