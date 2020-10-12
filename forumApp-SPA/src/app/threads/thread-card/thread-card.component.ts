import { Component, OnInit, Input } from '@angular/core';
import { Thread } from 'src/app/models/thread';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-thread-card',
  templateUrl: './thread-card.component.html',
  styleUrls: ['./thread-card.component.css']
})
export class ThreadCardComponent implements OnInit {
  @Input() thread: Thread;

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
