import { Routes } from '@angular/router';
import { StarWarsComponent } from './components/star-wars/star-wars.component';
import {CharactersPageComponent} from './components/characters-page/characters-page.component';

export const appRoutes: Routes = [
  { path: '', component: StarWarsComponent },
  { path: 'characters', component: CharactersPageComponent },
];
