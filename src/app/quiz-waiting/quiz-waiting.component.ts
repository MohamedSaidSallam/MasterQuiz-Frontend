import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz-waiting',
  templateUrl: './quiz-waiting.component.html',
  styleUrls: ['./quiz-waiting.component.scss'],
})
export class QuizWaitingComponent implements OnInit {
  quiz: any;
  participants = [
    { name: 'Someone1', isReady: false },
    { name: 'Someone2', isReady: true },
    { name: 'Someone3', isReady: true },
    { name: 'Someone4', isReady: false },
    { name: 'Someone5', isReady: false },
    {
      name: 'Someone6asd asd asdqw dqwd asd wqd asd asdw asdw dasd ',
      isReady: true,
    },
  ];

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }
  }
}
