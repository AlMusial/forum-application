import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Thread } from '../models/thread';

@Injectable({
  providedIn: 'root'
})
export class ThreadService {
  baseUrl = environment.apiUrl;
  threadId: number;

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

  deleteThread(id: number, userId: number) {
    return this.http.delete(this.baseUrl + 'threads/' + id + '/' + userId);
  }

  addComment(threadId: number, userId: number, model: any) {
     return this.http.post(this.baseUrl + 'threads/comment/' + threadId + '/' + userId, model);
   }

   deleteComment(id: number, userId: number) {
     return this.http.delete(this.baseUrl + 'threads/comment/' + id + '/' + userId);
   }
}
