import { environment } from '../../../../environments/environment';
import {AnswerQuestionModel} from './answer-question.model';

export class RoomModel {
  products: any[];
  name: string;
  loading_floor: number;
  unloading_floor: number;
  id: number;

  constructor(data: any = {}) {
    this.products = data.products || [];
    this.name = data.name || '';
    this.id = data.id || 0;
    this.loading_floor = data.loadingFloor || 0;
    this.unloading_floor = data.unloadingFloor || 0;
  }
}

export class Product {
  product_id: number;
  quantity: number;
  name: string;
  photo: string;
  boxing: boolean;
  supply:string;
  hasAlert:boolean;
  answers:AnswerQuestionModel[];
  constructor(data: any = {}) {
    this.product_id = data.id || 0;
    this.name = data.name || '';
    this.quantity = data.count || 0;
    this.photo =data.photo || '';
    this.boxing = data.packing || false;
    this.supply=data.supply||'';
    this.hasAlert=data.hasAlert||false;
    this.answers=data.answers||[];
  }
}
