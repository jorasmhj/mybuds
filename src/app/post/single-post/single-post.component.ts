import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { UserService } from 'src/app/services/user.service';
import { FacebookService } from 'ngx-facebook';
import { FlashMessagesService } from 'angular2-flash-messages';

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
  constructor(
    private postService: PostService,
    public userService: UserService,
    private fb: FacebookService,
    private _flashMessagesService: FlashMessagesService
  ) {
    this.fb.init({
      appId: '363472697851786',
      xfbml: true,
      version: 'v3.1'
    });
  }

  ngOnInit() {}

  ogShare(desc) {
    this.fb
      .ui({
        method: 'share_open_graph',
        action_type: 'og.shares',
        action_properties: JSON.stringify({
          object: {
            'og:title': 'Health Feed',
            'og:site_name': 'site_name',
            'og:description': desc,
            'og:image':
              'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
            'og:image:width': '100',
            'og:image:height': '100'
          }
        })
      })
      .then(
        (success) => {
          console.log(success);
          this._flashMessagesService.show('Post Shared.', {
            cssClass: 'alert-success',
            timeout: 4000
          });
        },
        (err) => {}
      );
  }

  removePost() {
    this.postRemove.emit(this.post);
    this.postService.deletePost(this.post._id).subscribe((res) => {
      this._flashMessagesService.show('Post Deleted.', {
        cssClass: 'alert-success',
        timeout: 4000
      });
    });
  }
}
