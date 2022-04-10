import { ALL_SPELLS } from "./spells";
import { ENEMY_DATA, KEY_DATA, PICKUP_DATA } from "./data";
import { Enemy, Gate, Pickup, SpellCollect } from "./core";

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
        gates.push(new Gate(i, name, kind + "_gate.png", kind));
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