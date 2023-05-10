import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from 'app/core/core.module';
import { SoundsTableComponent } from './nested-components/sounds-table/sounds-table.component';
import { NewSoundFormComponent } from './nested-components/new-sound-form/new-sound-form.component';



@NgModule({
  declarations: [
    NewSoundFormComponent,
    AdminPanelComponent,
    SoundsTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
