import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from 'src/app/services/thread.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.css']
})
export class ThreadComponent implements OnInit {
  threads: Thread[];

  constructor(private threadService: ThreadService, private alertify: AlertifyService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data.subscribe(data => {
      this.threads = data.threads;
    });
  }

//   loadThreads() {
//     this.threadService.getThreads().subscribe((subsThreads: Thread[]) => {
//       this.threads = subsThreads;
//     // tslint:disable-next-line:no-shadowed-variable
//     }, error => {
//       this.alertify.errorMessage(error);
//     });
//   }
}
