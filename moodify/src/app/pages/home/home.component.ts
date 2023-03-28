import { Component, OnInit, Renderer2 } from '@angular/core';
import { Category } from 'app/core/models/category';
import { AuthService } from 'app/core/services/auth.service';
import { Observable, tap } from 'rxjs';
import { CategoryService } from './services/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{
  isAdmin$!: Observable<boolean>;
  categories$!: Observable<Category[]>;
  constructor(private authService: AuthService, private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.isAdmin$ = this.authService.isAdmin();
    this.categories$ = this.categoryService.getCategories().pipe(
      tap(categories => document.body.style.backgroundImage = `url(${categories.at(0)?.poster_url})`)
    );
  }
}
