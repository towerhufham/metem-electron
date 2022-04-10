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
export const ENEMY_DATA: [string, string, number, string|undefined][] = [
    ["Slime", "monster-test.gif", 5, undefined],
    ["Wisp", "wisp.gif", 15, "fire"],
    ["Rock Elemental", "rock_elemental.gif", 25, "earth"],
    ["Crab", "crab.gif", 15, "water"],
    ["Bat", "bat.gif", 25, "wind"],
    ["Ice Slug", "ice_slug.gif", 35, "ice"],
    ["Machine", "machine.gif", 50, "light"],
]