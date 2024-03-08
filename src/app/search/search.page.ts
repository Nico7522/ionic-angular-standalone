import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class SearchPage {
  private _movieService = inject(MovieService);
  movies: WritableSignal<MovieResult[] | null> = signal(null);
  constructor() {
    // this._movieService.search(movieTitle, page).subscribe({
    //   next: (res) => {
    //     this.movies.set(res.results);
    //     console.log(this.movies());
    //   },
    // });
  }
}
