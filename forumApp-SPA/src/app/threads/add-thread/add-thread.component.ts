import { Component, OnInit, ViewChild } from '@angular/core';
import { ThreadService } from 'src/app/services/thread.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { AuthService } from 'src/app/services/auth.service';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-thread',
  templateUrl: './add-thread.component.html',
  styleUrls: ['./add-thread.component.css']
})
export class AddThreadComponent implements OnInit {
  model: any;
  // user: User;
  @ViewChild('addForm') addForm: NgForm;
  constructor(private threadService: ThreadService, private authService: AuthService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.data.subscribe(data => {
    //   this.user = data.user;
    // });
  }

  addThread() {
    this.threadService.addThread(this.authService.decodedToken.nameid, this.model).subscribe(() => {
      this.alertify.successMessage('added successfully');
    }, error => {
      this.alertify.errorMessage(error);
    });
  }
}
