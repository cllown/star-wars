import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {StarWarsComponent} from './components/star-wars/star-wars.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'star-wars';
}
