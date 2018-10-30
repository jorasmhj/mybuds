import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private titleService: Title
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id) this.getUser(id);
      else this.getMe();
    });
  }

  changeUser() {
    localStorage.setItem(
      'user',
      JSON.stringify({
        id: 1,
        name: 'Saroj',
        email: 'jorasmhj@gmail.com',
        created_at: '2018-10-16 13:12:02',
        updated_at: '2018-10-16 13:12:02'
      })
    );
  }

  getMe() {
    return this.userService.me().subscribe(res => {
      localStorage.setItem('user', JSON.stringify(res));
      this.user = res;
      this.titleService.setTitle(this.user.name);
    });
  }

  getUser(id) {
    this.userService.getUser(id).subscribe(res => {
      this.user = res;
      this.titleService.setTitle(this.user.name);
    });
  }
}
