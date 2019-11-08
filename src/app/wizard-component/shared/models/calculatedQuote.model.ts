export class calculatedQuoteModel {
  id: number;
  status: string;
  COST: number;
  CTC: number;
  name: string;
  preparedBy: string;
  moving_date: string;
  customerName: string;
  phoneNumber: string;
  email: string;
  movingFrom: string;
  movingTo: string;
  movingDate: string;
  estimatePrice: string;
  numberOfMen: number;
  numberOfTrucks: number;
  movingDistance: string;
  totalVolume: string;
  TotalWeight: string;
  garageEntrance: boolean;
  frontdoorEntrance: boolean;
  storageMoving: boolean;
  settingUp: boolean;
  urgentMoving: boolean;
  clusteredFurniture: boolean;
  loadingOnly: boolean;
  unloadingOnly: boolean;
  storageSizes = [];
  categoryList: category[];
  CTC_INFO: any;
  MPG: number;
  COST_INFO: any;
  more_details: string;
  dispatchData: any;
  rooms: any[];
  constructor(data, updatedAt) {
    this.id = data.id || 0;
    this.status = data.status || '';
    this.COST = data.COST.toFixed(2) || 0;
    this.CTC = data.CTC.toFixed(2) || 0;
    this.name = data.name || '';
    this.preparedBy = localStorage.getItem('userName');
    this.moving_date = data.moving_date || '';
    this.customerName = data.user.firstname + ' ' + data.user.lastname;
    this.phoneNumber = data.user.phone;
    this.email = data.user.email;
    this.movingFrom = data.from_address.address;
    this.movingTo = data.to_address.address;
    this.movingDate = data.moving_date;
    this.estimatePrice = (+data.PV.LLC).toFixed(2) + ' ~ ' + (+data.PV.ULC).toFixed(2);
    this.numberOfMen = data.labor;
    this.numberOfTrucks = data.NTR.roundup;
    this.movingDistance = (+data.CTC_INFO.distance.mile).toFixed(2);
    this.totalVolume = data.TV;
    this.TotalWeight = data.TW;
    this.garageEntrance = data.extra.garage_entrance;
    this.garageEntrance = data.extra.garage_entrance;
    this.garageEntrance = data.extra.garage_entrance;
    this.garageEntrance = data.extra.garage_entrance;
    this.garageEntrance = data.extra.garage_entrance;
    this.frontdoorEntrance = false;
    this.storageMoving = false;
    this.settingUp = data.extra.setting_up;
    this.urgentMoving = false;
    this.clusteredFurniture = data.extra.clustered_furniture;
    this.loadingOnly = data.extra.loading_only;
    this.unloadingOnly = data.extra.unloading_only;
    this.more_details = data.more_details || '';
    this.dispatchData = data.dispatchData;
    this.rooms = data.rooms || [];
    this.categoryList = data.categoryList || [];
    this.storageSizes = [
      {
        name: '5*10', num: 0
      },
      {
        name: '5*15', num: 0
      },
      {
        name: '10*10', num: 0
      },
      {
        name: '10*15', num: 0
      },
      {
        name: '10*20', num: 0
      }
    ];
    this.MPG = data.truck_info.MPG;
    this.COST_INFO = data.COST_INFO;
    this.calculateStorages(data.rooms);

    this.addCategories(data.rooms);

  }

  calculateStorages(rooms) {
    rooms.map(room => {
      room.products.map(product => {
        if (product.product.attributes.width <= 5 && product.product.attributes.height <= 10) {
          this.storageSizes[0].num++;
        } else if (product.product.attributes.width <= 5 && product.product.attributes.height <= 15) {
          this.storageSizes[1].num++;
        } else if (product.product.attributes.width <= 10 && product.product.attributes.height <= 10) {
          this.storageSizes[2].num++;
        } else if (product.product.attributes.width <= 10 && product.product.attributes.height <= 15) {
          this.storageSizes[3].num++;
        } else if (product.product.attributes.width <= 10 && product.product.attributes.height <= 20) {
          this.storageSizes[4].num++;
        }
      });
    });
  }

  addCategories(rooms) {
    rooms.forEach(room => {
      for (let product of room.products) {
        let productItem = {
          item: product.product.name,
          boxing: product.boxing,
          loadingFloor: room.loading_floor,
          unloadingFloor: room.unloading_floor,
          answers: product.answers || []
        }
        let catIndex = -1;
        this.categoryList.forEach((cat, index) => {
          if (cat.id === product.product.category_id) {
            catIndex = index;
          }
        });
        if (catIndex > -1) {
          this.categoryList[catIndex].products.push(productItem);
        } else {
          let category = {...product.product.category};
          category.products = [];

          category.products.push(productItem);
          this.categoryList.push(category);
        }
      }
    })
  }

}

export class category {
  id: number;
  name: string;
  products: any[];

  constructor(data: any = {}) {
    this.id = data.id || 0;
    this.name = data.name || 0;
    this.products = data.products || 0;
  }
}
