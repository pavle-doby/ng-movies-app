import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  of,
  switchMap,
} from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="home-page">
      <app-input
        class="home-page__input"
        name="autocomplete"
        placeholder="Search by title"
        (onInput)="handleInput($event)"
      />

      <!-- TODO: Make Poster List component -->
      <div
        *ngIf="movies$ | async as movies"
        class="home-page__movie-list-wrapper"
      >
        <h3 *ngIf="movies.length" class="home-page__subtitle">
          Search results
        </h3>
        <div class="home-page__movie-list">
          <app-movie-poster *ngFor="let movie of movies" [movie]="movie" />
        </div>
      </div>

      <div
        *ngIf="randomMovies$ | async as randomMovies"
        class="home-page__movie-list-wrapper"
      >
        <h3 class="home-page__subtitle">Random movies</h3>
        <div class="home-page__movie-list">
          <app-movie-poster
            *ngFor="let movie of randomMovies"
            [movie]="movie"
          />
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      .home-page {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        max-width: 800px;
      }

      .home-page > * {
        margin-top: 16px;
      }

      .home-page__input {
        width: 300px;
      }

      .home-page__subtitle {
        margin-bottom: 16px;
      }

      .home-page__movie-list-wrapper {
        width: 100%;
      }

      .home-page__movie-list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 24px;
      }
    `,
  ],
})
export class HomePageComponent {
  inputSubject: Subject<string>;

  movies$: Observable<Movie[]>;
  randomMovies$: Observable<Movie[]>;

  constructor(private moviesService: MoviesService) {
    this.inputSubject = new Subject<string>();

    // TODO: Handle empty state for titleQuery
    this.movies$ = this.inputSubject.pipe(
      // filter((titleQuery) => titleQuery !== ''),
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((titleQuery) => {
        if (!titleQuery) {
          return of({ results: [] });
        }

        return this.moviesService.getMovieList(titleQuery);
      }),
      map((movies) => {
        return movies.results;
      })
    );

    this.randomMovies$ = this.moviesService.getRandomMovieList().pipe(
      map((movies) => {
        return movies.results;
      })
    );
  }

  handleInput(value: string): void {
    this.inputSubject.next(value);
  }
}
