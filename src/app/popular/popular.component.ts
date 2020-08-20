import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  quizzes: any[];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getQuizzes().subscribe((data: any[]) => {
      this.quizzes = data;
    });
  }
}
