import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { SinglePostComponent } from './single-post/single-post.component';
import { PostFormComponent } from './post-form/post-form.component';
import { FormsModule } from '@angular/forms';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { RouterModule } from '@angular/router';
import { MatMenuModule, MatDatepickerModule, MatFormFieldModule, MatNativeDateModule, MatFormFieldControl, MatInputModule } from '@angular/material';
import { FacebookModule } from 'ngx-facebook';

@NgModule({
	declarations: [PostFormComponent, PostsComponent, SinglePostComponent],
	imports: [
		CommonModule,
		FormsModule,
		FacebookModule.forRoot(),
		NgMasonryGridModule,
		RouterModule,
		MatMenuModule,
		MatDatepickerModule,
		MatFormFieldModule,
		MatNativeDateModule,
		MatInputModule
	],
	exports: [PostFormComponent, PostsComponent, SinglePostComponent],
})
export class PostModule { } 
