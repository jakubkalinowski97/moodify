import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SoundsComponent } from './components/sounds/sounds.component';
import { HomeComponent } from './pages/home/home.component';
import { SoundsAndMoodsComponent } from './pages/sounds-and-moods/sounds-and-moods.component';



const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'sounds-and-moods/cthulhu',
    component: SoundsAndMoodsComponent,
  },
  {
    path: 'sounds-and-moods/witcher',
    component: SoundsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
