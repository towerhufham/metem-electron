import { ObjectOnMap } from "./core";
import { WorldViewerComponent } from "./world-viewer/world-viewer.component";
import { YellowKey } from "./collectables";

export class Spell {
    id: number;
    name: string;
    img: string;
    targeted: boolean;
    effect: (wc: WorldViewerComponent, x: number, y:number) => void;
    aoe?: number[][];

    constructor(id: number, name: string, img: string, targeted: boolean, effect: (world: WorldViewerComponent, x: number, y:number) => void, aoe?: number[][]) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.targeted = targeted;
        this.effect = effect;
        this.aoe = aoe;
    }
}

export const Fireball = new Spell (
    0,
    "Fireball",
    "xp_bubble",
    true,
    function(world: WorldViewerComponent, x: number, y: number) {
        //test
        for (const t of world.targetedTiles) {
            world.makeObjectOnMap(YellowKey, t.x, t.y);
        }
    },
    [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]]
)

export const ALL_SPELLS = [Fireball];