import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core'
import { PostService } from 'src/app/services/post.service'
import { UserService } from 'src/app/services/user.service'
import { FacebookService } from 'ngx-facebook'
import { FlashMessagesService } from 'angular2-flash-messages'

@Component({
    selector: 'app-single-post',
    templateUrl: './single-post.component.html',
    styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit {
    @Input() post: any
    @Output() postRemove = new EventEmitter<any>()
    showReactors: boolean
    constructor(
        private postService: PostService,
        public userService: UserService,
        private fb: FacebookService,
        private _flashMessagesService: FlashMessagesService
    ) {
        this.fb.init({
            appId: '363472697851786',
            xfbml: true,
            version: 'v3.1'
        })
    }

    ngOnInit() {
        this.getPostReactions()
    }

    getPostReactions() {
        this.postService.getReact(this.post._id).subscribe(
            res => {
                this.post.likesBy = res['likesBy'].map(by => {
                    return { _id: by._id, name: by.name }
                })
                this.post.liked = this.post.likesBy.map(e => e._id).indexOf(this.userService.user._id) > -1 ? true : false
            },
            err => {
                console.log(err)
            }
        )
    }

    ogShare(desc) {
        this.fb
            .ui({
                method: 'share_open_graph',
                action_type: 'og.shares',
                action_properties: JSON.stringify({
                    object: {
                        'og:title': 'Health Feed',
                        'og:site_name': 'site_name',
                        'og:description': desc,
                        'og:image': 'https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png',
                        'og:image:width': '100',
                        'og:image:height': '100'
                    }
                })
            })
            .then(
                success => {
                    console.log(success)
                    this._flashMessagesService.show('Post Shared.', {
                        cssClass: 'alert-success',
                        timeout: 4000
                    })
                },
                err => {}
            )
    }

    removePost() {
        this.postRemove.emit(this.post)
        this.postService.deletePost(this.post._id).subscribe(res => {
            this._flashMessagesService.show('Post Deleted.', {
                cssClass: 'alert-success',
                timeout: 4000
            })
        })
    }

    react() {
        let option = {
            postId: this.post._id,
            like: !this.post.liked
        }
        this.post.liked = !this.post.liked
        this.postService.reactPost(option).subscribe(
            res => {
                this.post.liked = res['postReact']['like']
                if (res['postReact']['like'] === true) {
                    this.post.likesBy.push({ _id: this.userService.user._id, name: this.userService.user.name })
                } else {
                    this.post.likesBy.splice(this.post.likesBy.map(e => e._id).indexOf(this.userService.user._id, 1))
                }
                let react = res['postReact']['like'] ? 'Liked' : 'Disliked'
                this._flashMessagesService.show(`Post ${react}.`, {
                    cssClass: 'alert-success',
                    timeout: 4000
                })
            },
            err => {
                console.log(err)
            }
        )
    }

    getReactors(e) {
        e.target.closest('.post-parent').style.zIndex = 100
        this.showReactors = true
    }

    hideReactors(e) {
        e.target.closest('.post-parent').style.zIndex = 0
        this.showReactors = false
    }
}
