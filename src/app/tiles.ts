import { Tile } from "./core";

export function makeTile(type: TileType, x: number, y: number): Tile {
    if (type.weakness) {
        return {name: type.name, img: type.img, wall: type.wall, weakness: type.weakness, x: x, y: y};
    } else {
        return {name: type.name, img: type.img, wall: type.wall, x: x, y: y};
    } 
}

export interface TileType {
    name: string,
    img: string,
    wall: boolean,
    weakness?: string
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

export const PinkFloor: TileType = {
    name: "Pink Floor",
    img: "pink_floor.png",
    wall: false
}

export const PinkWall: TileType = {
    name: "Pink Wall",
    img: "pink_wall.png",
    wall: true
}

// SPELL WALLS

export const FireSpellWall: TileType = {
    name: "Fire Spell Wall",
    img: "fire_spell_wall.png",
    wall: true,
    weakness: "fire"
}

export const EarthSpellWall: TileType = {
    name: "Earth Spell Wall",
    img: "earth_spell_wall.png",
    wall: true,
    weakness: "earth"
}

export const WaterSpellWall: TileType = {
    name: "Water Spell Wall",
    img: "water_spell_wall.png",
    wall: true,
    weakness: "water"
}

export const WindSpellWall: TileType = {
    name: "Wind Spell Wall",
    img: "wind_spell_wall.png",
    wall: true,
    weakness: "wind"
}

export const IceSpellWall: TileType = {
    name: "Ice Spell Wall",
    img: "ice_spell_wall.png",
    wall: true,
    weakness: "ice"
}

export const LightSpellWall: TileType = {
    name: "Light Spell Wall",
    img: "light_spell_wall.png",
    wall: true,
    weakness: "light"
}

export const ALL_TILES: TileType[] = [
    GrassFloor,
    DungeonWall,
    IceFloor,
    IceWall,
    DarkDungeonFloor,
    DarkDungeonWall,
    PinkFloor,
    PinkWall,
    FireSpellWall,
    EarthSpellWall,
    WaterSpellWall,
    WindSpellWall,
    IceSpellWall,
    LightSpellWall
];