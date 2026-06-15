import { world, system, GameMode, EquipmentSlot } from "@minecraft/server";
import { getSettings } from "./settings.js";
import { getLang } from "./lang.js";
import { openMenu } from "./gui.js";
import { tryPlaceTorch, TORCH_ITEM } from "./torch.js";

const CHECK_INTERVAL = 40;
const wasSneaking = new Map();

world.afterEvents.worldLoad.subscribe(() => {
  system.runInterval(() => {
    for (const player of world.getPlayers()) {
      const settings = getSettings(player.name);
      const isSneakingNow = player.isSneaking;
      const wasSneak = wasSneaking.get(player.name) ?? false;

      if (isSneakingNow && !wasSneak) {
        const equipment = player.getComponent("minecraft:equippable");
        if (equipment) {
          const mainHand = equipment.getEquipment(EquipmentSlot.Mainhand);
          if (mainHand && mainHand.typeId === TORCH_ITEM) {
            system.run(() => openMenu(player));
          }
        }
      }
      wasSneaking.set(player.name, isSneakingNow);

      if (!settings.enabled) continue;
      if (player.getGameMode() === GameMode.creative) continue;
      tryPlaceTorch(player);
    }
  }, CHECK_INTERVAL);

  world.afterEvents.chatSend.subscribe((event) => {
    const msg = event.message.trim().toLowerCase();
    const player = event.sender;
    const t = getLang(getSettings(player.name));
    if (msg === "/torch menu") system.run(() => openMenu(player));
    else if (msg === "/torch on") { getSettings(player.name).enabled = true; player.sendMessage(t.cmdOn); }
    else if (msg === "/torch off") { getSettings(player.name).enabled = false; player.sendMessage(t.cmdOff); }
  });
});
