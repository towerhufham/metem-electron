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

export interface ObjectOnMap {
    //something on the map, over a tile
    type: ObjectType;
    x: number;
    y: number; 
}

// export interface Player {
//     hp: number;
//     mp: number;

//     str: number;
//     dex: number;
//     con: number;
//     int: number;
//     wis: number;
//     cha: number;
// }
