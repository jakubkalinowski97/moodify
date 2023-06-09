import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from 'app/core/models/category';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(private api: HttpClient) { }

  getCategories(): Observable<Category[]> {
    return this.api.get<Category[]>('/api/categories');
  }
}
