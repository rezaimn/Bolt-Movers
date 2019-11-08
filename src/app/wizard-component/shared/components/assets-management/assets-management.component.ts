import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {RoomModel} from '../../models/room.model';
import {AddRoomComponent} from '../add-room/add-room.component';
import {RemoveProductDialogComponent} from '../remove-product-dialog/remove-product-dialog.component';
import {MatDialog} from '@angular/material';
// import { CategoryService } from
import {FormControl} from '@angular/forms';
import {CategoryService} from '../../../../shared/services/category.service';
import {RemoveRoomDialogComponent} from '../remove-room-dialog/remove-room-dialog.component';
import {ClearCacheService} from '../../../../shared/services/clear-cache.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {AddCategoryComponent} from '../../../../furniture-category/shared/add-category/add-category.component';
import {FurnitureCategoryModel} from '../../../../furniture-category/furniture-category.model';
import {AddFurnitureComponent} from '../../../../furniture-category/shared/add-furniture/add-furniture.component';
import {QuestionService} from '../../../../shared/services/question.service';
import {QuestionsModalComponent} from '../questions-modal/questions-modal.component';
import {AnswerQuestionModel} from '../../models/answer-question.model';
import {environment} from '../../../../../environments/environment';


@Component({
  selector: 'app-assets-management',
  templateUrl: './assets-management.component.html',
  styleUrls: ['./assets-management.component.scss']
})
export class AssetsManagementComponent implements OnInit {

  @Output() getData = new EventEmitter<any>();
  @ViewChild('searchInput') searchInput: ElementRef;
  categorySearch = '';
  productBoxing = new FormControl('');
  selectedProductIndex;
  productQuantity = new FormControl('');
  @Input('rooms') rooms: RoomModel[];
  questionList: AnswerQuestionModel [] = [];
  selectedRoom: RoomModel;
  selectedRoomIndex = 0;
  selectedCategoryIndex = 0;
  imageUrl = environment.backendUrl + '/api/v1/download/attachment/';
  categories: any[] = [];

  constructor(public dialog: MatDialog, private clearCacheService: ClearCacheService, private questionService: QuestionService,
              private _categoryService: CategoryService) {
    this.getAllQuestions();
    this.searchCategories('');
  }

  ngOnInit(): void {
    this.getData.emit(this.rooms);
    fromEvent(this.searchInput.nativeElement, 'keyup').pipe(
      debounceTime(500)
      // If previous query is diffent from current
      , distinctUntilChanged()
      // subscription for response
    ).subscribe((text: any) => {
      this.searchCategories(text.target.value);
    });
  }

  getAllQuestions() {
    this.questionService.getAllQuestions().then(result => {
      this.questionList = result.result.map(question => {
        return {
          question: question.question,
          answer: ''
        };
      });
    });
  }

  searchCategories(searchText) {
    this.clearCacheService.clearCache('categories').then(() => {
      this._categoryService.getAllCategoriesWithProduct(searchText).then((res: any) => {
        this.categories = [];
        res.result.map(item => this.categories.push(item));
      }).catch(err => console.log(err));
    });
  }

  selectRoom(room, index) {
    this.selectedRoomIndex = index;
  }

