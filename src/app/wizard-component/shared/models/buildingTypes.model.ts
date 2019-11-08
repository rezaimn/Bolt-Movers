export class BuildingType {
  id: number;
  name: String;
  // floors: String[];

  constructor(data) {
    this.id = data.id || 0;
    this.name = data.name || '';
    // this.floors = data.floors || [
    //   'Ground',
    //   'First Floor',
    //   'Second Floor'
    // ]
  }
}