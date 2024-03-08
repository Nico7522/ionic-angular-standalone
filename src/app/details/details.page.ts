import {
  Component,
  Input,
  OnInit,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MovieService } from '../services/movie.service';
import { MovieResult } from '../services/interfaces';
import { cashOutline, calendarOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
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
  IonButtons,
  IonBackButton,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonText,
  IonCardContent,
  IonIcon,
  IonCard,
  IonButton,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
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
    IonBadge,
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonButtons,
    IonBackButton,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonText,
    IonCardContent,
    IonIcon,
    IonCard,
    DatePipe,
    CurrencyPipe,
  ],
})
export class DetailsPage {
  private _movieService = inject(MovieService);
  imageBaseUrl: string = 'https://image.tmdb.org/t/p';
  movie: WritableSignal<MovieResult | null> = signal(null);

  @Input()
  set movieId(moveiId: string) {
    this._movieService.getMovieDetails(moveiId).subscribe((movie) => {
      console.log(movie);
      this.movie.set(movie);
    });
  }
  constructor() {
    addIcons({ cashOutline, calendarOutline });
  }
}
