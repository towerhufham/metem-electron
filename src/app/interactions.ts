import { CollectionService } from "./collection.service";
import { ObjectOnMap } from "./core";

export function interact(o: ObjectOnMap, cs: CollectionService) {
    const interaction = o.type.interaction;
    if (interaction) {
        if (interaction in ALL_INTERACTIONS) {
            ALL_INTERACTIONS[interaction](o, cs);
        } else {
            alert("Unknown interaction: " + interaction)
        }
    }
}

const ALL_INTERACTIONS: { [key: string]: (o:ObjectOnMap, cs:CollectionService) => void} = {
    YellowKeyDoor(o: ObjectOnMap, cs: CollectionService) {
        if (cs.yellowKeys > 0) {
            alert("Opening door!");
            cs.yellowKeys--;
            o.remove();
        } else {
            alert("Not enough yellow keys!");
        }
    }
}