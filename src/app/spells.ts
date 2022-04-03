import { Tile, WORLD_SIZE } from "./core";
import { WorldViewerComponent } from "./world-viewer/world-viewer.component";

export class Spell {
    id: number;
    name: string;
    img: string;
    targeted: boolean;
    effect: (wc: WorldViewerComponent, x: number, y:number) => void;
    aoe?: number[][];
    includeAnchor?: boolean; //can exclude the anchor tile in the actual aoe, like for Ripple. TODO: make the hover style not apply if this is false

    constructor(id: number, name: string, img: string, targeted: boolean, effect: (world: WorldViewerComponent, x: number, y:number) => void, aoe?: number[][], includeAnchor: boolean = true) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.targeted = targeted;
        this.effect = effect;
        this.aoe = aoe;
        this.includeAnchor = includeAnchor;
    }
}

function shuffle(array: any[]) {
    //https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    let currentIndex = array.length,  randomIndex;
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

function defaultSpellBehavior(world: WorldViewerComponent, element: string) {
    for (const o of world.targetedObjects) {
        o.takeDamage(element);
    }
    for (const t of world.targetedTiles) {
        if (t.weakness === element || t.weakness === "all") {
            t.wall = false;
            t.img = "pink_floor.png";
            t.name = "Cleared Wall";
        }
    }
}

export const Fireball = new Spell (
    0,
    "Fireball",
    "fire.png",
    true,
    function(world: WorldViewerComponent, x: number, y: number) {
        defaultSpellBehavior(world, "fire");
    },
    [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
)

export const Crumble = new Spell (
    1,
    "Crumble",
    "rock.png",
    true,
    function(world: WorldViewerComponent, x: number, y: number) {
        defaultSpellBehavior(world, "earth");
    },
)

export const Ripple = new Spell (
    2,
    "Ripple",
    "water.png",
    true,
    function(world: WorldViewerComponent, x: number, y: number) {
        defaultSpellBehavior(world, "water");
    },
    [[-2, -2], [-1, -2], [0, -2], [1, -2], [2, -2], [-2, -1], [2, -1], [-2, 0], [2, 0], [-2, 1], [2, 1], [-2, 2], [-1, 2], [0, 2], [1, 2], [2, 2]],
    false,
)

function crossWindsAoe() {
    //like a rook move
    let aoe = [];
    for (let i = 0; i < WORLD_SIZE; i++) {
        aoe.push([i, 0]);
        aoe.push([-i, 0]);
        aoe.push([0, i]);
        aoe.push([0, -i]);
    }
    return aoe;
}

export const Crosswinds = new Spell (
    3,
    "Crosswinds",
    "wind.png",
    false,
    function(world: WorldViewerComponent, x: number, y: number) {
        defaultSpellBehavior(world, "wind");
    },
    crossWindsAoe()
)

export const Freeze = new Spell (
    4,
    "Freeze",
    "ice.png",
    false,
    function(world: WorldViewerComponent, x: number, y: number) {
        defaultSpellBehavior(world, "ice");
    },
    [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1], [0, -2], [0, 2], [2, 0], [-2, 0]]
)

export const LightningStorm = new Spell (
    5,
    "Lightning Storm",
    "light.png",
    false,
    function(world: WorldViewerComponent, x: number, y: number) {
        let potentialTargets = world.mapObjects.filter(o => o.type.group === "enemy" && o.active);
        potentialTargets = shuffle(potentialTargets);
        //gurantee at least one hit, if there is one
        potentialTargets.pop()?.takeDamage("light");
        //all other enemies have a 35% chance of getting hit
        for (const target of potentialTargets) {
            if (Math.random() <= 0.35) {
                target.takeDamage("light");
            }
        }
    },
)

export const ALL_SPELLS = [Fireball, Crumble, Ripple, Crosswinds, Freeze, LightningStorm];