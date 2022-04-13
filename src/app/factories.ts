import { ALL_SPELLS } from "./spells";
import { ENEMY_DATA, KEY_DATA, PICKUP_DATA, TILE_DATA } from "./data";
import { Enemy, Gate, ObjectType, Pickup, SpellCollect, TileType } from "./core";

function itemsFactory(): Pickup[] {
    let items: Pickup[] = [];
    let i = 0;
    //keys
    for (const [name, kind] of KEY_DATA) {
        items.push(new Pickup(i, name, kind + ".png", kind));
        i++;
    }
    //pickups
    for (const [name, img, kind, amount] of PICKUP_DATA) {
        items.push(new Pickup(i, name, img, kind, amount));
        i++;
    }
    return items;
}
export const ALL_ITEMS = itemsFactory();


//this turns every spell in ALL_SPELLS into collects
let spellCollects: SpellCollect[] = [];
ALL_SPELLS.forEach((spell, index) => {
        spellCollects.push(new SpellCollect(
            index,
            spell.name,
            spell.img,
            spell
        ))
    }
);
export const ALL_SPELLCOLLECTS: SpellCollect[] = spellCollects;


function gateFactory(): Gate[] {
    let gates: Gate[] = [];
    let i = 0;
    for (const [name, kind] of KEY_DATA) {
        gates.push(new Gate(i, name + " Gate", kind + "_gate.png", kind));
        i++;
    }
    return gates;
}
export const ALL_GATES = gateFactory();


function enemyFactory(): Enemy[] {
    let enemies: Enemy[] = [];
    let i = 0;
    for (const [name, img, level, immunity] of ENEMY_DATA) {
        enemies.push(new Enemy(i, `${name} (Lvl. ${level})`, img, level, immunity));
        i++;
    }
    return enemies;
}
export const ALL_ENEMIES = enemyFactory();


function tileFactory(): TileType[] {
    let tiles: TileType[] = [];
    for (const [name, img, wall, special] of TILE_DATA) {
        tiles.push({name: name, img: img, wall: wall, special: special})
    }
    return tiles;
}
export const ALL_TILES = tileFactory();


//for map loading
export function getEntity(name: string): ObjectType {
    const ALL = [...ALL_ITEMS, ...ALL_SPELLCOLLECTS, ...ALL_GATES, ...ALL_ENEMIES];
    for (const o of ALL) {
        if (o.name === name) {
            return o;
        }
    }
    //fallback
    return ALL_SPELLCOLLECTS[0];
}