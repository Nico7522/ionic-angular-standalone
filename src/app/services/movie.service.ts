import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, delay } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ApiResult, MovieResult } from './interfaces';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.api_key;
@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private _http = inject(HttpClient);

  constructor() {}

  getTopRatedMovies(page: number = 1): Observable<ApiResult> {
    return this._http
      .get<ApiResult>(
        `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`
      )
      .pipe(delay(1500));
  }

  getMovieDetails(movieId: string): Observable<MovieResult> {
    return this._http.get<MovieResult>(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
    );
  }

  search(movieTitle: string, page: number): Observable<ApiResult> {
    return this._http.get<ApiResult>(
      `https://api.themoviedb.org/3/search/movie?query=${movieTitle}&include_adult=false&language=en-US&page=${page}&api_key=${API_KEY}`
    );
  }
}
