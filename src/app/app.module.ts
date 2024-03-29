import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PopularComponent } from './popular/popular.component';
import { GenresComponent } from './genres/genres.component';
import { HomeComponent } from './home/home.component';
import { QuizWaitingComponent } from './quiz-waiting/quiz-waiting.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizScoreComponent } from './quiz-score/quiz-score.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

const API_ENDPOINT = 'https://masterquiz-backend.herokuapp.com/api/';
const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

@NgModule({
  declarations: [
    AppComponent,
    PopularComponent,
    GenresComponent,
    HomeComponent,
    QuizWaitingComponent,
    ErrorPageComponent,
    QuizComponent,
    QuizScoreComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
