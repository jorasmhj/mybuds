import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Masonry, MasonryOptions, MasonryGridItem } from 'ng-masonry-grid';
import { PostService } from 'src/app/services/post.service';
import { ActivatedRoute } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input()
  user;
  posts: any = [];
  currentUserId: number;
  _masonry: Masonry;

  public myOptions: MasonryOptions = {
    transitionDuration: '0.8s',
    gutter: 0,
    stamp: '.stamp'
  };

  constructor(
    public userService: UserService,
    private postService: PostService,
    private route: ActivatedRoute,
    private _flashMessagesService: FlashMessagesService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getPost(this.user._id);
    });
  }

  getPost(userId) {
    this.postService.getPost(userId).subscribe((data) => {
      this.posts = data['post'];
    });
  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }

  receivePost($event) {
    if (this._masonry) {
      this._masonry.setAddStatus('prepend');
      this.posts.splice(0, 0, $event);
    }
  }

  reloadMasonry() {
    this._masonry.layout();
    let element: HTMLElement = document.getElementById('reload') as HTMLElement;
    setTimeout(() => {
      element.click();
    }, 100);
  }

  removeItem($event: any) {
    let id = this.posts.indexOf($event);
    let a = document.getElementById('masonry-item-' + id);
    if (this._masonry) {
      this._masonry.removeItem(a).subscribe((item: MasonryGridItem) => {
        if (item) {
          this.posts.splice(id, 1);
        }
      });
    }
  }
}
