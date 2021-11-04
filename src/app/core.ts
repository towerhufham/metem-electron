import { CollectionService } from "./collection.service";

export const WORLD_SIZE = 15;

export type CollectableKinds = "yellowKeys" | "blueKeys" | "redKeys" |
    "str" | "dex" | "int" | "vit" | "spi" |
    "str_mult" | "dex_mult" | "int_mult" | "vit_mult" | "spi_mult" | "hp_mult" |
    "hp" | "xp";

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
    interact?: (o: ObjectOnMap, cs: CollectionService) => void;
}

export class ObjectOnMap {
    //something on the map, over a tile
    type: ObjectType;
    x: number;
    y: number;
    active: boolean;

    constructor(type: ObjectType, x: number, y:number) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.active = true;
    }

    moveTo(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    remove() {
        this.active = false;
    }
}

export interface ObjectSpawn {
    type: ObjectType,
    x: number,
    y: number
}

export interface MapData {
    name: string,
    tiles: Tile[],
    spawns: ObjectSpawn[]
}