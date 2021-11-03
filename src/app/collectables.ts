import { ObjectType } from "./core";

export type CollectableKinds = "yellowKeys" | "blueKeys" | "redKeys" |
    "str" | "dex" | "int" | "vit" | "spi" |
    "hp" | "xp";

export class Collectable implements ObjectType {
    
    name: string;
    img: string;
    kind: CollectableKinds;
    amount: number;
    collectable: boolean = true;
    interaction: string = "Collect";

    constructor(name: string, img: string, kind: CollectableKinds, amount: number = 1) {
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }
}

//keys
export const YellowKey = new Collectable (
    "Yellow Key",
    "yellow_key.png",
    "yellowKeys"
)

export const BlueKey = new Collectable(
    "Blue Key",
    "blue_key.png",
    "blueKeys"
)

export const RedKey = new Collectable(
    "Red Key",
    "red_key.png",
    "redKeys"
)

//points
export const xpPickup = new Collectable (
    "XP +1",
    "xp_bubble_small.png",
    "xp"
)

export const hpPickup = new Collectable(
    "HP +1",
    "hp_pickup.png",
    "hp"
)

//basic pickups
export const strPickup = new Collectable(
    "STR +1",
    "str.png",
    "str"
)
export const dexPickup = new Collectable(
    "DEX +1",
    "dex.png",
    "dex"
)
export const intPickup = new Collectable(
    "INT +1",
    "int.png",
    "int"
)
export const vitPickup = new Collectable(
    "VIT +1",
    "vit.png",
    "vit"
)
export const spiPickup = new Collectable(
    "SPI +1",
    "spi.png",
    "spi"
)


export const ALL_COLLECTABLES: Collectable[] = [
    YellowKey,
    BlueKey,
    RedKey,
    xpPickup,
    hpPickup,
    strPickup,
    dexPickup,
    intPickup,
    vitPickup,
    spiPickup
];