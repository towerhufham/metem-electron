import { CollectionService } from "./collection.service";
import { ObjectOnMap, ObjectType } from "./core"

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

export const PurpleKeyGate = new Gate(
    3,
    "Purple Key Gate",
    "purple_key_gate.png",
    "purpleKeys"
)

export const ForestKeyGate = new Gate(
    4,
    "Forest Key Gate",
    "forest_key_gate.png",
    "forestKeys"
)

export const FireKeyGate = new Gate(
    5,
    "Fire Key Gate",
    "fire_key_gate.png",
    "fireKeys"
)

export const WaterKeyGate = new Gate(
    6,
    "Water Key Gate",
    "water_key_gate.png",
    "waterKeys"
)

export const XpGate25 = new Gate(
    7,
    "25 XP Gate",
    "xp_gate_25.png",
    "xp",
    25
)

export const XpGate50 = new Gate(
    8,
    "50 XP Gate",
    "xp_gate_50.png",
    "xp",
    50
)

export const XpGate75 = new Gate(
    9,
    "75 XP Gate",
    "xp_gate_75.png",
    "xp",
    75
)

export const ALL_GATES = [YellowKeyGate, BlueKeyGate, RedKeyGate, PurpleKeyGate, ForestKeyGate, FireKeyGate, WaterKeyGate, XpGate25, XpGate50, XpGate75];


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

export const Slime = new Enemy (
    0,
    "Slime",
    "monster-test.gif",
    5
)

export const Wisp = new Enemy (
    1,
    "Wisp",
    "wisp.gif",
    15,
    "fire"
)

export const RockElemental = new Enemy (
    2,
    "Rock Elemental",
    "rock_elemental.gif",
    25,
    "earth"
)

export const Crab = new Enemy (
    3,
    "Crab",
    "crab.gif",
    15,
    "water"
)

export const Bat = new Enemy (
    4,
    "Bat",
    "bat.gif",
    15,
    "wind"
)

export const IceSlug = new Enemy (
    5,
    "Ice Slug",
    "ice_slug.gif",
    15,
    "ice"
)

export const Machine = new Enemy (
    6,
    "Machine",
    "machine.gif",
    15,
    "light"
)

export const ALL_ENEMIES = [Slime, Wisp, RockElemental, Crab, Bat, IceSlug, Machine];