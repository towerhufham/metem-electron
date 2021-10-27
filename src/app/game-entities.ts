export interface Tile {
    name: string;
    img: string;
    x: number;
    y: number;
}

export interface MapObject {
    //something on the map, over a tile
    name: string;
    img: string;
    x: number;
    y: number;
}

export interface Player {
    hp: number;
    mp: number;

    str: number;
    dex: number;
    con: number;
    int: number;
    wis: number;
    cha: number;
}
