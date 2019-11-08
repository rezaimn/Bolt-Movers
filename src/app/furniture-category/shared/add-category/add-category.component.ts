import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {CategoryService} from '../../../shared/services/category.service';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent {
  name = '';
  editMode = false;
  category;

  constructor(private categoryService: CategoryService,
              public dialogRef: MatDialogRef<AddCategoryComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.category = data.category;
    if (this.category) {
      this.name = this.category.name;
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  cancel(): void {
    this.dialogRef.close('');
  }

  addOrUpdateCategory() {
    const body = {
      name: this.name
    };
    if (this.editMode) {
      this.categoryService.editCategory(body, this.category.id).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    } else {
      this.categoryService.addCategory(body).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    }

  }
}
