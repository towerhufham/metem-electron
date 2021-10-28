export const WORLD_SIZE = 15;

export interface Tile {
    name: string;
    img: string;
    x: number;
    y: number;
    wall: boolean;
}

export interface ObjectType {
    //a specific kind of object
    name: string;
    img: string;
    collectable: boolean;
}

export class ObjectOnMap {
    //something on the map, over a tile
    type: ObjectType;
    collectable: boolean;
    x: number;
    y: number;

    constructor(type: ObjectType, x: number, y:number , collectable: boolean = false) {
        this.type = type;
        this.collectable = collectable;
        this.x = x;
        this.y = y;
    }

    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

}