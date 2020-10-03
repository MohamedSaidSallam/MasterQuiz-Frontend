import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Participant } from '../model/Participant';
import { SessionService } from '../session.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quiz: any;
  participants: Participant[];
  sessionService: SessionService;
  currentQuestion = 0;
  animateQuestion = true;

  constructor(private location: Location, private router: Router) {}

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    this.participants = this.location.getState()['participants'] || [];
    const sessionCode = this.location.getState()['sessionCode'];
    this.sessionService = new SessionService(sessionCode);
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }
  }

  nextQuestion(choice: string): void {
    this.animateQuestion = false;
    setTimeout(() => {
      this.animateQuestion = true;
      this.currentQuestion++;
    }, 1000);

    if (this.currentQuestion >= this.quiz.questions.length) {
      this.router.navigateByUrl('/quiz_score', { state: { quiz: this.quiz } });
    }
  }
}
