import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { ThreadService } from 'src/app/services/thread.service';
import { ActivatedRoute } from '@angular/router';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() comments: Comment[];
  user: User;

  constructor(private authService: AuthService, private threadService: ThreadService, private route: ActivatedRoute, private alertify: AlertifyService) { }

  ngOnInit() {
      this.route.data.subscribe(data => {
        this.user = data.user;
      });
  }
//   loadUser() {
//     // + sprawi ze id bedzie typu number a nie string
//          this.userService.getUser(+this.route.snapshot.params.id).subscribe((subUser: User) => {
//            this.user = subUser;
//          }, error => {
//            this.alertify.errorMessage(error);
//          });
//        }
isUserComment(id: number) {
  console.log(this.authService.decodedToken.nameid === id);
  if (this.authService.decodedToken.nameid === id.toString()) {
    return true;
  }
}

deleteComment(id: number) {
  // this.comment = this.comments.find( c => c.id);
  this.alertify.confirm('Are you sure you want to delete this comment?', () => {
    this.threadService.deleteComment(id, this.authService.decodedToken.nameid).subscribe(() => {
      // this.comment.splice(this.threads.findIndex(t => t.id), 1);
      this.alertify.successMessage('Comment has been deleted successfully');
      window.location.reload();
    }, error => {
      this.alertify.errorMessage('Failed to delete the comment');
    });
  });
}
}
