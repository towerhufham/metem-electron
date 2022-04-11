//display name, code name + image name
export const KEY_DATA: [string, string][] = [
    ["Red Key", "red_key"],
    ["Blue Key", "blue_key"],
    ["Yellow Key", "yellow_key"],
    ["Green Key", "green_key"],
    ["Purple Key", "purple_key"],
    ["Forest Key", "forest_key"],
    ["Fire Key", "fire_key"],
    ["Water Key", "water_key"],
]

//display name, image name, code name, amount added
export const PICKUP_DATA: [string, string, string, number][] = [
    ["HP +25", "hp_pickup.png", "hp", 25],
    ["XP +1", "xp_bubble_small.png", "xp", 1],
    ["ATK +1", "atk_bubble_small.png", "atk", 1],
    ["ATK + 3", "atk_bubble.png", "atk", 5],
    ["DEF +1", "def_bubble_small.png", "def", 1],
    ["DEF + 3", "def_bubble.png", "def", 5],
]

//name, img, level, immunity
export const ENEMY_DATA: [string, string, number, string?][] = [
    ["Slime", "monster-test.gif", 5],
    ["Wisp", "wisp.gif", 15, "fire"],
    ["Rock Elemental", "rock_elemental.gif", 25, "earth"],
    ["Crab", "crab.gif", 15, "water"],
    ["Bat", "bat.gif", 25, "wind"],
    ["Ice Slug", "ice_slug.gif", 35, "ice"],
    ["Machine", "machine.gif", 50, "light"],
]

//name, img, wall, special
export const TILE_DATA: [string, string, boolean, string?][] = [
    //STAIRS
    ["Stairs Down", "down_stairs.png", false, "down-stairs"],
    ["Stairs Up", "up_stairs.png", false, "up-stairs"],
    //NORMAL TILES
    ["Red Floor", "red_floor.png", false],
    ["Orange Floor", "orange_floor.png", false],
    ["Yellow Floor", "yellow_floor.png", false],
    ["Green Floor", "green_floor.png", false],
    ["Blue Floor", "blue_floor.png", false],
    ["Purple Floor", "purple_floor.png", false],
    ["Pink Floor", "pink_floor.png", false],
    ["Grey Wall", "grey_wall.png", true],
    ["Pink Wall", "pink_wall.png", true],
    ["Grass Floor", "grass_floor.png", false],
    ["Dungeon Wall", "dungeon_wall.png", true],
    ["Ice Floor", "ice_floor.png", false],
    ["Ice Wall", "ice_wall.png", true],
    ["Dark Dungeon Wall", "dark_dungeon_wall.png", true],
    //SPELL WALLS
    ["Break Wall", "brown_wall.png", true, "all"],
    ["Fire Spell Wall", "fire_spell_wall.png", true, "fire"],
    ["Earth Spell Wall", "earth_spell_wall.png", true, "earth"],
    ["Water Spell Wall", "water_spell_wall.png", true, "water"],
    ["Wind Spell Wall", "wind_spell_wall.png", true, "wind"],
    ["Ice Spell Wall", "ice_spell_wall.png", true, "ice"],
    //MOVE THIS AFTER I REWRITE THE MAP SAVE DATA LMAO
    ["Start Floor", "teal_floor.png", false, "start"]
]