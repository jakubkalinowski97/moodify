import { Component, OnInit } from '@angular/core';
import { Category } from 'app/core/models/category';
import { Observable, filter, first, map, tap } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../login/state/login.selectors';
import { ActivatedRoute } from '@angular/router';
import { HomeActions } from './state/home.actions';
import { selectCategories } from './state/home.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  isAdmin$!: Observable<boolean>;
  categories$!: Observable<Category[]>;
  constructor(private store: Store, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(selectIsAdmin);
    this.categories$ = this.store.select(selectCategories).pipe(
      tap(categories => document.body.style.backgroundImage = `url(${categories.at(0)?.poster_url})`));
  }
}
