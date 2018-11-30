import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post';
import { moveIn, fallIn } from 'src/app/animation';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css'],
  animations: [fallIn()]
})
export class PostFormComponent implements OnInit {
  @Output()
  postEvent = new EventEmitter<any>();
  post: Post = <Post>{};
  posting: boolean;

  constructor(private postService: PostService) {}

  ngOnInit() {}

  detectFiles(event) {
    this.post.photos = [];
    let files = event.target.files;
    if (files) {
      for (let file of files) {
        let reader = new FileReader();
        reader.onload = (e: any) => {
          this.post.photos.push(e.target.result);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  share() {
    if (this.post.description.trim() !== '') {
      this.posting = true;
      this.postService.createPost(this.post).subscribe(
        (data) => {
          this.postEvent.emit(data);
          this.post = <Post>{};
          this.posting = false;
        },
        (err) => {
          this.post = <Post>{};
          this.posting = false;
        }
      );
    }
  }
}
