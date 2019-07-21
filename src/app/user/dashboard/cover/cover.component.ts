import { Component, OnInit, Input } from '@angular/core'
import { UserService } from 'src/app/services/user.service'
import { ActivatedRoute } from '@angular/router'
import { HttpEventType } from '@angular/common/http'

@Component({
    selector: 'app-cover',
    templateUrl: './cover.component.html',
    styleUrls: ['./cover.component.css']
})
export class CoverComponent implements OnInit {
    @Input()
    user
    uploadprogress = 0
    uploadPic: boolean

    constructor(public userService: UserService, private route: ActivatedRoute) {}

    ngOnInit() {}

    clickinp(inp) {
        inp.click()
    }

    detectFiles(event) {
        let file = event.target.files[0]
        let reader = new FileReader()
        reader.onload = (e: any) => {
            this.user.userImage = e.target.result
        }
        reader.readAsDataURL(file)
        this.uploadPic = true
        this.uploadprogress = 0
        this.userService.uploadPic(file).subscribe(
            events => {
                if (events.type === HttpEventType.UploadProgress) {
                    this.uploadprogress = (events.loaded / events.total) * 100
                } else if (events.type === HttpEventType.Response) {
                }
            },
            error => {
                console.log(error)
            }
        )
    }
}
