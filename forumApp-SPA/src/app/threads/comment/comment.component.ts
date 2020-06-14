import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ThreadService } from 'src/app/services/thread.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comments: Comment[];
  user: User;

  constructor(private userService: UserService, private threadService: ThreadService, private route: ActivatedRoute) { }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.user = data.user;
        // this.threads = this.getThreads();
      });
  }

   loadUser() {
     // + sprawi ze id bedzie typu number a nie string
//          this.userService.getUser(+this.route.snapshot.params.id).subscribe((subUser: User) => {
//            this.user = subUser;
//          }, error => {
//            this.alertify.errorMessage(error);
//          });
        }
}
