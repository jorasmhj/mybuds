import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
  @Input()
  user;

  constructor(public userService: UserService, private route: ActivatedRoute) {}

  ngOnInit() {}
}
