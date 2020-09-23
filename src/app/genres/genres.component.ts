import { Component, OnInit } from '@angular/core';
import { BackendService } from '../backend.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss'],
})
export class GenresComponent implements OnInit {
  genres: string[];

  constructor(private backendService: BackendService) {}

  ngOnInit(): void {
    this.backendService.getQuizzes().subscribe((data: any[]) => {
      this.genres = [];
      data.forEach((element) => {
        this.genres = this.genres.concat(element.genres);
      });
      this.genres = [...new Set(this.genres)];
    });
  }

  genreOnClick(genre): void {
    alert(`"${genre}" clicked. WIP`);
  }
}
