import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Participant } from '../model/Participant'
import { AnswerOfQuestion } from '../model/AnswerOfQuestion'
@Component({
  selector: 'app-quiz-score',
  templateUrl: './quiz-score.component.html',
  styleUrls: ['./quiz-score.component.scss'],
})
export class QuizScoreComponent implements OnInit {
  quiz: any;
  participantsMap: Map<string, any>;
  participantList = [];
  thisParticipant: Participant;
  answers: any;
  topThreeParticipants: any[];
  remainingParticipants: any[];
  showQuestion: boolean[];
  questions: any[];
  currentParticipantIndex: number;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    const unprocessedParticipants = this.location.getState()['participants'];
    this.thisParticipant = this.location.getState()['thisParticipant'];
    this.processParticipants(unprocessedParticipants);
    this.answers = this.location.getState()['answers'];
    this.questions = this.quiz.questions;
    for(const question of this.questions) {
      question.showScore = true;
    }
    this.processAnswers();
  }

  processParticipants(unprocessedParticipants) : void {
    this.participantsMap = new Map();
    console.log(unprocessedParticipants);
    for (const participant of unprocessedParticipants){
      this.participantsMap.set(participant.hash, { name: participant.name, score: 0, hash: participant.hash});
    }
  }

  processAnswers(): void {
    let i = 0;
    for (const questionAnswers of this.answers){
      this.questions[i].answers = questionAnswers;
      for (const answer of questionAnswers){
        const participant = this.participantsMap.get(answer.hash);
        participant.score += answer.score;
        this.participantsMap.set(answer.hash, participant);
      }
      i++;
    }

    this.participantList = Array.from(this.participantsMap.values());
    this.participantList.sort((a, b) => b.score - a.score);
    this.sortAnswersAccordingToParticipantScore();

    this.currentParticipantIndex = this.participantList.findIndex(
      (item) => item.hash === this.thisParticipant.hash
    );
    this.topThreeParticipants = [...this.participantList.slice(0, 3).entries()];
    this.remainingParticipants = [...this.participantList.slice(3).entries()];
  }

  sortAnswersAccordingToParticipantScore(): void  {
    const sortedParticipantHashes = this.participantList.map(p => p.hash);

    for (const question of this.questions){
      question.answers.sort((a, b) => {
        return sortedParticipantHashes.indexOf(a.hash)
        - sortedParticipantHashes.indexOf(b.hash);
      });
    }
  }

  getTrophyClass(index: number): string {
    switch (index + 1) {
      case 1:
        return 'gold-trophy';
      case 2:
        return 'silver-trophy';
      case 3:
        return 'bronze-trophy';
      default:
        return '';
    }
  }
  getPositionPostfix(index: number): string {
    if (index === 11 || index === 12 || index === 13) {
      return 'th';
    }
    switch (index % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  getTrophyTitle(index: number): string {
    switch (index + 1) {
      case 1:
        return 'First Place';
      case 2:
        return 'Second Place';
      case 3:
        return 'Third Place';
      default:
        return 'WRONG INDEX';
    }
  }
  showWIP(): void {
    alert('WIP');
  }
}
