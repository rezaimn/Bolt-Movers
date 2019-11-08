import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DeleteConfirmationComponent} from '../shared/components/delete-confirmation/delete-confirmation.component';
import {AddUpdateDispatchComponent} from './add-update-dispatch/add-update-dispatch.component';
import {DispatchService} from '../shared/services/dispatch.service';
import {ClearCacheService} from '../shared/services/clear-cache.service';

@Component({
  selector: 'app-dispatches',
  templateUrl: './dispatches.component.html',
  styleUrls: ['./dispatches.component.scss']
})
export class DispatchesComponent implements OnInit {

  selectedDispatchIndex;
  dispatchList = [];

  constructor(private dispatchService: DispatchService, private clearCacheService: ClearCacheService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllDispatches();
  }


  getAllDispatches() {
    this.dispatchService.getAllDispatches().then(result => {
      this.dispatchList = result.result;
    });
  }

  setDispatchIndex(index) {
    this.selectedDispatchIndex = index;

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteDispatch();
      }
    });
  }

  deleteDispatch() {
    this.dispatchService.deleteDispatch(this.dispatchList[this.selectedDispatchIndex].id).then(result => {
      this.dispatchList.splice(this.selectedDispatchIndex, 1);
    });
  }

  openAddDispatchDialog(selectedDispatch): void {
    const dialogRef = this.dialog.open(AddUpdateDispatchComponent, {
      width: '70%',
      data: {
        dispatch: selectedDispatch
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        this.getAllDispatches();
      }
    });
  }
}
