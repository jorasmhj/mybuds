import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { PostService } from 'src/app/services/post.service';
import { Post } from 'src/app/model/post';
import { fallIn } from 'src/app/animation';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
    selector: 'app-post-form',
    templateUrl: './post-form.component.html',
    styleUrls: ['./post-form.component.css'],
    animations: [fallIn()]
})
export class PostFormComponent implements OnInit {
    @Output()
    postEvent = new EventEmitter<any>();
    @Output() layoutMasonry = new EventEmitter<any>();
    post: Post = <Post>{};
    posting: boolean;
    showEventForm: boolean;
    maxDate = new Date(Date.now());

    constructor(private postService: PostService, private _flashMessagesService: FlashMessagesService) {}

    ngOnInit() {
        this.post.photos = [];
    }

    detectFiles(event) {
        let files = event.target.files;
        if (files) {
            for (let file of files) {
                let reader = new FileReader();
                reader.onload = (e: any) => {
                    this.post.photos.push(e.target.result);
                    this.layoutMasonry.emit();
                };
                reader.readAsDataURL(file);
            }
        }
    }

    share() {
        if (this.post.description.trim() !== '') {
            this.posting = true;
            this.postService.createPost(this.post).subscribe(
                data => {
                    this.postEvent.emit(data);
                    this.post = <Post>{};
                    this.post.photos = [];
                    this._flashMessagesService.show('Posted.', {
                        cssClass: 'alert-success',
                        timeout: 4000
                    });
                    this.posting = false;
                },
                err => {
                    this.post = <Post>{};
                    this.post.photos = [];
                    this.posting = false;
                }
            );
        }
    }

    toggleEventForm() {
        this.showEventForm = !this.showEventForm;
    }
}
