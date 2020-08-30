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

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }
  }
}
