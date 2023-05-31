import { Component, OnInit } from '@angular/core';
import { Category } from 'app/core/models/category';
import { Observable, tap } from 'rxjs';
import { CategoryService } from './services/category.service';
import { Store } from '@ngrx/store';
import { selectIsAdmin } from '../login/state/login.selectors';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  isAdmin$!: Observable<boolean>;
  categories$!: Observable<Category[]>;
  constructor(private store: Store, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.isAdmin$ = this.store.select(selectIsAdmin)
    this.categories$ = this.categoryService.getCategories().pipe(
      tap(categories => document.body.style.backgroundImage = `url(${categories.at(0)?.poster_url})`)
    );
  }
}
