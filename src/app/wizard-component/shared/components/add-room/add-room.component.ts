import { Component, Inject, OnInit } from '@angular/core';
import { RoomModel } from '../../models/room.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-room',
  templateUrl: './add-room.component.html',
  styleUrls: ['./add-room.component.scss']
})
export class AddRoomComponent implements OnInit {
  name = '';
  loadingFloor = 0;
  unloadingFloor = 0;
  isNew = false;



  constructor(public dialogRef: MatDialogRef<AddRoomComponent>,
    private toastr: ToastrService) {
  }

  ngOnInit(): void {

  }

  cancel(name): void {
    this.dialogRef.close(name);
  }

  save() {
    if (this.name === '') {
      this.toastr.error('room name is required', 'Validation Error')
      return;
    }
    this.dialogRef.close({ name: this.name, loadingFloor: this.loadingFloor, unloadingFloor: this.unloadingFloor })
  }

}
