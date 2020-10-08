import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Participant } from '../model/Participant'
import { AnswerOfQuestion } from '../model/AnswerOfQuestion'
import { SessionService } from '../session.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit, OnDestroy {
  quiz: any;
  participants: Participant[];
  thisParticipant: Participant;
  currentQuestion = 0;
  allAnswers: object[] = [];
  animateQuestion = false;
  selectedChoice = "";
  subscriptions: Subscription[] = [];

  constructor(private location: Location, private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    this.participants = this.location.getState()['participants'] || [];
    this.thisParticipant = this.location.getState()['thisParticipant'];
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }

    this.subscriptions.push(this.sessionService
      .answerLocked()
      .subscribe((participantHash: string) => {
        console.log('someone answered yasta');
        const participant = this.participants
        .find(participant => participant.hash === participantHash);
        console.log(participant.hash);
        console.log(participantHash);
        participant.answerLocked = true;
      }));

    this.subscriptions.push(this.sessionService
      .allAnswered()
      .subscribe((answers) => {
      console.log(answers);
      this.nextQuestion(answers);
    }));

  }



  nextQuestion(prevAnswers: AnswerOfQuestion[]): void {
    this.animateQuestion = true;
    this.allAnswers.push(prevAnswers);
    
    setTimeout(() => {
      this.animateQuestion = false;

      this.currentQuestion++;
      for (const participant of this.participants){
        participant.answerLocked = false;
      }
      this.selectedChoice = "";

      if (this.currentQuestion >= this.quiz.questions.length) {
        this.router.navigateByUrl('/quiz_score', { state: { 
          quiz: this.quiz, 
          answers: this.allAnswers,
          participants: this.participants,
          thisParticipant: this.thisParticipant
        }});
      }
    }, 1000);
  }

  submitAnswer(choice: string): void {
    if (this.selectedChoice){
      return;
    }
    this.selectedChoice = choice;
    if (this.animateQuestion) {
      return;
    }
    this.sessionService.submitAnswer(choice);
  }

  ngOnDestroy(): void {
    for (const subscription of this.subscriptions){
      subscription.unsubscribe();
    }
  }
}
