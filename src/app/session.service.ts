import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
const env = environment;

export class SocketNameSpace extends Socket {
  constructor(socketConfig: SocketIoConfig) {
    super(socketConfig);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  static room: SocketNameSpace;
  roomCode: string;

  constructor() {
  }

  public setRoomCode(code: string ){
    this.roomCode = code;
    SessionService.room = new SocketNameSpace({ url: `${env.apiEndpoint}session/${code}` });
  }

  foo() {
    SessionService.room.emit('answer', 'hi ana msg');
  }

  public sendMessage(message): void {
    SessionService.room.emit('msg', message);
  }
  public addParticipant(participant) {
    SessionService.room.emit('addParticipant', participant);
  }

  public sendQuizId(quizId) {
    SessionService.room.emit('sendQuizId', quizId);
  }

  public toggleReady(hash: string) {
    SessionService.room.emit('toggleReady', hash);
  }
  
  public submitAnswer(answer: string) {
    SessionService.room.emit('answer', answer);
  }

  public getMessages = () => {
    return Observable.create((observer) => {
      SessionService.room.on('msg', (message) => {
        observer.next(message);
      });
    });
  };

  public answerLocked = () => {
    return Observable.create((observer) => {
      SessionService.room.on('answerLocked', (ParticipantHash) => {
        observer.next(ParticipantHash);
      });
    });
  }

  public allAnswered = () => {
    return Observable.create((observer) => {
      SessionService.room.on('allAnswered', (answers) => {
        observer.next(answers);
      });
    });
  }

  public participantAdded = () => {
    return Observable.create((observer) => {
      SessionService.room.on('participantAdded', (participant) => {
        observer.next(participant);
      });
    });
  };

  public oldParticipants = () => {
    return Observable.create((observer) => {
      SessionService.room.on('oldParticipants', (participants) => {
        observer.next(participants);
      });
    });
  };

  public readyToggled = () => {
    return Observable.create((observer) => {
      SessionService.room.on('toggleReady', (hash) => {
        observer.next(hash);
      });
    });
  };

  public quizCountdownStarted = () => {
    return Observable.create((observer) => {
      SessionService.room.on('startQuizCountdown', () => {
        observer.next();
      });
    });
  };

  public quizCountdownStopped = () => {
    return Observable.create((observer) => {
      SessionService.room.on('cancelQuizCountdown', () => {
        observer.next();
      });
    });
  };

  public quizStarted = () => {
    return Observable.create((observer) => {
      SessionService.room.on('startQuiz', () => {
        observer.next();
      });
    });
  };
}
