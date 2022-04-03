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

//STAIRS

export const DownStairs: TileType = {
    name: "Stairs Down",
    img: "down_stairs.png",
    wall: false,
}

export const UpStairs: TileType = {
    name: "Stairs Up",
    img: "up_stairs.png",
    wall: false,
}

//NORMAL TILES

export const RedFloor: TileType = {
    name: "Red Floor",
    img: "red_floor.png",
    wall: false
}

export const OrangeFloor: TileType = {
    name: "Orange Floor",
    img: "orange_floor.png",
    wall: false
}

export const YellowFloor: TileType = {
    name: "Yellow Floor",
    img: "yellow_floor.png",
    wall: false
}

export const GreenFloor: TileType = {
    name: "Green Floor",
    img: "green_floor.png",
    wall: false
}

export const BlueFloor: TileType = {
    name: "Blue Floor",
    img: "blue_floor.png",
    wall: false
}

export const PurpleFloor: TileType = {
    name: "Purple Floor",
    img: "purple_floor.png",
    wall: false
}

export const PinkFloor: TileType = {
    name: "Pink Floor",
    img: "pink_floor.png",
    wall: false
}

export const GreyWall: TileType = {
    name: "Grey Wall",
    img: "grey_wall.png",
    wall: true
}

export const PinkWall: TileType = {
    name: "Pink Wall",
    img: "pink_wall.png",
    wall: true
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
    // img: "ice-wall-hq3x.png",
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

// SPELL WALLS

export const BreakWall: TileType = {
    name: "Breakable Wall",
    img: "brown_wall.png",
    wall: true,
    weakness: "all",
}

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
    DownStairs,
    UpStairs,
    RedFloor,
    OrangeFloor,
    YellowFloor,
    GreenFloor,
    BlueFloor,
    PurpleFloor,
    PinkFloor,
    GreyWall,
    GrassFloor,
    DungeonWall,
    IceFloor,
    IceWall,
    DarkDungeonFloor,
    DarkDungeonWall,
    PinkWall,
    BreakWall,
    FireSpellWall,
    EarthSpellWall,
    WaterSpellWall,
    WindSpellWall,
    IceSpellWall,
    LightSpellWall
];