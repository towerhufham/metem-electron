import { CollectionService } from "./collection.service";
import { CollectableKinds, ObjectOnMap, ObjectType } from "./core"

export class Gate implements ObjectType {

    id: number;
    name: string;
    img: string;
    kind: CollectableKinds;
    amount: number;
    group: "gate" = "gate";

    constructor (id: number, name: string, img: string, kind: CollectableKinds, amount: number = 1) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }

    interact(o: ObjectOnMap, cs: CollectionService) {
        if (cs.collects[this.kind] >= this.amount) {
            alert("Opening gate!");
            cs.collects[this.kind] -= this.amount;
            o.remove();
        } else {
            alert(`Not enough ${this.kind}!`);
        }
    }
}

//GATES
export const YellowKeyGate = new Gate(
    0,
    "Yellow Key Gate",
    "yellow_key_gate.png",
    "yellowKeys"
)

export const BlueKeyGate = new Gate(
    1,
    "Blue Key Gate",
    "blue_key_gate.png",
    "blueKeys"
)

export const RedKeyGate = new Gate(
    2,
    "Red Key Gate",
    "red_key_gate.png",
    "redKeys"
)

export const XpGate1 = new Gate(
    3,
    "1 XP Gate",
    "xp_gate_1.png",
    "xp"
)

export const XpGate2 = new Gate(
    4,
    "2 XP Gate",
    "xp_gate_2.png",
    "xp",
    2
)

export const XpGate5 = new Gate(
    5,
    "5 XP Gate",
    "xp_gate_5.png",
    "xp",
    5
)

export const ALL_GATES = [YellowKeyGate, BlueKeyGate, RedKeyGate, XpGate1, XpGate2, XpGate5];


export class Enemy implements ObjectType {

    id: number;
    name: string;
    img: string;
    damage: number;
    immunity?: string;
    group: "enemy" = "enemy";

    constructor(id:number, name: string, img: string, damage: number, immunity?: string) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.damage = damage;
        this.immunity = immunity;
    }

    interact(o: ObjectOnMap, cs: CollectionService) {
        cs.takeDamage(this.damage);
        o.remove()
    }
}

export const Slime = new Enemy (
    0,
    "Slime",
    "monster-test.gif",
    15
)

export const Wisp = new Enemy (
    0,
    "Wisp",
    "wisp.gif",
    15,
    "fire"
)

export const RockElemental = new Enemy (
    0,
    "Rock Elemental",
    "rock_elemental.gif",
    15,
    "earth"
)

export const Crab = new Enemy (
    0,
    "Crab",
    "crab.gif",
    15,
    "water"
)

export const Bat = new Enemy (
    0,
    "Bat",
    "bat.gif",
    15,
    "wind"
)

export const IceSlug = new Enemy (
    0,
    "Ice Slug",
    "ice_slug.gif",
    15,
    "ice"
)

export const Machine = new Enemy (
    0,
    "Machine",
    "machine.gif",
    15,
    "light"
)

export const ALL_ENEMIES = [Slime, Wisp, RockElemental, Crab, Bat, IceSlug, Machine];