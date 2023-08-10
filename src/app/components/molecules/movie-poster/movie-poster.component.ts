import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Movie } from 'src/app/models/Movie';

@Component({
  selector: 'app-movie-poster',
  template: `
    <div class="movie-poster" (click)="handleClick()">
      <img
        class="movie-poster__img"
        alt="Movie Poster"
        [src]="movie.primaryImage?.url || imagePlaceholder"
        (error)="movie.primaryImage.url = imagePlaceholder"
      />
      <h4 class="movie-poster__title">{{ movie.titleText.text }}</h4>
    </div>
  `,
  styles: [
    `
      .movie-poster {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
        width: 180px;
        height: 100%;
        padding-bottom: 8px;
        border-radius: 2px;
      }

      .movie-poster:hover {
        cursor: pointer;
        box-shadow: 0 0 4px 2px #ccc;
        scale: 1.1;
        transition: all 0.2s ease-in-out;
      }

      .movie-poster__img {
        width: 180px;
        height: 270px;
        object-fit: cover;
      }

      .movie-poster__title {
        padding: 8px 4px 0 4px;
      }
    `,
  ],
})
export class MoviePosterComponent {
  @Input({ required: true })
  movie: Movie;

  @Output()
  onClick: EventEmitter<Movie> = new EventEmitter<Movie>();

  imagePlaceholder: string = 'https://via.placeholder.com/180x270';

  handleClick(): void {
    this.onClick.emit(this.movie);
  }
}
