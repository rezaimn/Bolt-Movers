import { Product } from './room.model';
export class Category {
  id: number;
  name: String;
  products: Product[];

  constructor(data) {
    this.id = data.id || 0;
    this.name = data.name || '';
    this.products = data.products.map(item => new Product(item))
  }
}