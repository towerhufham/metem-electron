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
    "yellow_keys"
)

export const BlueKeyGate = new Gate(
    1,
    "Blue Key Gate",
    "blue_key_gate.png",
    "blue_keys"
)

export const RedKeyGate = new Gate(
    2,
    "Red Key Gate",
    "red_key_gate.png",
    "red_keys"
)

export const PurpleKeyGate = new Gate(
    3,
    "Purple Key Gate",
    "purple_key_gate.png",
    "purple_keys"
)

export const ForestKeyGate = new Gate(
    4,
    "Forest Key Gate",
    "forest_key_gate.png",
    "forest_keys"
)

export const FireKeyGate = new Gate(
    5,
    "Fire Key Gate",
    "fire_key_gate.png",
    "fire_keys"
)

export const WaterKeyGate = new Gate(
    6,
    "Water Key Gate",
    "water_key_gate.png",
    "water_keys"
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
    "Slime (Lv.5)",
    "monster-test.gif",
    5
)

export const Wisp = new Enemy (
    1,
    "Wisp (Lv.15)",
    "wisp.gif",
    15,
    "fire"
)

export const RockElemental = new Enemy (
    2,
    "Rock Elemental (Lv. 25)",
    "rock_elemental.gif",
    25,
    "earth"
)

export const Crab = new Enemy (
    3,
    "Crab (Lv.15)",
    "crab.gif",
    15,
    "water"
)

export const Bat = new Enemy (
    4,
    "Bat (lv. 25)",
    "bat.gif",
    25,
    "wind"
)

export const IceSlug = new Enemy (
    5,
    "Ice Slug (Lv.35)",
    "ice_slug.gif",
    35,
    "ice"
)

export const Machine = new Enemy (
    6,
    "Machine (Lv.50)",
    "machine.gif",
    50,
    "light"
)

export const ALL_ENEMIES = [Slime, Wisp, RockElemental, Crab, Bat, IceSlug, Machine];