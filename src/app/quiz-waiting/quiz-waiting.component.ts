import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../session.service'
import { BackendService } from '../backend.service';
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-quiz-waiting',
  templateUrl: './quiz-waiting.component.html',
  styleUrls: ['./quiz-waiting.component.scss'],
})
export class QuizWaitingComponent implements OnInit {
  quiz: any;
  invitationCode: string;
  messages: string[] = [];

  private sessionService: SessionService;
  participants = [
    { name: 'Someone1', isReady: false },
    {
      name: 'Someone6asd asd asdqw dqwd asd wqd asd asdw asdw dasd ',
      isReady: true,
    },
  ];

  constructor(private location: Location, 
    private router: Router,
    private backendService: BackendService) { 
      this.backendService.getSessionCode().subscribe((data: any) => {
        this.sessionService = new SessionService(data);
        this.invitationCode = data;
        this.sessionService.foo();
      });
    }
    
  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }

    // todo chat
    this.sessionService
    .getMessages()
    .subscribe((message: string) => {
      this.messages.push(message);
    });
    // this.sessionService.foo();

  }
}
