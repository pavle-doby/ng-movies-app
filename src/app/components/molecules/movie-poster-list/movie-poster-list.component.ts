import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie-poster-list',
  template: `
    <div *ngIf="movies" class="movie-poster-list">
      <h2 *ngIf="title" class="movie-poster-list__title">{{ title }}</h2>
      <div class="movie-poster-list__list">
        <app-movie-poster *ngFor="let movie of movies" [movie]="movie" />
      </div>
    </div>
    <!-- TODO: Handle Empty state -->
  `,
  styles: [
    `
      .movie-poster-list {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
      }

      .movie-poster-list__title {
        margin-bottom: 16px;
      }

      .movie-poster-list__list {
        display: flex;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 24px;
      }
    `,
  ],
})
export class MoviePosterListComponent {
  @Input({ required: true })
  movies: Movie[] = [];
  @Input()
  title: string = '';
}
