import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploaderComponent } from './nested-components/file-uploader/file-uploader.component';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminRoutingModule } from './admin-routing.module';
import { CoreModule } from 'app/core/core.module';



@NgModule({
  declarations: [
    FileUploaderComponent,
    AdminPanelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    CoreModule
  ]
})
export class AdminModule { }
