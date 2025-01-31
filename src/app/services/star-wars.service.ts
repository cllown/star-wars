import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { forkJoin, map, Observable, switchMap } from 'rxjs';

export interface Character {
  name: string;
  gender: string;
  birth_year: string;
  homeworld: string;
  planet?: Planet;
}

export interface Planet {
  name: string;
  climate: string;
  terrain: string;
  population: string;
}

@Injectable({
  providedIn: 'root',
})
export class StarWarsService {
  private apiUrl = 'https://swapi.info/api/people';

  constructor(private http: HttpClient) {}


  getAllCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl).pipe(
      switchMap(characters => this.loadPlanetsForCharacters(characters))
    );
  }


  getRandomCharacters(): Observable<Character[]> {
    return this.getAllCharacters().pipe(
      map(characters => this.getRandomSubset(characters, 15))
    );
  }


  private loadPlanetsForCharacters(characters: Character[]): Observable<Character[]> {
    const planetRequests = characters.map(character =>
      this.http.get<Planet>(character.homeworld).pipe(
        map(planet => ({ ...character, planet })),
      )
    );

    return forkJoin(planetRequests);
  }


  private getRandomSubset(characters: Character[], count: number): Character[] {
    return characters.sort(() => 0.5 - Math.random()).slice(0, count);
  }
}
