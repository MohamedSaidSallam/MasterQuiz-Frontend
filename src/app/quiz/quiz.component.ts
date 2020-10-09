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
  selectedChoice = '';
  isTimerShown = true;
  answerReview = {
    isActive: false,
    currentChoice: '',
    isCurrentCorrect: false
  };
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



  async nextQuestion(prevAnswers: AnswerOfQuestion[]): Promise<void> {
    this.isTimerShown = false;
    this.answerReview.isActive = true;
    this.allAnswers.push(prevAnswers);

    for (const participant of this.participants){
      participant.answerLocked = false;
    }

    const uniqueAnswers = new Map();
    for (const ans of prevAnswers) {
      if (uniqueAnswers.has(ans.answer)){
        uniqueAnswers.get(ans.answer).hashes.push(ans.hash);
      }
      else {
        uniqueAnswers.set(ans.answer, {
          isCorrect: ans.isCorrect,
            hashes: [ans.hash]
          });
      }
    }

    console.log(uniqueAnswers.entries());
    await this.displayAnswers(uniqueAnswers.entries());
    this.answerReview.isActive = false;
    this.animateQuestion = true;

    setTimeout(() => {
      this.animateQuestion = false;
      this.isTimerShown = true;

      this.currentQuestion++;
      for (const participant of this.participants){
        participant.answerLocked = false;
        participant.answeredCorrectly = false;
        participant.showingAnswers = false;
      }
      this.selectedChoice = '';

      if (this.currentQuestion >= this.quiz.questions.length) {
        this.router.navigateByUrl('/quiz_score', { state: {
          quiz: this.quiz,
          answers: this.allAnswers,
          participants: this.participants,
          thisParticipant: this.thisParticipant
        }});
      }
    }, 1200);
  }

  async displayAnswers(uniqueAnswersIterator): Promise<void> {
    console.log(uniqueAnswersIterator);
    for (const [answer, {isCorrect, hashes}] of uniqueAnswersIterator) {
      this.answerReview.currentChoice = answer;
      this.answerReview.isCurrentCorrect = isCorrect;

      const filteredParticipants = this.participants.filter(
        p => hashes.findIndex(hash => hash === p.hash) !== -1);

      filteredParticipants.forEach((participant) => {
        participant.showingAnswers = true;
        participant.answeredCorrectly = isCorrect;
      });

      await this.wait(2700);
      filteredParticipants.forEach((participant) => {
        participant.showingAnswers = false;
      });
    }

    return Promise.resolve();
  }

  async wait(ms): Promise<void> {
    return new Promise(resolve => {
      setTimeout(resolve, ms);
    });
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
