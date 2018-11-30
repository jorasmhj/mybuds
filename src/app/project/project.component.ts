import { Component, OnInit } from '@angular/core';
import { Project } from './project';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  projects: Project[] = [];
  project: Project = <Project>{};
  editId: number;
  editMode: boolean;

  constructor() {}

  ngOnInit() {
    this.getProjects();
  }

  getProjects() {
    let projects = {
      title: 'project1',
      description: 'project description',
      date: Date.now()
    };
    this.projects.push(projects);
  }

  edit(index: number) {
    this.editId = index;
    this.editMode = true;
    this.project = Object.assign({}, this.projects[index]);
  }

  submit(form) {
    if (this.editMode && this.editId != null) this.update();
    else {
      this.project.date = Date.now();
      this.projects.push(this.project);
    }
    this.project = <Project>{};
    form.resetForm();
  }

  update(): any {
    this.projects[this.editId] = this.project;
    this.editId = null;
    this.editMode = false;
  }
}
