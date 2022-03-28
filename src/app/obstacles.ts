import { CollectionService } from "./collection.service";
import { CollectableKinds, ObjectOnMap, ObjectType, Side } from "./core"

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

    interact(side: Side, o: ObjectOnMap, cs: CollectionService) {
        if (cs.getPickups(side, this.kind) >= this.amount) {
            //if xp, don't remove it
            if (this.kind !== "xp") {
                cs.collects[side].pickups[this.kind] -= this.amount;
            }
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

export const XpGate25 = new Gate(
    3,
    "25 XP Gate",
    "xp_gate_25.png",
    "xp",
    25
)

export const XpGate50 = new Gate(
    4,
    "50 XP Gate",
    "xp_gate_50.png",
    "xp",
    50
)

export const XpGate75 = new Gate(
    5,
    "75 XP Gate",
    "xp_gate_75.png",
    "xp",
    75
)

export const ALL_GATES = [YellowKeyGate, BlueKeyGate, RedKeyGate, XpGate25, XpGate50, XpGate75];


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

    interact(side: Side, o: ObjectOnMap, cs: CollectionService) {
        cs.takeDamage(side, this.damage);
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