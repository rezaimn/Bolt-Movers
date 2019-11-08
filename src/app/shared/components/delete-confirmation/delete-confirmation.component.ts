import { Component, Inject, OnInit } from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-add-room',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationComponent>,
               @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  cancel(): void {
    this.dialogRef.close(false);
  }
  deleteApproved(){
    this.dialogRef.close(true);
  }
}
