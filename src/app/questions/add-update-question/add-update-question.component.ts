import {Component, Inject} from '@angular/core';

import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {QuestionService} from '../../shared/services/question.service';


@Component({
  selector: 'app-add-update-question',
  templateUrl: './add-update-question.component.html',
  styleUrls: ['./add-update-question.component.scss']
})
export class AddUpdateQuestionComponent {
  name = '';
  editMode = false;
  question = {
    id: 0,
    question: ''
  };

  constructor(private questionService: QuestionService,
              public dialogRef: MatDialogRef<AddUpdateQuestionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {

    if (data.question) {
      this.question = data.question;
      this.editMode = true;
    } else {
      this.editMode = false;
    }
  }

  cancel(): void {
    this.dialogRef.close('');
  }

  addOrUpdateQuestion() {
    const body = {
      question: this.question.question
    };
    if (this.editMode) {
      this.questionService.editQuestion(body, this.question.id).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    } else {

      this.questionService.addQuestion(body).then(
        (result => {
          this.dialogRef.close(result.result);
        })
      );
    }

  }
}
