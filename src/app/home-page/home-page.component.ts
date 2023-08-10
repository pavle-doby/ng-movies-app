import { Component } from '@angular/core';
import {
  Observable,
  Subject,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
} from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { Movie } from '../models/Movie';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="home-page">
      <app-input
        name="autocomplete"
        label="Search"
        placeholder="Type movie title"
        (onInput)="handleInput($event)"
      />
      <div *ngFor="let movie of movies$ | async">
        {{ movie.titleText.text }}
      </div>
    </div>
  `,
  styles: [],
})
export class HomePageComponent {
  inputSubject: Subject<string>;
  movies$: Observable<Movie[]>;

  constructor(private moviesService: MoviesService) {
    this.inputSubject = new Subject<string>();

    // TODO: Handle empty state for titleQuery
    this.movies$ = this.inputSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((titleQuery) => {
        if (titleQuery) {
          return this.moviesService.getMovieList(titleQuery);
        } else {
          return this.moviesService.getRandomMovieList();
        }
      }),
      map((movies) => {
        return movies.results;
      })
    );
  }

  handleInput(value: string): void {
    this.inputSubject.next(value);
  }
}
