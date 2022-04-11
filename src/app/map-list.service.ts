import { Injectable } from '@angular/core';

const clamp = (min: number, num: number, max: number) => Math.min(Math.max(num, min), max);

@Injectable({
  providedIn: 'root'
})
export class MapListService {

  //materialMaps: string[] = ["tut1", "tut2", "tut3", "tut4"];
  materialMaps: string[] = ["sandbox"];
  materialFloor: number = 0;
  //astralMaps: string[] = ["tuta"];
  astralMaps: string[] = ["sandboxa"];
  astralFloor: number = 0;

  constructor() { }

  moveFloor(isAstral: boolean, up: boolean) {
    if (isAstral) {
      up ? this.astralFloor++ : this.astralFloor--;
      this.astralFloor = clamp(0, this.astralFloor, this.astralMaps.length-1);
      return this.astralMaps[this.astralFloor];
    } else {
      up ? this.materialFloor++ : this.materialFloor--;
      this.materialFloor = clamp(0, this.materialFloor, this.materialMaps.length-1);
      return this.materialMaps[this.materialFloor];
    }
  }
}
