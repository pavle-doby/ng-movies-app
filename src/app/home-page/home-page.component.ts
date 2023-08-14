import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  map,
  of,
  switchMap,
} from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="home-page">
      <div class="home-page__search">
        <app-input
          class="home-page__input"
          name="autocomplete"
          placeholder="Search by title"
          (onInput)="handleInput($event)"
        />

        <button>
          <a routerLink="/discover">Discover</a>
        </button>
      </div>

      <app-movie-poster-list
        *ngIf="movies$ | async as movies"
        class="width-100"
        [movies]="movies"
        [isPosterClickable]="true"
        title="Search results"
        (onClick)="openDetails($event)"
      />

      <app-movie-poster-list
        *ngIf="randomMovies$ | async as randomMovies"
        class="width-100"
        [movies]="randomMovies"
        [isPosterClickable]="true"
        title="What To Watch"
        (onClick)="openDetails($event)"
      />
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

      .home-page__search {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;

        width: 100%;
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

  constructor(private moviesService: MoviesService, private router: Router) {
    this.inputSubject = new Subject<string>();

    // TODO: Handle empty state for titleQuery
    this.movies$ = this.inputSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((titleQuery) => {
        if (!titleQuery) {
          return of({ results: null });
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

  openDetails(movie: Movie): void {
    this.router.navigate(['details', movie.id]);
  }
}
