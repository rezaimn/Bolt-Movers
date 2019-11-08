import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {DeleteConfirmationComponent} from '../shared/components/delete-confirmation/delete-confirmation.component';
import {AddUpdateQuestionComponent} from './add-update-question/add-update-question.component';
import {QuestionService} from '../shared/services/question.service';
import {ClearCacheService} from '../shared/services/clear-cache.service';

@Component({
  selector: 'app-furniture',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {

  selectedQuestionIndex;
  questionList = [];

  constructor(private questionService: QuestionService, private clearCacheService: ClearCacheService,
              public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.getAllQuestions();
  }


  getAllQuestions() {
    this.questionService.getAllQuestions().then(result => {
      this.questionList = result.result;
    });
  }

  setQuestionIndex(index) {
    this.selectedQuestionIndex = index;

    const dialogRef = this.dialog.open(DeleteConfirmationComponent, {
      width: '400px',
      data: {}
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result === true) {
        this.deleteQuestion();
      }
    });
  }

  deleteQuestion() {
    this.questionService.deleteQuestion(this.questionList[this.selectedQuestionIndex].id).then(result => {
      this.questionList.splice(this.selectedQuestionIndex, 1);
    });
  }

  openAddQuestionDialog(selectedQuestion): void {
    const dialogRef = this.dialog.open(AddUpdateQuestionComponent, {
      width: '50%',
      data: {
        question: selectedQuestion
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result != null && result !== '') {
        this.getAllQuestions();
      }
    });
  }
}
