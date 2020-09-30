import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
const env = environment;

const API_ENDPOINT = `${env.apiEndpoint}api/`;
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

  getOneQuiz(quizId: string): Observable<object> {
    return this.http.get(API_ENDPOINT + API_ENDPOINT_QUIZZES + quizId)
  }

  getSessionCode(): Observable<object> {
    return this.http.get(API_ENDPOINT + API_ENDPOINT_SESSION_CODE);
  }

}
