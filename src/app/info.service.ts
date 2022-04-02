import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  name?: string = "Hover over";
  img?: string;
  description?: string = "something to see its description";
  
  constructor() { }

  setInfo(name?: string, img?: string, description?: string) {
    this.name = name;
    this.img = img;
    this.description = description;
  }
}
