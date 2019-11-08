import {Component, Inject} from '@angular/core';
import {RoomModel} from '../../models/room.model';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'remove-product-dialog',
  templateUrl: './remove-product-dialog.component.html',
  styleUrls: ['./remove-product-dialog.component.scss']
})
export class RemoveProductDialogComponent {
  name='';

  constructor(public dialogRef: MatDialogRef<RemoveProductDialogComponent>) {
  }
  cancel(name): void {
    this.dialogRef.close('');
  }
}
