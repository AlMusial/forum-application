import { Component, OnInit, Input } from '@angular/core';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-add-comment',
  templateUrl: './add-comment.component.html',
  styleUrls: ['./add-comment.component.css']
})
export class AddCommentComponent implements OnInit {
  @Input() comments: Comment[];

  constructor() { }

  ngOnInit() {
  }

}
