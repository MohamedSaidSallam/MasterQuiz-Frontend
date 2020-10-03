import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-participants-side-list',
  templateUrl: './participants-side-list.component.html',
  styleUrls: ['./participants-side-list.component.scss']
})
export class ParticipantsSideListComponent implements OnInit {
  @Input() participants: any[];

  constructor() { }

  ngOnInit(): void {
  }

}
