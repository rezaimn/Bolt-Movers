export class Customer {


  public id: number;


  public firstname: string;


  public middlename: string;


  public lastname: string;


  public phone: string;


  public email: string;

  public second_email: string;

  public address: string;


  public customertype: string;



  /**
   *
   */
  constructor(data) {
    this.id = data.id || 0;
    this.customertype = data.customertype || '';
    this.email = data.email || '';
    this.second_email = data.second_email || '';
    this.firstname = data.firstname || '';
    this.lastname = data.lastname || '';
    this.middlename = data.middlename || '';
    this.phone = data.phone || '';
    this.address = data.address || '';
  }

}
