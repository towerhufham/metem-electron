import { CollectionService } from "./collection.service";
import { Spell } from "./spells";

export const DEBUG = true;

export const WORLD_SIZE = 15;

export interface TileType {
    name: string,
    img: string,
    wall: boolean,
    special?: string
}

export interface Tile {
    name: string;
    img: string;
    x: number;
    y: number;
    wall: boolean;
    special?: string;
}

export function makeTile(type: TileType, x: number, y: number): Tile {
    if (type.special) {
        return {name: type.name, img: type.img, wall: type.wall, special: type.special, x: x, y: y};
    } else {
        return {name: type.name, img: type.img, wall: type.wall, x: x, y: y};
    } 
}

export interface ObjectType {
    //a specific kind of object
    name: string;
    id: number;
    img: string;
    group: "pickup"|"spellCollect"|"gate"|"enemy"|"player";
    interact?: (o: ObjectOnMap, cs: CollectionService) => void;
}

export class Pickup implements ObjectType {
    
    //pickups increase a number in the collection
    id: number;
    name: string;
    img: string;
    kind: string;
    amount: number;
    group: "pickup" = "pickup";

    constructor(id: number, name: string, img: string, kind: string, amount: number = 1) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }
}

export class SpellCollect implements ObjectType {
    
    //pickups increase a number in the collection
    id: number;
    name: string;
    img: string;
    spell: Spell;
    group: "spellCollect" = "spellCollect";

    constructor(id: number, name: string, img: string, spell: Spell) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.spell = spell;
    }
}

export class Gate implements ObjectType {

    id: number;
    name: string;
    img: string;
    kind: string;
    amount: number;
    group: "gate" = "gate";

    constructor (id: number, name: string, img: string, kind: string, amount: number = 1) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }

    interact(o: ObjectOnMap, cs: CollectionService) {
        if (cs.get(this.kind) >= this.amount) {
            //if xp, don't detract it from player inventory
            if (this.kind !== "xp") {
                const total = cs.get(this.kind) - this.amount;
                cs.collects.set(this.kind, total);
            }
            o.remove();
        } else {
            alert(`Not enough ${this.kind}!`);
        }
    }
}

export class Enemy implements ObjectType {

    id: number;
    name: string;
    img: string;
    level: number;
    immunity?: string;
    group: "enemy" = "enemy";

    constructor(id:number, name: string, img: string, damage: number, immunity?: string) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.level = damage;
        this.immunity = immunity;
    }

    interact(o: ObjectOnMap, cs: CollectionService) {
        if (cs.get("atk") >= this.level) {
            //cs.takeDamage won't let you take negative damage btw
            const damage = this.level - cs.get("def");
            cs.takeDamage(damage);
            o.remove()
        }
    }
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

    takeDamage(element: string) {
        if (this.type.group !== "gate") {
            //check for immunity
            if (this.type.group === "enemy") {
                // @ts-ignore
                if (this.type.immunity != element) {
                    this.remove();
                }
            }
        }
    }
}

export interface ObjectSpawn {
    name: string,
    x: number,
    y: number
}

export interface MapData {
    name: string,
    tiles: string[],
    spawns: ObjectSpawn[]
}