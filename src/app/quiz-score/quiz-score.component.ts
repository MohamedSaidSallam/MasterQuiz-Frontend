import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-quiz-score',
  templateUrl: './quiz-score.component.html',
  styleUrls: ['./quiz-score.component.scss'],
})
export class QuizScoreComponent implements OnInit {
  quiz: any;
  participants = [
    { name: 'Someone1', score: 2518, isReady: false },
    { name: 'Someone2', score: 1234, isReady: true },
    { name: 'Someone3', score: 2036, isReady: true },
    { name: 'Someone4', score: 2988, isReady: false },
    { name: 'Someone5', score: 3628, isReady: false },
    {
      name: 'Someone6asd asd asdqw dqwd asd wqd asd asdw asdw dasd ',
      score: 151,
      isReady: true,
    },
  ];
  currentParticipantIndex: number;
  currentParticipantName = 'Someone3';
  topThreeParticipants: IterableIterator<
    [number, { name: string; score: number; isReady: boolean }]
  >;
  remainingParticipants: IterableIterator<
    [number, { name: string; score: number; isReady: boolean }]
  >;

  constructor(private location: Location) {}

  ngOnInit(): void {
    this.quiz = this.location.getState()['quiz'];
    this.sortParticipants();
  }

  sortParticipants(): void {
    this.participants.sort((a, b) => b.score - a.score);
    this.currentParticipantIndex = this.participants.findIndex(
      (item) => item.name === this.currentParticipantName
    );
    this.topThreeParticipants = this.participants.slice(0, 3).entries();
    this.remainingParticipants = this.participants.slice(0, 3).entries();
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
    index = index + 1;
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
