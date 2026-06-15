import { BlockPermutation } from "@minecraft/server";
import { getSettings } from "./settings.js";

const TORCH_ITEM = "minecraft:torch";

const WALL_DIRS = [
  { dx:  1, dz:  0, facing: "west"  },
  { dx: -1, dz:  0, facing: "east"  },
  { dx:  0, dz:  1, facing: "north" },
  { dx:  0, dz: -1, facing: "south" },
];

function tryPlaceOnWall(dimension, loc) {
  const bx = Math.floor(loc.x), by = Math.floor(loc.y), bz = Math.floor(loc.z);
  for (const dir of WALL_DIRS) {
    const wallBlock = dimension.getBlock({ x: bx + dir.dx, y: by, z: bz + dir.dz });
    if (!wallBlock || !wallBlock.isSolid) continue;
    const torchBlock = dimension.getBlock({ x: bx, y: by, z: bz });
    if (!torchBlock || torchBlock.typeId !== "minecraft:air") continue;
    try {
      torchBlock.setPermutation(BlockPermutation.resolve("minecraft:torch", { torch_facing_direction: dir.facing }));
      return true;
    } catch {}
  }
  return false;
}

function tryPlaceOnFloor(dimension, loc) {
  const candidates = [
    { x: Math.floor(loc.x),     y: Math.floor(loc.y) - 1, z: Math.floor(loc.z) },
    { x: Math.floor(loc.x) + 1, y: Math.floor(loc.y) - 1, z: Math.floor(loc.z) },
    { x: Math.floor(loc.x) - 1, y: Math.floor(loc.y) - 1, z: Math.floor(loc.z) },
    { x: Math.floor(loc.x),     y: Math.floor(loc.y) - 1, z: Math.floor(loc.z) + 1 },
    { x: Math.floor(loc.x),     y: Math.floor(loc.y) - 1, z: Math.floor(loc.z) - 1 },
  ];
  for (const pos of candidates) {
    const groundBlock = dimension.getBlock(pos);
    if (!groundBlock || !groundBlock.isSolid) continue;
    const aboveBlock = dimension.getBlock({ x: pos.x, y: pos.y + 1, z: pos.z });
    if (!aboveBlock || aboveBlock.typeId !== "minecraft:air") continue;
    try {
      aboveBlock.setPermutation(BlockPermutation.resolve("minecraft:torch", { torch_facing_direction: "top" }));
      return true;
    } catch {}
  }
  return false;
}

function consumeTorch(container, slot) {
  const item = container.getItem(slot);
  if (item.amount > 1) {
    item.amount -= 1;
    container.setItem(slot, item);
  } else {
    container.setItem(slot, undefined);
  }
}

export function tryPlaceTorch(player) {
  const settings = getSettings(player.name);
  const loc = player.location;
  const dimension = player.dimension;

  const feetBlock = dimension.getBlock({ x: Math.floor(loc.x), y: Math.floor(loc.y), z: Math.floor(loc.z) });
  if (!feetBlock) return;
  if (feetBlock.getLightLevel() > settings.threshold) return;

  const inventory = player.getComponent("minecraft:inventory");
  if (!inventory) return;
  const container = inventory.container;
  let torchSlot = -1;

  for (let i = 0; i < container.size; i++) {
    const item = container.getItem(i);
    if (item && item.typeId === TORCH_ITEM) { torchSlot = i; break; }
  }
  if (torchSlot === -1) return;

  let placed = false;
  if (settings.placement === 0) {
    placed = tryPlaceOnWall(dimension, loc) || tryPlaceOnFloor(dimension, loc);
  } else if (settings.placement === 1) {
    placed = tryPlaceOnFloor(dimension, loc);
  } else {
    placed = tryPlaceOnWall(dimension, loc) || tryPlaceOnFloor(dimension, loc);
  }

  if (placed) consumeTorch(container, torchSlot);
}

export { TORCH_ITEM };
