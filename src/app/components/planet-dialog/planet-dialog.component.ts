import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Planet } from '../../services/star-wars.service';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-planet-dialog',
  standalone: true,
  template: `
    <h2 mat-dialog-title>🌍 {{ data.name }}</h2>
    <mat-dialog-content>
      <p>Климат: {{ data.climate }}</p>
      <p> Территория: {{ data.terrain }}</p>
      <p> Население: {{ data.population }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button mat-button mat-dialog-close>Закрыть</button>
    </mat-dialog-actions>
  `,
  imports: [CommonModule, MatDialogModule, MatButton],
})
export class PlanetDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Planet) {}
}
