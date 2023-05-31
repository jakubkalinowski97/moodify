import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSliderModule } from '@angular/material/slider';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatDividerModule } from '@angular/material/divider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { SearchInputComponent } from './components/search-input/search-input.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { ItemComponent } from './components/sidenav/nested/item/item.component';
import { MainComponent } from './main/main.component';
import { PageContainerComponent } from './page-container/page-container.component';
import { FileUploaderComponent } from './components/file-uploader/file-uploader.component';
import { LoginModule } from 'app/pages/login/login.module';



@NgModule({
  declarations: [
    SearchInputComponent,
    SpinnerComponent,
    SidenavComponent,
    ToolbarComponent,
    ItemComponent,
    MainComponent,
    PageContainerComponent,
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    NgOptimizedImage,
    MatIconModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    RouterModule,
    MatButtonModule,
    LoginModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatSliderModule,
    MatInputModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    NgOptimizedImage,
    MatTabsModule,
    MatTableModule,
    MatSelectModule,
    MatDividerModule,
    SearchInputComponent,
    SpinnerComponent,
    SidenavComponent,
    ToolbarComponent,
    MainComponent,
    FileUploaderComponent
  ]
})
export class CoreModule { }
