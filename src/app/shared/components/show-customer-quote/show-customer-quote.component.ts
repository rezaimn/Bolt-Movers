import {Component, OnInit} from '@angular/core';

import {calculatedQuoteModel} from '../../../wizard-component/shared/models/calculatedQuote.model';
import {ActivatedRoute} from '@angular/router';
import {QuoteService} from '../../services/quote.service';


@Component({
  selector: 'app-furniture',
  templateUrl: './show-customer-quote.component.html',
  styleUrls: ['./show-customer-quote.component.scss']
})
export class ShowCustomerQuoteComponent implements OnInit {
  QuoteList: calculatedQuoteModel[] = [];
  selectedCustomer;
  selectedQuoteForEdit = 0;
  displayedColumns: string[] = ['Item', 'Boxing', 'LoadingFloor', 'UnloadingFloor', 'Questions'];

  constructor(private route: ActivatedRoute, private quoteService: QuoteService) {
    this.selectedCustomer = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.getCustomerQuote();
  }

  getCustomerQuote() {
    this.quoteService.getCustomerQuotes(this.selectedCustomer).then(res => {
      res.result.forEach(item => {
        const quoteItem = new calculatedQuoteModel(item.bill, item.updated_at);
        quoteItem.id = item.id;
        quoteItem.name = item.name;
        quoteItem.status = item.status;
        this.QuoteList.push(quoteItem);
      });
    }).catch(err => {

    });
  }

  showQuoteInWizard(id) {
    this.selectedQuoteForEdit = id;
  }


  sendQuoteHTML(index) {
    const quotePDFZone = document.getElementById('Quoteee-' + index);
    const body = {
      email: this.QuoteList[index].email,
      body: quotePDFZone.outerHTML
    };
    this.quoteService.sendQuoteAsHtml(body).then(res => {

    }).catch(err => {

    });
  }
}
