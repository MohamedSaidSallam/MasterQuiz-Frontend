import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_ENDPOINT = 'https://masterquiz-backend.herokuapp.com/api/';
const API_ENDPOINT_QUIZZES = 'quizzes/';
const API_ENDPOINT_SESSION_CODE = 'sessionCode/';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  constructor(private http: HttpClient) {}
  getQuizzes(): Observable<object> {
    return this.http.get(API_ENDPOINT + API_ENDPOINT_QUIZZES);
  }
  getSessionCode(): Observable<object> {
    return this.http.get(API_ENDPOINT + API_ENDPOINT_SESSION_CODE);
  }

}
