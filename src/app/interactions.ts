import { CollectionService } from "./collection.service";
import { ObjectOnMap } from "./core";

export function YellowKeyDoor(mo: ObjectOnMap, cs: CollectionService): void {
    if (cs.yellowKeys > 0) {
        alert("Opening door!");
        cs.yellowKeys--;
        mo.remove();
    } else {
        alert("Not enough yellow keys!");
    }
}