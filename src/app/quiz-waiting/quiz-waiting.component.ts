import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { SessionService } from '../session.service'

@Component({
  selector: 'app-quiz-waiting',
  templateUrl: './quiz-waiting.component.html',
  styleUrls: ['./quiz-waiting.component.scss'],
})
export class QuizWaitingComponent implements OnInit {
  quiz: any;
  participants = [
    { name: 'Someone1', isReady: false },
    {
      name: 'Someone6asd asd asdqw dqwd asd wqd asd asdw asdw dasd ',
      isReady: true,
    },
  ];

  constructor(private location: Location, 
    private router: Router, 
    private sessionService: SessionService) {}
    
  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }
  }
}