  openAddRoomDialog(): void {
    const dialogRef = this.dialog.open(AddRoomComponent, {
      width: '50%',
    });
    dialogRef.componentInstance.isNew = true;
    dialogRef.componentInstance.name = '';

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result != null && result !== '') {
        const roomT = new RoomModel({});
        roomT.name = result.name;
        roomT.loading_floor = result.loadingFloor;
        roomT.unloading_floor = result.unloadingFloor;
        this.rooms.push(roomT);
        this.getData.emit(this.rooms);
      }

    });
  }

  addProductToSelectedRoom(product: any, productIndex) {
    let productTemp = {
      product_id: product.id,
      photo:product.photo,
      name: product.name,
      boxing: false,
      answers: [],
      quantity: 0
    };

    if (product.attributes.hasAlert) {
      this.openAnswerQuestionsModal(productIndex);
    }
    if (this.selectedRoomIndex >= 0 && this.rooms.length > 0) {
      let isExist = false;
      this.rooms[this.selectedRoomIndex].products.map(productT => {
        if (productTemp.product_id === productT.product_id) {
          isExist = true;
          productT.quantity += 1;
        }
        return productT;
      });
      if (!isExist) {
        productTemp.quantity = 1;
        this.rooms[this.selectedRoomIndex].products.push(productTemp);
      }
      this.getData.emit(this.rooms);

    }
  }

  deleteRoom(room, index) {

    const removeRoomDialogRef = this.dialog.open(RemoveRoomDialogComponent, {
      width: '30%',
    });

    removeRoomDialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        if (this.selectedRoomIndex === index) {
          this.selectedRoomIndex = null;
        }
        this.rooms.splice(index, 1);
        this.getData.emit(this.rooms);
      }
    });
  }

  editRoom(room, index) {
    const editRoomDialogRef = this.dialog.open(AddRoomComponent, {
      width: '50%',
    });

    editRoomDialogRef.componentInstance.isNew = false;
    editRoomDialogRef.componentInstance.name = room.name;
    editRoomDialogRef.componentInstance.loadingFloor = room.loading_floor;
    editRoomDialogRef.componentInstance.unloadingFloor = room.unloading_floor;

    editRoomDialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        this.rooms[index].name = result.name;
        this.rooms[index].loading_floor = result.loadingFloor;
        this.rooms[index].unloading_floor = result.unloadingFloor;
        this.getData.emit(this.rooms);
      }
    });
  }

  deleteProduct(index) {
    if (this.rooms[this.selectedRoomIndex].products[index].quantity > 1) {
      this.rooms[this.selectedRoomIndex].products[index].quantity--;
    } else {
      this.rooms[this.selectedRoomIndex].products.splice(index, 1);
    }
    this.getData.emit(this.rooms);
  }

  selectCategoryIndex(index) {
    this.selectedCategoryIndex = index;
  }

  selectProductIndex(index) {
    this.selectedProductIndex = index;
    this.productQuantity.setValue(this.rooms[this.selectedRoomIndex].products[this.selectedProductIndex].quantity);
    this.productBoxing.setValue(this.rooms[this.selectedRoomIndex].products[this.selectedProductIndex].boxing);
  }

  openRemoveProductDialog() {
    const removeProductDialogRef = this.dialog.open(RemoveProductDialogComponent, {
      width: '30%',
    });

    removeProductDialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        this.rooms[this.selectedRoomIndex].products.splice(this.selectedProductIndex, 1);
        this.getData.emit(this.rooms);
      }
    });
  }

  toggleProductBoxing() {
    this.rooms[this.selectedRoomIndex].products[this.selectedProductIndex].boxing =
      !this.rooms[this.selectedRoomIndex].products[this.selectedProductIndex].boxing;
    this.getData.emit(this.rooms);
  }

  changeProductQuantity() {
    if (this.productQuantity.value >= 1) {
      this.rooms[this.selectedRoomIndex].products[this.selectedProductIndex].quantity = this.productQuantity.value;
    } else {
      this.rooms[this.selectedRoomIndex].products[this.selectedProductIndex].quantity = 1;
    }

    this.getData.emit(this.rooms);
  }

  stopClickPropagation(event) {
    event.stopPropagation();
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
          this.searchCategories('');
        });
      }
    });
  }


  openAddFurnitureDialog(selectedFurniture, category): void {
    let tempFurniture: FurnitureCategoryModel = new FurnitureCategoryModel({});
    if (selectedFurniture != null) {
      tempFurniture = {...selectedFurniture};
    }
    const dialogRef = this.dialog.open(AddFurnitureComponent, {
      width: '50%',
      data: {
        furniture: tempFurniture,
        category: category,
        selectedCategory: this.categories[this.selectedCategoryIndex]
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        this.clearCacheService.clearCache('categories').then(() => {
          this.searchCategories('');
        });

      }
    });
  }


  openAnswerQuestionsModal(productIndex): void {
    const dialogRef = this.dialog.open(QuestionsModalComponent, {
      width: '60%',
      data: {
        questions: [...this.questionList],
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.rooms[this.selectedRoomIndex].products[productIndex].answers=[];
      for(let answer of result){
        let answerQ={
          question:answer.question,
          answer:answer.answer
        }
        this.rooms[this.selectedRoomIndex].products[productIndex].answers.push(answerQ);
      }
      for (let question of this.questionList) {
        question.answer = '';
      }
      this.getData.emit(this.rooms);
    });
  }

}
