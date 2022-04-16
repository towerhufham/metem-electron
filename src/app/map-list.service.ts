import { Injectable } from '@angular/core';

const clamp = (min: number, num: number, max: number) => Math.min(Math.max(num, min), max);

@Injectable({
  providedIn: 'root'
})
export class MapListService {

  materialMaps: string[] = ["tut1", "tut2", "tut3", "tut4"];
  materialFloor: number = 0;
  astralMaps: string[] = ["tuta"];
  astralFloor: number = 0;

  constructor() { }

  moveFloor(isAstral: boolean, steps: number) {
    if (isAstral) {
      this.astralFloor += steps
      this.astralFloor = clamp(0, this.astralFloor, this.astralMaps.length-1);
      return this.astralMaps[this.astralFloor];
    } else {
      this.materialFloor += steps
      this.materialFloor = clamp(0, this.materialFloor, this.materialMaps.length-1);
      return this.materialMaps[this.materialFloor];
    }
  }
}
