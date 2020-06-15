import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from 'src/app/services/thread.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  threads: any[];

  constructor(private userService: UserService, private threadService: ThreadService, private authService: AuthService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.threads = this.getThreads();
    });
  }

   getThreads() {
     const threads = [];
     for (const thread of this.user.threads) {
       threads.push({
         title: thread.title,
         content: thread.content,
         created: thread.created,
         id: thread.id
       });
     }
     return threads;
   }

   deleteThread(id: number) {
     this.alertify.confirm('Are you sure you want to delete this thread?', () => {
       this.threadService.deleteThread(id, this.authService.decodedToken.nameid).subscribe(() => {
         this.threads.splice(this.threads.findIndex(t => t.id), 1);
         this.alertify.successMessage('Thread has been deleted successfully');
       }, error => {
         this.alertify.errorMessage('Failed to delete the thread');
       });
     });
   }
}
