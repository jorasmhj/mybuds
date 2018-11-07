import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  startDate = new Date(1990, 0, 1);

  constructor() {}

  ngOnInit() {}
}
