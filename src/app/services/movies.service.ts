import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Pagination } from '../models/Pagination.model';
import { Movie } from '../models/Movie';
import { API_BASE_URL, API_OPTIONS } from '../utils/constants';
import { paramsToString } from '../utils/paramsToString.util';
import { MovieDetails } from '../models/MovieDetails.model';
import { Results } from '../models/Results.model';

interface getMovieListOptions {
  exact?: boolean;
  page: number;
  sort: string;
  titleType: string;
}

interface getMovieDetailsOptions {
  info: string;
}

interface getRandomMovieListOptions {
  limit: number;
  info: string;
  list: string;
}

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private http: HttpClient) {}

  /**
   * Get a list of movies from the API based on a `title` and `options`.
   */
  getMovieList(
    title: string,
    options: getMovieListOptions = {
      exact: false,
      page: 1,
      sort: 'year.incr',
      titleType: 'movie',
    }
  ): Observable<Pagination<Movie>> {
    const urlParams = paramsToString(options);
    const titleParamStr = encodeURIComponent(title);
    const url = `${API_BASE_URL}/search/title/${titleParamStr}?${urlParams}`;

    return this.http.get<Pagination<Movie>>(url, API_OPTIONS);
  }

  /**
   * Get a movie's details from the API based on an `id` and `options`.
   */
  getMovieDetails(
    id: string,
    options: getMovieDetailsOptions = { info: 'base_info' }
  ): Observable<Results<MovieDetails>> {
    const urlParams = paramsToString(options);
    const url = `${API_BASE_URL}/${id}?${urlParams}`;

    return this.http.get<Results<MovieDetails>>(url, API_OPTIONS);
  }

  /**
   * Get a random list of movies from the API based on `options`.
   */
  getRandomMovieList(
    options: getRandomMovieListOptions = {
      limit: 20,
      info: 'base_info',
      list: 'most_pop_movies',
    }
  ): Observable<Pagination<MovieDetails>> {
    const urlParams = paramsToString(options);
    const url = `${API_BASE_URL}/random?${urlParams}`;

    return this.http.get<Pagination<MovieDetails>>(url, API_OPTIONS);
  }
}
