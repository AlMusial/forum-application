import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AlertifyService } from '../../services/alertify.service';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User;
  threads: any[];

  constructor(private userService: UserService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.user = data.user;
      this.threads = this.getThreads();
    });
  }
  //   loadUser() {
  //     // + sprawi ze id bedzie typu number a nie string
  //     this.userService.getUser(+this.route.snapshot.params.id).subscribe((subUser: User) => {
  //       this.user = subUser;
  //     }, error => {
  //       this.alertify.errorMessage(error);
  //     });
  //   }
//   loadThreads() {
//     this.threadService.getThreads().subscribe((subsThreads: Thread[]) => {
//       this.threads = subsThreads;
//     // tslint:disable-next-line:no-shadowed-variable
//     }, error => {
//       this.alertify.errorMessage(error);
//     });
//   }
   getThreads() {
     const threads = [];
     for (const thread of this.user.threads) {
       threads.push({
         title: thread.title,
         content: thread.content,
         created: thread.created
       });
     }
     return threads;
   }
}
