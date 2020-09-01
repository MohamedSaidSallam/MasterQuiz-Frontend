import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quiz: any;
  currentQuestion = 0;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }
  }
}
