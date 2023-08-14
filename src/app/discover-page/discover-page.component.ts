import { Component } from '@angular/core';
import { Subscription, map } from 'rxjs';
import { MoviesService } from '../services/movies.service';
import { MovieDetails } from '../models/MovieDetails.model';
import { Router } from '@angular/router';

class GenreRanking {
  private initWeight = 0.2;
  private nextWeight = 0.3;

  private genre: string;
  private count: number = 0;
  private total: number = 0;
  private weight: number = this.initWeight;

  constructor(genre: string) {
    this.genre = genre;
  }

  /**
   * Enables you to vote for a genre.
   *
   * @param {boolean} up - `true` for upvote, `false` for downvote
   */
  vote({ up }: { up: boolean }) {
    if (up) {
      this.count++;

      if (this.count === 3) {
        this.weight = this.nextWeight;
      }

      this.total += this.weight;
    } else {
      this.count = 0;
      this.weight = this.initWeight;
    }
  }

  getScore() {
    return this.total;
  }

  getGenre() {
    return this.genre;
  }
}

@Component({
  selector: 'app-discover-page',
  template: ` <div class="discover">
    <h2>Discover what is your favorite genre</h2>
    <h3 *ngIf="this.currentMovie">
      Left to rank: {{ this.movies?.length + 1 }}
    </h3>
    <div *ngIf="this.currentMovie" class="discover__carousel">
      <div class="discover__carousel-item">
        <app-movie-poster
          *ngIf="currentMovie"
          [movie]="currentMovie"
          [isClickable]="false"
        />
        <div class="discover__carousel-item__actions">
          <button
            class="discover__carousel-item__action discover__carousel-item__action-upvote"
            (click)="vote({ up: true })"
          >
            Upvote
          </button>

          <button
            class="discover__carousel-item__action discover__carousel-item__action-downvote"
            (click)="vote({ up: false })"
          >
            Downvote
          </button>
        </div>
      </div>
    </div>

    <div *ngIf="!this.currentMovie">
      <button (click)="goHome($event)">Go Home</button>
    </div>

    <div
      *ngIf="this.toShowResultsModal"
      class="discover__results-modal-background"
    >
      <div class="discover__results-modal">
        <h2>Results</h2>

        <div class="discover__results-modal__favorite">
          <span> Your favorite genre is </span>
          <p>
            {{ this.sortedRankings[0].getGenre() }}
          </p>
        </div>
        <div class="discover__results-modal__ranking-wrapper">
          <div
            class="discover__results-modal__ranking"
            *ngFor="let ranking of this.sortedRankings"
          >
            <span>{{ ranking.getGenre() }}</span>
            {{ ' - ' }}
            <span>{{ ranking.getScore().toFixed(1) }}</span>
          </div>
        </div>

        <button (click)="closeModal()">Close</button>
      </div>
    </div>
  </div>`,
  styles: [
    `
      .discover {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
      }

      .discover > * {
        padding-top: 16px;
      }

      .discover__carousel {
        display: flex;
        flex-direction: row;
        align-items: flex-start;
        justify-content: center;
        width: 100%;
        max-width: 820px;
        overflow-x: scroll;
        padding-bottom: 4px;
      }

      .discover__carousel-item {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: space-between;
      }

      .discover__carousel-item ~ .discover__carousel-item {
        margin-left: 16px;
      }

      .discover__carousel-item__actions {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        width: 100%;
      }

      .discover__carousel-item__action {
        width: 48%;
      }

      .discover__carousel-item__action-upvote {
        background-color: #58bc5c;
        color: #fff;
      }

      .discover__carousel-item__action-upvote:hover,
      .discover__carousel-item__action-upvote:focus {
        outline: 2px solid #3e8942;
      }

      .discover__carousel-item__action-downvote {
        background-color: #e74c3c;
        color: #fff;
      }

      .discover__carousel-item__action-downvote:hover,
      .discover__carousel-item__action-downvote:focus {
        outline: 2px solid #b33a2b;
      }

      .discover__results-modal-background {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 10;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100vw;
        height: 100vh;

        background-color: rgba(0, 0, 0, 0.5);
      }

      .discover__results-modal {
        width: 360px;
        min-height: 480px;
        z-index: 100;

        overflow-y: scroll;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        background-color: #fff;

        padding: 16px;
        border-radius: 2px;
      }

      .discover__results-modal > * {
        margin: 8px 0;
      }

      .discover__results-modal__favorite {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-top: 16px;
      }

      .discover__results-modal__favorite p {
        font-size: 32px;
        font-weight: bold;
        margin: 16px 0;
      }

      .discover__results-modal__ranking-wrapper {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
        flex-wrap: wrap;
        gap: 4px;

        width: 100%;
      }

      .discover__results-modal__ranking
        ~ .discover__results-modal__ranking::before {
        content: ' • ';
        color: #a4a3a3;
      }
    `,
  ],
})
export class DiscoverPageComponent {
  moviesSub$: Subscription;

  movies: MovieDetails[];
  currentMovie: MovieDetails;

  rankingDict: { [key: string]: GenreRanking } = {};
  sortedRankings: GenreRanking[] = [];
  toShowResultsModal: boolean = false;

  constructor(private movieService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.moviesSub$ = this.movieService
      .getRandomMovieList()
      .pipe(map((res) => res.results))
      .subscribe((movies) => {
        this.movies = movies;
        this.currentMovie = this.movies.shift();
      });
  }

  ngOnDestroy() {
    this.moviesSub$.unsubscribe();
    document.removeEventListener('click', this.handleCloseModal.bind(this));
  }

  vote({ up }: { up: boolean }) {
    const allGenres = this.currentMovie.genres.genres;
    for (let genre of allGenres) {
      if (genre.text in this.rankingDict) {
        this.rankingDict[genre.text].vote({ up });
      } else {
        this.rankingDict[genre.text] = new GenreRanking(genre.text);
        this.rankingDict[genre.text].vote({ up });
      }
    }

    if (this.movies.length === 0) {
      this.sortedRankings = Object.values(this.rankingDict).sort((a, b) => {
        return b.getScore() - a.getScore();
      });

      this.openModal();
    }

    this.currentMovie = this.movies.shift();
  }

  goHome(event: MouseEvent) {
    event.stopPropagation();

    this.router.navigate(['/']);
  }

  openModal() {
    this.toShowResultsModal = true;

    document.addEventListener('click', this.handleCloseModal.bind(this));
  }

  closeModal() {
    this.toShowResultsModal = false;
    document.removeEventListener('click', this.handleCloseModal.bind(this));
  }

  // TODO: Replace this hack with a better solution
  private clickCount = 0;

  handleCloseModal(event: MouseEvent) {
    if (this.clickCount === 0) {
      this.clickCount++;
      return;
    }

    const modal = document.querySelector('.discover__results-modal');

    if (!modal?.contains(event.target as Node)) {
      this.closeModal();
    }
  }
}
