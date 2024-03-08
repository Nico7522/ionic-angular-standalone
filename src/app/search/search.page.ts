import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  computed,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollCustomEvent, IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { ApiResult, MovieResult } from '../services/interfaces';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subscription, catchError, delay, finalize } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterModule],
})
export class SearchPage implements OnInit {
  private _movieService = inject(MovieService);
  private _activatedRoute = inject(ActivatedRoute);
  private _router = inject(Router);

  movies: WritableSignal<MovieResult[]> = signal([]);
  title: WritableSignal<string> = signal('');
  page: number = 1;
  error: string | null = null;
  isLoading: boolean = true;
  dummyArray = new Array(5);
  imageBaseUrl: string = 'https://image.tmdb.org/t/p';
  sub!: Subscription;
  ngOnInit(): void {
    this._activatedRoute.queryParams.subscribe((p) =>
      this.title.set(p['title'])
    );
    this.sub = this._movieService.search(this.title(), this.page).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.movies.set(res.results);
      },
    });
  }

  search() {}

  loadMore(event?: InfiniteScrollCustomEvent) {
    this.page++;
    if (!event) {
      this.isLoading = true;
    }
    this._movieService
      .search(this.title(), this.page)
      .pipe(
        finalize(() => {
          this.isLoading = false;
          if (event) {
            event.target.complete();
          }
        }),
        catchError((error: any) => {
          this.error = error.error.status_message;
          return [];
        })
      )
      .subscribe({
        next: (res) => {
          this.movies.update((movies) => {
            return [...movies, ...res.results];
          });
          if (event) {
            event.target.disabled = res.total_pages === this.page;
          }
        },
      });
  }
}
