import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonSkeletonText,
  IonAvatar,
  IonItem,
  IonAlert,
  IonLabel,
  InfiniteScrollCustomEvent,
  IonBadge,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonSearchbar,
  IonButton,
} from '@ionic/angular/standalone';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { catchError, finalize, map } from 'rxjs';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-defer',
  templateUrl: 'home-defer.page.html',
  styleUrls: ['home-defer.page.scss'],
  standalone: true,
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonSkeletonText,
    IonAvatar,
    IonItem,
    IonAlert,
    IonLabel,
    DatePipe,
    RouterModule,
    IonBadge,
    IonButton,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonSearchbar,
    FormsModule,
  ],
})
export class HomeDeferPage {
  private _movieService = inject(MovieService);
  private _router = inject(Router);
  currentPage: number = 1;
  error: string | null = null;
  isLoading: boolean = false;
  movies: MovieResult[] = [];
  imageBaseUrl: string = 'https://image.tmdb.org/t/p';
  dummyArray = new Array(5);
  title!: string;
  constructor() {
    this.loadMovies();
  }

  loadMovies(event?: InfiniteScrollCustomEvent) {
    this.error = null;
    console.log(event);

    if (!event) {
      this.isLoading = true;
    }

    this._movieService
      .getTopRatedMovies(this.currentPage)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((error: any) => {
          console.log(error);

          this.error = error.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);

          this.movies.push(...res.results);
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage;
          }
        },
      });
  }

  loadMore(event: InfiniteScrollCustomEvent) {
    this.currentPage++;
    this.loadMovies(event);
  }

  search() {
    this._router.navigate(['/search'], { queryParams: { title: this.title } });
  }
}
