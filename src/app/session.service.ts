import { Injectable } from '@angular/core';
import { Socket, SocketIoConfig } from 'ngx-socket-io';
import { Observable } from 'rxjs';

export class SocketNameSpace extends Socket {
  constructor(socketConfig: SocketIoConfig) {
    super(socketConfig);
  }
}

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  room: SocketNameSpace;

  constructor(private code: string) {
    this.room = new SocketNameSpace({
      url: `https://masterquiz-backend.herokuapp.com/session/${code}`,
    });
  }

  foo() {
    this.room.emit('answer', 'hi ana msg');
  }

  public sendMessage(message): void {
    this.room.emit('msg', message);
  }
  public addParticipant(participant) {
    this.room.emit('addParticipant', participant);
  }

  public sendQuizId(quizId) {
    this.room.emit('sendQuizId', quizId);
  }

  public toggleReady(hash: string) {
    this.room.emit('toggleReady', hash);
  }
  public getMessages = () => {
    return Observable.create((observer) => {
      this.room.on('msg', (message) => {
        observer.next(message);
      });
    });
  };

  public participantAdded = () => {
    return Observable.create((observer) => {
      this.room.on('participantAdded', (participant) => {
        observer.next(participant);
      });
    });
  };

  public oldParticipants = () => {
    return Observable.create((observer) => {
      this.room.on('oldParticipants', (participants) => {
        observer.next(participants);
      });
    });
  };

  public readyToggled = () => {
    return Observable.create((observer) => {
      this.room.on('toggleReady', (hash) => {
        observer.next(hash);
      });
    });
  };

  public quizCountdownStarted = () => {
    return Observable.create((observer) => {
      this.room.on('startQuizCountdown', () => {
        observer.next();
      });
    });
  };

  public quizCountdownStopped = () => {
    return Observable.create((observer) => {
      this.room.on('cancelQuizCountdown', () => {
        observer.next();
      });
    });
  };

  public quizStarted = () => {
    return Observable.create((observer) => {
      this.room.on('startQuiz', () => {
        observer.next();
      });
    });
  };
}
