import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Sound } from 'app/core/models/sound';
import { Observable } from 'rxjs';
import { AdminService } from './admin.service';

@Injectable({
  providedIn: 'root'
})
export class AdminResolver implements Resolve<Sound[]> {
  constructor(private adminService: AdminService) {}

  resolve(): Observable<Sound[]> {
    return this.adminService.getSounds();
  }
}
