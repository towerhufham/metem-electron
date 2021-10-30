import { Tile } from "./core";

export function makeTile(type: TileType, x: number, y: number): Tile {
    return {name: type.name, img: type.img, wall: type.wall, x: x, y: y};
}

export interface TileType {
    name: string,
    img: string,
    wall: boolean
}

export const IceFloor: TileType = {
    name: "Ice Floor",
    img: "ice_floor.png",
    wall: false
}

export const IceWall: TileType = {
    name: "Ice Wall",
    img: "ice_wall.png",
    wall: true
}