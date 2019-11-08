import { Component, Inject } from '@angular/core';
import { RoomModel } from '../../models/room.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'remove-room-dialog',
  templateUrl: './remove-room-dialog.component.html',
  styleUrls: ['./remove-room-dialog.component.scss']
})
export class RemoveRoomDialogComponent {
  name = '';

  constructor(public dialogRef: MatDialogRef<RemoveRoomDialogComponent>) {
  }
  cancel(name): void {
    this.dialogRef.close('');
  }
}
