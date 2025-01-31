import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { StarWarsService, Character } from '../../services/star-wars.service';
import { MatDialog } from '@angular/material/dialog';
import { PlanetDialogComponent } from '../planet-dialog/planet-dialog.component';
import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-star-wars',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatButtonModule, MatInputModule, FormsModule, RouterLink],
  templateUrl: './star-wars.component.html',
  styleUrl: './star-wars.component.scss',
})
export class StarWarsComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  searchTerm: string = '';
  sortAscending: boolean = true;

  constructor(private starWarsService: StarWarsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.starWarsService.getRandomCharacters().subscribe((data) => {
      this.characters = data;
      this.filteredCharacters = [...this.characters];
    });
  }

  searchCharacters(): void {
    this.filteredCharacters = this.characters.filter(character =>
      character.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  sortCharacters(): void {
    this.sortAscending = !this.sortAscending;

    this.filteredCharacters.sort((a, b) => {
      return this.sortAscending
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    });
  }

  openPlanetDialog(character: Character): void {
    if (!character.planet) return;

    this.dialog.open(PlanetDialogComponent, {
      data: character.planet,
      width: '400px',
    });
  }
}
