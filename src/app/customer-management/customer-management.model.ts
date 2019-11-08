export class CustomerManagementModel {
  id:number;
  name:string;
  category_id:number;
  photo:string= undefined;
  attributes:Attributes;
  constructor(data:any={}){
    this.id=data.id;
    this.name=data.name||'';
    this.category_id=data.category_id||0;
    this.photo=data.photo||undefined;
    this.attributes=data.attributes||new Attributes({});

  }
}
export class Attributes {
  width:number;
  height:number;
  depth:number;
  time:number;
  weight:number;
  constructor(data:any={}){
    this.width=data.width;
    this.height=data.height;
    this.depth=data.depth;
    this.time=data.time;
    this.weight=data.weight;
  }
}
