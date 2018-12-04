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

  types = [{name: 'a', checked: false}, {name: 'b', checked: false}]

  checked = { jobType: [] };
  checkedAfter = { jobType: [] };

  constructor() {}

  ngOnInit() {
    this.getProjects();
  }

  changeParent(i){
    this.projects[i].title = 'jpt';
  }

  updateCheck(e){
    let index = this.types.findIndex(a => a.name == e.target.value);
    this.types[index].checked = (e.target.checked) ? true : false;

    this.checked.jobType = [];
    for(let type of this.types){
      if(type.checked) this.checked.jobType.push(type.name);
      else this.checked.jobType = this.checked.jobType.filter(a => a != type.name);
    }
  }

  saveCheck(){
    this.checkedAfter.jobType = this.checked.jobType.slice(0);
  }

  cancleCheck(){
    for(let type of this.types){
      type.checked = this.checkedAfter.jobType.indexOf(type.name)  > -1 ? true : false;
    }
    this.checked = Object.assign({}, this.checkedAfter);
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
