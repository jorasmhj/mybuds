import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Masonry } from 'ng-masonry-grid';

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

  constructor(private userService: UserService) {}

  ngOnInit() {}

  receivePost($event) {
    this.posts.splice(0, 0, $event);
  }

  onNgMasonryInit($event: Masonry) {
    this._masonry = $event;
    this.reorderItems();
  }

  reorderItems() {
    if (this._masonry) {
        this._masonry.reOrderItems();
    }
}
