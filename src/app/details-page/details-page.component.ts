import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, switchMap, tap } from 'rxjs';
import { MovieDetails } from '../models/MovieDetails.model';
import { MoviesService } from '../services/movies.service';

@Component({
  selector: 'app-details-page',
  template: `
    <div class="details" *ngIf="movie$ | async as movie">
      <div class="details__left">
        <h2 class="details__title">{{ movie.titleText.text }}</h2>

        <div class="details__header">
          <div class="details__header-info">
            <small class="details__info-title">Runtime{{ ' ' }}</small>
            <span>
              {{ movie.runtime.seconds | date : 'HH:mm:ss' }}
            </span>
          </div>

          <div class="details__header-info">
            <small class="details__info-title">Ranking{{ ' ' }}</small>

            <span>
              {{ movie.meterRanking?.currentRank || 'N/A' }}
            </span>
          </div>

          <div *ngIf="movie.releaseDate" class="details__header-info">
            <small class="details__info-title">Released</small>

            <span>
              {{ movie.releaseDate.year }}
            </span>
          </div>
        </div>

        <div>
          <small class="details__info-title">Genres</small>
          <div class="details__genres-list">
            <span
              *ngFor="let genre of movie.genres.genres"
              class="details__genres-item"
            >
              {{ genre.text }}
            </span>
          </div>
        </div>

        <div>
          <small class="details__info-title">Description</small>
          <p
            *ngIf="movie.plot?.plotText?.plainText as description"
            class="details__description"
          >
            {{ description }}
          </p>
        </div>
      </div>

      <div class="details__right">
        <img
          class="details__img"
          [src]="movie.primaryImage?.url"
          alt="Movie Poster"
        />
      </div>
    </div>
  `,
  styles: [
    `
      .details {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: flex-start;
        flex: 1 1 50%;

        width: 100%;
        max-width: 600px;

        margin-top: 16px;
      }

      .details > * {
        flex: 1 1 50%;
      }

      .details__left {
        padding-right: 16px;
      }

      .details__left > * {
        margin-bottom: 8px;
      }

      .details__info-title {
        margin-bottom: 4px;
        display: inline-block;
      }

      .details__header {
        display: flex;
        flex-direction: row;
        align-items: flex-end;
        justify-content: flex-start;
      }

      .details__header-info {
        display: flex;
        flex-direction: column;
      }

      .details__header-info ~ .details__header-info {
        margin-left: 8px;
      }

      .details__genres-list {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
      }

      .details__genres-item ~ .details__genres-item::before {
        content: ' • ';
        margin: 0 4px;
      }

      .details__description {
        margin: 0;
      }

      .details__img {
        width: 100%;
      }
    `,
  ],
})
export class DetailsPageComponent {
  movie$: Observable<MovieDetails>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private moviesService: MoviesService
  ) {}

  ngOnInit(): void {
    this.movie$ = this.activatedRoute.params.pipe(
      map((params) => params['id']),
      switchMap((id) => {
        return this.moviesService.getMovieDetails(id);
      }),
      map((res) => {
        console.log({ res: res.results });

        return res.results;
      })
    );
  }
}
