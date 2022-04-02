import { ObjectType } from "./core";
import { CollectableKinds } from "./core";
import { ALL_SPELLS, Spell } from "./spells";

export class Pickup implements ObjectType {
    
    //pickups increase a number in the collection
    id: number;
    name: string;
    img: string;
    kind: CollectableKinds;
    amount: number;
    group: "pickup" = "pickup";

    constructor(id: number, name: string, img: string, kind: CollectableKinds, amount: number = 1) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }
}

//keys
export const YellowKey = new Pickup (
    0,
    "Yellow Key",
    "yellow_key.png",
    "yellowKeys"
)

export const BlueKey = new Pickup(
    1,
    "Blue Key",
    "blue_key.png",
    "blueKeys"
)

export const RedKey = new Pickup(
    2,
    "Red Key",
    "red_key.png",
    "redKeys"
)

//points
export const xpPickup = new Pickup (
    3,
    "XP +1",
    "xp_bubble_small.png",
    "xp"
)

export const hpPickup = new Pickup(
    4,
    "HP +25",
    "hp_pickup.png",
    "hp",
    25
)

export const atkPickup = new Pickup (
    5,
    "ATK +1",
    "atk_bubble_small.png",
    "atk"
)

export const defPickup = new Pickup (
    6,
    "DEF +1",
    "def_bubble_small.png",
    "def"
)

export const ALL_PICKUPS: Pickup[] = [
    YellowKey,
    BlueKey,
    RedKey,
    xpPickup,
    hpPickup,
    atkPickup,
    defPickup
]



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