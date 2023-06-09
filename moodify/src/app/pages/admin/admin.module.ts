import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from 'app/core/core.module';
import { SoundsTableComponent } from './nested-components/sounds-table/sounds-table.component';
import { NewSoundFormComponent } from './nested-components/new-sound-form/new-sound-form.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { adminFeatureKey, adminReducer } from './state/admin.reducer';
import { AdminEffects } from './state/admin.effects';



@NgModule({
  declarations: [
    NewSoundFormComponent,
    AdminPanelComponent,
    SoundsTableComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule,
    StoreModule.forFeature(adminFeatureKey, adminReducer),
    EffectsModule.forFeature(AdminEffects)
  ]
})
export class AdminModule { }
