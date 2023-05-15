import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminService } from '../../admin.service';
import { NewSound } from 'app/core/models/new-sound';
import { HttpEventType } from '@angular/common/http';
import { distinctUntilKeyChanged, tap } from 'rxjs';

@Component({
  selector: 'app-new-sound-form',
  templateUrl: './new-sound-form.component.html',
  styleUrls: ['./new-sound-form.component.scss']
})
export class NewSoundFormComponent implements OnInit {
  newSoundForm = new FormGroup({
    name: new FormControl('', Validators.required),
    type: new FormControl('', Validators.required),
    category_id: new FormControl(null, Validators.required),
    subcategory_id: new FormControl(null),
    file: new FormControl(null, Validators.required),
    isVisible: new FormControl(true, Validators.required)
  });

  progress: number = 0;
  isMood: boolean = false;

  constructor(private adminService: AdminService) { }

  ngOnInit(): void {
    this.newSoundForm.valueChanges
      .pipe(
        distinctUntilKeyChanged('type'),
        tap((data) => {
          this.toggleSubcategoryField(data as NewSound);
        })
      ).subscribe();
  }

  submit(): void {
    if (!this.newSoundForm.valid) {
      return;
    }

    this.adminService.addNewSound(<NewSound>this.newSoundForm.getRawValue()).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * event.loaded) / event.total);
      }

      if (event.type === HttpEventType.Response) {
        this.newSoundForm.reset();
      }
    });
  }

  private toggleSubcategoryField(data: NewSound): void {
    if(data.type === 'mood') {
      this.showSubcategoryField();
    } else {
      this.hideSubcategoryField();
    }
    this.newSoundForm.updateValueAndValidity();
  }

  private showSubcategoryField(): void {
    const subcategory = this.newSoundForm.controls['subcategory_id'];
    subcategory.enable();
    subcategory.addValidators(Validators.required);
    subcategory.setValue(null);
  }

  private hideSubcategoryField(): void {
    const subcategory = this.newSoundForm.controls['subcategory_id'];
    subcategory.reset();
    subcategory.disable();
  }
}
