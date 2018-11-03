import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Masonry, MasonryOptions, MasonryGridItem } from 'ng-masonry-grid';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
  @Input()
  user;
  posts = [1, 2, 3, 4, 5, 6];
  _masonry: Masonry;

  public myOptions: MasonryOptions = {
    transitionDuration: '0.8s',
    gutter: 0,
    stamp: '.stamp'
  };

  constructor(public userService: UserService) {}

  ngOnInit() {}
  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
  }

  receivePost($event) {
    if (this._masonry) {
      this._masonry.setAddStatus('prepend');
      this.posts.splice(0, 0, $event);
    }
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
