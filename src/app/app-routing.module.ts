import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PopularComponent } from './popular/popular.component';
import { GenresComponent } from './genres/genres.component';
import { ErrorPageComponent } from './error-page/error-page.component';

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
    path: 'PageNotFound',
    component: ErrorPageComponent,
    data: { errorCode: 404, msg: 'Page Not Found' },
  },
  { path: '**', redirectTo: '/PageNotFound' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
