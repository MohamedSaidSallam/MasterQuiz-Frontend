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
    { name: 'Someone1' },
    { name: 'Someone2' },
    { name: 'Someone3' },
    { name: 'Someone4' },
    { name: 'Someone5' },
    { name: 'Someone6asd asd asdqw dqwd asd wqd asd asdw asdw dasd ' },
  ];

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }
  }
}
