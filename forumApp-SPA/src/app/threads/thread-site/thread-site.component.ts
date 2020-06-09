import { Component, OnInit } from '@angular/core';
import { Thread } from 'src/app/models/thread';
import { ThreadService } from 'src/app/services/thread.service';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-thread-site',
  templateUrl: './thread-site.component.html',
  styleUrls: ['./thread-site.component.css']
})
export class ThreadSiteComponent implements OnInit {
// pobieranie watki od api
// activaedRoute pozwala na pobranie parametru np id z adresu url
thread: Thread;
  constructor(private threadService: ThreadService, private alertify: AlertifyService, private route: ActivatedRoute) { }
// dzieki resolverowi dane o watku beda pobierane z route gdzie umieszczony zostal resolver
  ngOnInit() {
    this.route.data.subscribe(data => {
      this.thread = data.thread;
    });
  }

  // loadThread() {
  //   // + sprawi ze id bedzie typu number a nie string
  //   this.threadService.getThread(+this.route.snapshot.params.id).subscribe((subThread: Thread) => {
  //     this.thread = subThread;
  //   }, error => {
  //     this.alertify.errorMessage(error);
  //   });
  // }
}
