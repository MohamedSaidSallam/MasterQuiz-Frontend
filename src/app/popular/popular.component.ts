import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';
import { SessionService } from '../session.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  quizzes: any[];
  selectedQuiz: any;
  sessionService: SessionService;
  detailedViewVisible = false;

  constructor(private backendService: BackendService, private router: Router) {}

  ngOnInit(): void {
    this.backendService.getQuizzes().subscribe((data: any[]) => {
      this.quizzes = data;
    });
  }

  openQuizWaitingRoom() : void{
    this.backendService.getSessionCode().subscribe((data: any) => {
      const invitationCode = data;
      
      this.router.navigate(['/quiz_waiting'], {queryParams: {invitationCode, quiz: this.selectedQuiz._id}});
    });
  }
}
