import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AnswerQuestionModel} from '../../models/answer-question.model';



@Component({
  selector: 'app-questions-modal',
  templateUrl: './questions-modal.component.html',
  styleUrls: ['./questions-modal.component.scss']
})
export class QuestionsModalComponent implements OnInit {
  questions:AnswerQuestionModel[];
  constructor(public dialogRef: MatDialogRef<QuestionsModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.questions=[...data.questions];
  }

  ngOnInit(): void {

  }

  cancel(): void {
    this.dialogRef.close(this.questions);
  }
}
