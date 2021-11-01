import { Tile } from "./core";

export function makeTile(type: TileType, x: number, y: number): Tile {
    return {name: type.name, img: type.img, wall: type.wall, x: x, y: y};
}

export interface TileType {
    name: string,
    img: string,
    wall: boolean
}

export const GrassFloor: TileType = {
    name: "Grass Floor",
    img: "grass_floor.png",
    wall: false
}

export const DungeonWall: TileType = {
    name: "Dungeon Wall",
    img: "dungeon_wall.png",
    wall: true
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

export const DarkDungeonFloor: TileType = {
    name: "Dark Dungeon Floor",
    img: "dark_dungeon_floor.png",
    wall: false
}

export const DarkDungeonWall: TileType = {
    name: "Dark Dungeon Wall",
    img: "dark_dungeon_wall.png",
    wall: true
}



export const ALL_TILES: TileType[] = [
    GrassFloor,
    DungeonWall,
    IceFloor,
    IceWall,
    DarkDungeonFloor,
    DarkDungeonWall
];