import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PopularComponent } from './popular/popular.component';
import { GenresComponent } from './genres/genres.component';
import { QuizWaitingComponent } from './quiz-waiting/quiz-waiting.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizScoreComponent } from './quiz-score/quiz-score.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'popular',
    component: PopularComponent,
  },
  {
    path: 'genres',
    component: GenresComponent,
  },
  {
    path: 'quiz_waiting',
    component: QuizWaitingComponent,
  },
  {
    path: 'quiz',
    component: QuizComponent,
  },
  {
    path: 'quiz_score',
    component: QuizScoreComponent,
  },
  {
    path: 'PageNotFound',
    component: ErrorPageComponent,
    data: { errorCode: 404, msg: 'Page Not Found' },
  },
  { path: '**', redirectTo: '/PageNotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled',
  })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
