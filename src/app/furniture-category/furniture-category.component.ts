import {Component, OnInit} from '@angular/core';
import {FurnitureService} from '../shared/services/furniture.service';
import {environment} from '../../environments/environment';
import {MatDialog} from '@angular/material';
import {FurnitureCategoryModel} from './furniture-category.model';
import {AddFurnitureComponent} from './shared/add-furniture/add-furniture.component';
import {DeleteConfirmationComponent} from '../shared/components/delete-confirmation/delete-confirmation.component';
import {ClearCacheService} from '../shared/services/clear-cache.service';
import {AddCategoryComponent} from './shared/add-category/add-category.component';
import {CategoryService} from '../shared/services/category.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './furniture-category.component.html',
  styleUrls: ['./furniture-category.component.scss']
})
export class FurnitureCategoryComponent implements OnInit {
  panelOpenState = false;
  selectedFurniturePhoto;
  selectedCategoryId;
  baseUrl = environment.backendUrl;
  categoryList = [];
  selectedCategoryFurnitureList = [];
  furniture: FurnitureCategoryModel = new FurnitureCategoryModel({});
  selectedFurnitureIndex;
  imageForUpload;
  selectedCategoryIndex = -1;
  constructor(private furnitureService: FurnitureService, private clearCacheService: ClearCacheService,
              public dialog: MatDialog, private categoryService: CategoryService) {

  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories() {
    this.furnitureService.getAllCategories().then(result => {
      this.categoryList = result.result;
    });
  }

  setCategoryIndex(index) {
    this.selectedCategoryIndex = index;

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteCategory();
      }
    });
  }

  deleteCategory() {
    this.categoryService.deleteCategory(this.categoryList[this.selectedCategoryIndex].id).then(result => {
      this.clearCacheService.clearCache('categories').then(() => {
      });
      this.categoryList.splice(this.selectedCategoryIndex, 1);
    });
  }

  openAddCategoryDialog(selectedCategory): void {
    const dialogRef = this.dialog.open(AddCategoryComponent, {
      width: '50%',
      data: {
        category: selectedCategory
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        this.clearCacheService.clearCache('categories').then(() => {
          this.getAllCategories();
        });
      }
    });
  }

  getCategoryFurniture(categoryId) {
    this.selectedCategoryId = categoryId;
    this.selectedCategoryFurnitureList = [];
    this.furnitureService.getCategoryFurniture(categoryId).then(result => {
      this.selectedCategoryFurnitureList = result.result[0].products;
    });
  }

  setFurnitureIndex(index) {
    this.selectedFurnitureIndex = index;

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '50%',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteFurniture();
      }
    });
  }

  deleteFurniture() {
    this.furnitureService.deleteFurniture(this.selectedCategoryFurnitureList[this.selectedFurnitureIndex].id).then(result => {
      this.clearCacheService.clearCache('categories').then(() => {
      });
      this.selectedCategoryFurnitureList.splice(this.selectedFurnitureIndex, 1);
    });
  }

  openAddFurnitureDialog(selectedFurniture, category): void {
    let tempFurniture: FurnitureCategoryModel = new FurnitureCategoryModel({});
    if (selectedFurniture != null) {
      tempFurniture = {...this.selectedCategoryFurnitureList[selectedFurniture]};
    }
    const dialogRef = this.dialog.open(AddFurnitureComponent, {
      width: '50%',
      data: {
        furniture: tempFurniture,
        category: category,
        selectedCategory: null
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        this.clearCacheService.clearCache('categories').then(() => {
          this.getCategoryFurniture(this.selectedCategoryId);
        });

      }
    });
  }
}
