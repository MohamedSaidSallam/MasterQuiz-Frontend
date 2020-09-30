import { Component, OnInit } from '@angular/core';
import { Participant } from '../model/Participant';
import { SessionService } from '../session.service'
import { ActivatedRoute } from "@angular/router";
import { BackendService } from '../backend.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-quiz-waiting',
  templateUrl: './quiz-waiting.component.html',
  styleUrls: ['./quiz-waiting.component.scss'],
})

export class QuizWaitingComponent implements OnInit {
  quiz: any;
  quizId: string;
  userName: string;
  invitationCode: string;
  messages: string[] = [];

  private sessionService: SessionService;
  thisParticipant: Participant = null;
  participants: Participant[] = [];

  isCountdownShown = false;
  isCountdownTimeShown = true;
  countdownTimeouts: number[] = [];
  QUIZ_START_COUNTDOWN = 5;
  countdown = 5;

  constructor(private backendService: BackendService,
    private route: ActivatedRoute,
    private _router: Router) { }

  random6alphanum() {
    return (Math.random().toString(36) + '00000000000000000').slice(2, 6 + 2)
  }

  toggleReady() {
    if (this.thisParticipant) {
      this.thisParticipant.isReady = !this.thisParticipant.isReady;
      this.sessionService.toggleReady(this.thisParticipant.hash)
    }
  }

  ngOnInit(): void {
    this.userName = prompt("enter your name, warrior:");
    while (!this.userName) {
      this.userName = prompt("enter your name PLEASE ^");
    }
    this.route.queryParams.subscribe(params => {
      this.invitationCode = params["invitationCode"];
      this.quizId = params["quiz"];
      this.sessionService = new SessionService(this.invitationCode);
      this.thisParticipant = { name: this.userName, isReady: false, 
        hash: this.random6alphanum() , answerLocked: false}
      this.sessionService.addParticipant(this.thisParticipant);
      this.sessionService.sendQuizId(this.quizId);
      this.sessionService.foo();
    });

    this.backendService.getOneQuiz(this.quizId).subscribe((quiz) => {
      this.quiz = quiz;
    });

    // if (this.quiz === undefined) {
    //   this._router.navigateByUrl('/PageNotFound');
    // }

    // todo chat
    this.sessionService
      .getMessages()
      .subscribe((message: string) => {
        this.messages.push(message);
      });


    this.sessionService
      .participantAdded()
      .subscribe((participant: Participant) => {
        this.participants.push(participant);
      });


    this.sessionService
      .oldParticipants()
      .subscribe((oldParticipants: any[]) => {
        this.participants.unshift(...oldParticipants);
      });

    this.sessionService
      .readyToggled()
      .subscribe((hash: string) => {
        const participant = this.participants
          .find(participant => participant.hash === hash);
        participant.isReady = !participant.isReady;
      });

    this.sessionService
      .quizCountdownStarted()
      .subscribe(() => {
        this.isCountdownShown = true;
        this.countdown = this.QUIZ_START_COUNTDOWN;
        for (let i = 1; i <= this.QUIZ_START_COUNTDOWN; i++) {
          const timeout = setTimeout(() => {
            this.isCountdownTimeShown = false;
            setTimeout(() => {
              this.countdown = (this.QUIZ_START_COUNTDOWN - i);
              this.isCountdownTimeShown = true;
            }, 20);
          }, 1000 * i);
          this.countdownTimeouts.push(timeout);
        }
      });

    this.sessionService
      .quizCountdownStopped()
      .subscribe(() => {
        this.isCountdownShown = false;
        this.countdownTimeouts.forEach(element => {
          clearTimeout(element);
        });
        this.countdownTimeouts = [];
      });

    this.sessionService
      .quizStarted()
      .subscribe(() => {
        this._router.navigate(['quiz'], {
          state: {
            quiz: this.quiz,
            participants: this.participants,
            thisParticipant: this.thisParticipant,
            sessionCode: this.invitationCode
          }
        });
      });


  }
}
