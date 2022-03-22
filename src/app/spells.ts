import { ObjectOnMap } from "./core";
import { WorldViewerComponent } from "./world-viewer/world-viewer.component";
import { YellowKey } from "./collectables";

export class Spell {
    id: number;
    name: string;
    img: string;
    targeted: boolean;
    effect: (wc: WorldViewerComponent, x: number, y:number) => void;

    constructor(id: number, name: string, img: string, targeted: boolean, effect: (world: WorldViewerComponent, x: number, y:number) => void) {
        this.id = id;
        this.name = name;
        this.img = img;
        this.targeted = targeted;
        this.effect = effect;
    }
}

export const CrossWinds = new Spell (
    0,
    "CrossWinds",
    "xp_bubble",
    false,
    function(world: WorldViewerComponent, x: number, y: number) {
        //test
        world.makeObjectOnMap(YellowKey, x, y);
    }
)


export const ALL_SPELLS = [CrossWinds];