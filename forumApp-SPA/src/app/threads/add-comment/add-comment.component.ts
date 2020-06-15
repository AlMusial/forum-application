import { Component, OnInit, Input } from '@angular/core';
import { ThreadService } from 'src/app/services/thread.service';
import { AuthService } from 'src/app/services/auth.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
model: any = {};
@Input()  thread: number;

  constructor(private threadService: ThreadService, private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  addComment() {
    this.threadService.addComment(this.thread, this.authService.decodedToken.nameid, this.model).subscribe(() => {
      this.alertify.successMessage('Comment added successfully');
      window.location.reload();
    }, error => {
      this.alertify.errorMessage(error);
    });
  }
}
