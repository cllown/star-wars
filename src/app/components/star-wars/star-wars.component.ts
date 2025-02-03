import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { StarWarsService, Character, Planet } from '../../services/star-wars.service';

@Component({
  selector: 'app-star-wars',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule
  ],
  template: `
    <div class="max-w-4xl mx-auto text-center text-white p-6">
      <h1 class="text-3xl font-bold mb-6">
        {{ dataSourceType === 'random' ? '15 случайных персонажей' : 'Все персонажи' }} Star Wars
      </h1>

      <!-- Форма поиска и кнопки -->
      <div class="flex flex-col md:flex-row items-center gap-4 justify-center mb-6 w-full">
        <mat-form-field appearance="outline" class="w-full max-w-md">
          <mat-label>Поиск персонажа</mat-label>
          <input matInput [(ngModel)]="searchTerm" (input)="searchCharacters()" class="w-full">
        </mat-form-field>

        <button mat-raised-button color="primary"
                class="px-4 py-2 rounded-lg bg-blue-600 text-white shadow-md hover:bg-blue-700 transition"
                (click)="sortCharacters()">
          Sort {{ sortAscending ? '⬆' : '⬇' }}
        </button>

        <button mat-button color="accent"
                class="px-4 py-2 rounded-lg bg-green-600 text-white shadow-md hover:bg-green-700 transition"
                (click)="toggleDataSource()">
          {{ dataSourceType === 'random' ? 'Все персонажи' : 'Случайные персонажи' }}
        </button>
      </div>

      <!-- Карточки персонажей -->
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <mat-card *ngFor="let character of filteredCharacters"
                  class="p-4 bg-gray-900 text-white rounded-lg shadow-lg transform hover:scale-105 transition duration-200">
          <mat-card-header class="flex flex-col justify-center items-center">
            <mat-card-title class="text-lg font-semibold">{{ character.name }}</mat-card-title>
            <mat-card-subtitle class="uppercase text-gray-400">{{ character.gender }}</mat-card-subtitle>
          </mat-card-header>
          <mat-card-content>
            <p class="text-sm"> Год рождения: {{ character.birth_year }}</p>
            <p class="text-sm"> Планета: {{ character.planet?.name || 'Неизвестно' }}</p>
          </mat-card-content>
          <mat-card-actions class="flex flex-col justify-center items-center">
            <button mat-button color="primary" class="text-blue-400 hover:text-blue-500 "
                    (click)="openPlanetDialog(character); $event.stopPropagation();">
              Подробнее о планете
            </button>
          </mat-card-actions>
        </mat-card>
      </div>
    </div>

    <ng-template #planetDialog let-data>
      <h2 mat-dialog-title class="text-xl font-bold text-white">🌍 {{ selectedPlanet?.name }}</h2>
      <mat-dialog-content class="text-gray-300">
        <p>Климат: {{ selectedPlanet?.climate }}</p>
        <p>Территория: {{ selectedPlanet?.terrain }}</p>
        <p>Население: {{ selectedPlanet?.population }}</p>
      </mat-dialog-content>
      <mat-dialog-actions align="end">
        <button mat-button mat-dialog-close class="text-red-400 hover:text-red-500">Закрыть</button>
      </mat-dialog-actions>
    </ng-template>
  `
})
export class StarWarsComponent implements OnInit {
  characters: Character[] = [];
  filteredCharacters: Character[] = [];
  searchTerm: string = '';
  sortAscending: boolean = true;
  selectedPlanet: Planet | null = null;

  @ViewChild('planetDialog') planetDialog!: TemplateRef<any>;

  dataSourceType: 'random' | 'all' = 'random';

  constructor(private starWarsService: StarWarsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    if (this.dataSourceType === 'random') {
      this.starWarsService.getRandomCharacters().subscribe((data) => {
        this.characters = data;
        this.filteredCharacters = [...this.characters];
      });
    } else {
      this.starWarsService.getAllCharacters().subscribe((data) => {
        this.characters = data;
        this.filteredCharacters = [...this.characters];
      });
    }
  }

  toggleDataSource(): void {
    this.dataSourceType = this.dataSourceType === 'random' ? 'all' : 'random';
    this.loadCharacters();
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

    this.selectedPlanet = character.planet;
    this.dialog.open(this.planetDialog, {
      width: '400px',
    });
  }
}
