import { CollectionService } from "./collection.service";
import { CollectableKinds, ObjectOnMap, ObjectType } from "./core"

export class Gate implements ObjectType {

    name: string;
    img: string;
    kind: CollectableKinds;
    amount: number;
    collectable: boolean = false;

    constructor (name: string, img: string, kind: CollectableKinds, amount: number = 1) {
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }

    interact(o: ObjectOnMap, cs: CollectionService) {
        if (cs.collects[this.kind] > this.amount) {
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
    "Yellow Key Gate",
    "yellow_key_gate.png",
    "yellowKeys"
)

export const BlueKeyGate = new Gate(
    "Blue Key Gate",
    "blue_key_gate.png",
    "blueKeys"
)

export const RedKeyGate = new Gate(
    "Red Key Gate",
    "red_key_gate.png",
    "redKeys"
)

export const XpGate1 = new Gate(
    "1 XP Gate",
    "xp_gate_1.png",
    "xp"
)

export const XpGate2 = new Gate(
    "2 XP Gate",
    "xp_gate_2.png",
    "xp",
    2
)

export const XpGate5 = new Gate(
    "5 XP Gate",
    "xp_gate_5.png",
    "xp",
    5
)

export const ALL_GATES = [YellowKeyGate, BlueKeyGate, RedKeyGate, XpGate1, XpGate2, XpGate5];


export class Hazard implements ObjectType {

    name: string;
    img: string;
    kind: CollectableKinds;
    amount: number;
    collectable: boolean = false;

    constructor(name: string, img: string, kind: CollectableKinds, amount: number = 1) {
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }

    interact(o: ObjectOnMap, cs: CollectionService) {
        if (cs.collects[this.kind] < this.amount) {
            cs.takeDamage(this.amount - cs.collects.str)
        }
        o.remove()
    }
}

//HAZARDS
export const Door15 = new Hazard(
    "Stuck Door",
    "door.png",
    "str",
    15
)

export const Pit15 = new Hazard(
    "Chasm",
    "chasm.png",
    "dex",
    15
)

export const Riddle15 = new Hazard(
    "Riddle",
    "riddle.png",
    "int",
    15
)

export const Spikes15 = new Hazard(
    "Spike Trap",
    "spikes.png",
    "vit",
    15
)

export const Magic15 = new Hazard(
    "Magic Circle",
    "magic_circle.png",
    "spi",
    15
)

export const ALL_HAZARDS = [Door15, Pit15, Riddle15, Spikes15, Magic15];