import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {PopularComponent} from './popular/popular.component';
import {GenresComponent} from './genres/genres.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'popular',
    component: PopularComponent
  },
  {
    path: 'genres',
    component: GenresComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
