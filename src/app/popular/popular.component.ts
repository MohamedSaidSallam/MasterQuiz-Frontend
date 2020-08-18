import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-popular',
  templateUrl: './popular.component.html',
  styleUrls: ['./popular.component.scss'],
})
export class PopularComponent implements OnInit {
  quizzes = [{
    genres: ['Tag 1', 'Tag 2', 'Tag 3'],
    name: 'Quiz Title',
    description: 'Quiz Description with filler text',
  },
  {
    genres: ['Tag 1', 'Tag 2', 'Tag 3'],
    name: 'Quiz Title',
    description: 'Quiz Description with filler text',
  },
  {
    genres: ['Tag 1', 'Tag 2', 'Tag 3'],
    name: 'Quiz Title',
    description: 'Quiz Description with filler text',
  },
  {
    genres: ['Tag 1', 'Tag 2', 'Tag 3'],
    name: 'Quiz Title',
    description: 'Quiz Description with filler text',
  }];

  constructor() {}

  ngOnInit(): void {}
}
