import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantsSideListComponent } from './participants-side-list.component';

describe('ParticipantsSideListComponent', () => {
  let component: ParticipantsSideListComponent;
  let fixture: ComponentFixture<ParticipantsSideListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticipantsSideListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantsSideListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
