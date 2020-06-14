import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread';
import { Comment } from '../models/comment';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }
  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(this.baseUrl + 'threads');
  }

  getThread(id): Observable<Thread> {
    return this.http.get<Thread>(this.baseUrl + 'threads/' + id);
  }

  addThread(id: number, model: any) {
    return this.http.post(this.baseUrl + 'threads/add/' + id, model);
  }
  // addComment(threadId: number, userId: number, comment: Comment) {
  //   return this.http.post(this.baseUrl + 'threads/' + threadId + '/' + userId + '/comment', comment);
  // }
}
