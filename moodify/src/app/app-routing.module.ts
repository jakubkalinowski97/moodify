import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SoundsComponent } from './sounds/sounds.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'sounds',
    component: SoundsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
