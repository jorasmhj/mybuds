import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';

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
  constructor(private postService: PostService) {}

  ngOnInit() {}

  removePost() {
    this.postRemove.emit(this.post);
    this.postService.deletePost(this.post.id).subscribe(res => {
      if (res['status'] === 200) {
      }
    });
  }
}
