import { ObjectType } from "./core";
import { CollectableKinds } from "./core";

export class Collectable implements ObjectType {
    
    id: number;
    name: string;
    img: string;
    kind: CollectableKinds;
    amount: number;
    group: "collectable" = "collectable";

    constructor(id: number, name: string, img: string, kind: CollectableKinds, amount: number = 1) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.kind = kind;
        this.amount = amount;
    }
}

//keys
export const YellowKey = new Collectable (
    0,
    "Yellow Key",
    "yellow_key.png",
    "yellowKeys"
)

export const BlueKey = new Collectable(
    1,
    "Blue Key",
    "blue_key.png",
    "blueKeys"
)

export const RedKey = new Collectable(
    2,
    "Red Key",
    "red_key.png",
    "redKeys"
)

//points
export const xpPickup = new Collectable (
    3,
    "XP +1",
    "xp_bubble_small.png",
    "xp"
)

export const hpPickup = new Collectable(
    4,
    "HP +25",
    "hp_pickup.png",
    "hp",
    25
)

//basic pickups
export const strPickup = new Collectable(
    5,
    "STR +1",
    "str.png",
    "str"
)
export const dexPickup = new Collectable(
    6,
    "DEX +1",
    "dex.png",
    "dex"
)
export const intPickup = new Collectable(
    7,
    "INT +1",
    "int.png",
    "int"
)
export const vitPickup = new Collectable(
    8,
    "VIT +1",
    "vit.png",
    "vit"
)
export const spiPickup = new Collectable(
    9,
    "SPI +1",
    "spi.png",
    "spi"
)

//multiplier pickups
export const Quartz = new Collectable(
    10,
    "Quartz",
    "quartz.png",
    "hp_mult"
)
export const Ruby = new Collectable(
    11,
    "Ruby",
    "ruby.png",
    "str_mult"
)
export const Emerald = new Collectable(
    12,
    "Emerald",
    "emerald.png",
    "dex_mult"
)
export const Diamond = new Collectable(
    13,
    "Diamond",
    "diamond.png",
    "int_mult"
)
export const Topaz = new Collectable(
    14,
    "Topaz",
    "topaz.png",
    "vit_mult"
)
export const Amethyst = new Collectable(
    15,
    "Amethyst",
    "amethyst.png",
    "spi_mult"
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
    spiPickup,
    Quartz,
    Ruby,
    Emerald,
    Diamond,
    Topaz,
    Amethyst
]