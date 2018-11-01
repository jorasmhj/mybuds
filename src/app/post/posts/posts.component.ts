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
  posts = [1, 2];
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
    if (this._masonry) {
      this._masonry
        .removeItem($event.currentTarget) // removeItem() expects actual DOM (ng-masonry-grid-item element)
        .subscribe((item: MasonryGridItem) => {
          // item: removed grid item DOM from NgMasonryGrid
          if (item) {
            let id = item.element.getAttribute('id'); // Get id attribute and then find index
            let index = id.split('-')[2];
            // tslint:disable-next-line:max-line-length
            // remove grid item from Masonry binding using index (because actual Masonry items order is different from this.masonryItems items)
            this.posts.splice(index, 1);
          }
        });
    }
  }
}
