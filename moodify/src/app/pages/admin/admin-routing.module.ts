import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'app/core/guards/admin.guard';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminResolver } from './admin.resolver';


const routes: Routes = [
    {
        path: '',
        component: AdminPanelComponent,
        canActivate: [AdminGuard],
        resolve: {
          sounds: AdminResolver
        }
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
