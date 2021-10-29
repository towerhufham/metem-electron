import { CollectionService } from "./collection.service";
import { ObjectOnMap } from "./core";

export function interact(o: ObjectOnMap, cs: CollectionService) {
    const interaction = o.type.interaction;
    if (interaction === "Yellow Key Door") {
        YellowKeyDoor(o, cs);
    }
}

function YellowKeyDoor(o: ObjectOnMap, cs: CollectionService): void {
    if (cs.yellowKeys > 0) {
        alert("Opening door!");
        cs.yellowKeys--;
        o.remove();
    } else {
        alert("Not enough yellow keys!");
    }
}