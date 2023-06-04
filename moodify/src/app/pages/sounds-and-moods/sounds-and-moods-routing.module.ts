import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { SoundsAndMoodsComponent } from './sounds-and-moods.component';
import { FiltersComponent } from './nested/background-mood/nested/filters/filters.component';

const routes: Routes = [{ 
  path: ':categoryId', 
  component: SoundsAndMoodsComponent,
  canActivate: [AuthGuard],
  data: { isAvailabilitySidenav: true, componentInPortal: FiltersComponent } }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SoundsAndMoodsRoutingModule { }
