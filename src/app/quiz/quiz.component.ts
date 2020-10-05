import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import { Location } from '@angular/common';
import { Participant } from '../model/Participant'
import { AnswerOfQuestion } from '../model/AnswerOfQuestion'
import { SessionService } from '../session.service'

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.scss'],
})
export class QuizComponent implements OnInit {
  quiz: any;
  participants: Participant[];
  thisParticipant: Participant;
  currentQuestion = 0;
  allAnswers: object[] = [];
  animateQuestion = false;

  constructor(private location: Location, private router: Router, private sessionService: SessionService) { }

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    this.participants = this.location.getState()['participants'] || [];
    this.thisParticipant = this.location.getState()['thisParticipant'];
    const sessionCode = this.location.getState()['sessionCode'];
    this.sessionService = new SessionService();
    if (this.quiz === undefined) {
      this.router.navigateByUrl('/PageNotFound');
    }

    this.sessionService
      .answerLocked()
      .subscribe((participantHash: string) => {
        // todo UI
        const participant = this.participants
          .find(participant => participant.hash === participantHash);
        participant.answerLocked = true;
      });

      this.sessionService
      .allAnswered()
      .subscribe((answers) => {
        this.nextQuestion(answers);
      });

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
    if (this.animateQuestion) {
      return;
    }
    this.sessionService.submitAnswer(choice);
    if (this.currentQuestion >= this.quiz.questions.length) {
      this.router.navigateByUrl('/quiz_score', { state: { quiz: this.quiz } });
    }
  }

  

}
