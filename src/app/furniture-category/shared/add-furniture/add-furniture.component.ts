import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FurnitureCategoryModel} from '../../furniture-category.model';
import {FurnitureService} from '../../../shared/services/furniture.service';
import {environment} from '../../../../environments/environment';


@Component({
  selector: 'app-add-room',
  templateUrl: './add-furniture.component.html',
  styleUrls: ['./add-furniture.component.scss']
})
export class AddFurnitureComponent {
  name = '';
  furniture: FurnitureCategoryModel = new FurnitureCategoryModel({});
  baseUrl = environment.backendUrl;
  category;
  editMode = false;
  selectedFurniturePhoto;

  constructor(private furnitureService: FurnitureService,
              public dialogRef: MatDialogRef<AddFurnitureComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.furniture = new FurnitureCategoryModel({});
    this.furniture = {...data.furniture};
    if (data.furniture.id) {
      if (data.furniture.photo) {
        this.furniture.photo = this.baseUrl + '/api/v1/download/attachment/' + this.furniture.photo;
      } else {
        this.furniture.photo = 'assets/images/placeholder.png';
      }
      if (this.data.selectedCategory) {
        this.furniture.category_id = this.data.selectedCategory;
      }
      this.editMode = true;
    }
    this.category = data.category;
  }

  cancel(): void {
    this.dialogRef.close('');
  }

  onFileChanged(event) {
    this.selectedFurniturePhoto = event.target.files[0];
    this.furniture.photo = event.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(event.target.files[0]); // read file as data url

    reader.onload = (data: any) => { // called once readAsDataURL is completed
      this.furniture.photo = data.target.result;
    };
  }

  addOrUpdateFurniture() {
    const body = new FormData();
    if (this.furniture.photo !== undefined) {
      body.append('photo', this.selectedFurniturePhoto);
    }
    body.append('name', this.furniture.name);
    body.append('category', this.category.id.toString());
    body.append('hasAlert', this.furniture.attributes.hasAlert.toString());
    body.append('supply', this.furniture.attributes.supply.toString());
    body.append('width', this.furniture.attributes.width.toString());
    body.append('height', this.furniture.attributes.height.toString());
    body.append('depth', this.furniture.attributes.depth.toString());
    body.append('weight', this.furniture.attributes.weight.toString());
    body.append('time', this.furniture.attributes.time.toString());
    if (this.editMode) {
      this.furnitureService.editFurniture(body, this.furniture.id).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    } else {
      this.furnitureService.addFurniture(body).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    }

  }
}
