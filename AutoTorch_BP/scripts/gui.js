import { system } from "@minecraft/server";
import { ModalFormData, ActionFormData } from "@minecraft/server-ui";
import { getSettings } from "./settings.js";
import { LANGS, getLang } from "./lang.js";

function openLangScreen(player, callback) {
  const settings = getSettings(player.name);
  const t = getLang(settings);
  const form = new ActionFormData()
    .title(t.langTitle)
    .body(t.langBody);

  for (const [key, lang] of Object.entries(LANGS)) {
    form.button(key === settings.lang ? `§a${lang.btn}` : `§f${lang.btn}`);
  }

  form.show(player).then((result) => {
    if (result.canceled) return;
    settings.lang = Object.keys(LANGS)[result.selection];
    if (callback) callback(player);
  });
}

function openSettingsScreen(player) {
  const settings = getSettings(player.name);
  const t = getLang(settings);

  const form = new ModalFormData()
    .title(t.title)
    .toggle(t.toggle, { defaultValue: settings.enabled })
    .dropdown(t.placement, t.placementOpts, { defaultValueIndex: settings.placement })
    .slider(t.threshold, 1, 12, { valueStep: 1, defaultValue: settings.threshold })
    .toggle(t.changeLang, { defaultValue: false });

  form.show(player).then((result) => {
    if (result.canceled) return;
    settings.enabled = result.formValues[0];
    settings.placement = result.formValues[1];
    settings.threshold = result.formValues[2];
    const wantsLangChange = result.formValues[3];
    player.sendMessage(t.saved);
    if (wantsLangChange) {
      system.run(() => openLangScreen(player, openSettingsScreen));
    }
  });
}

export function openMenu(player) {
  const settings = getSettings(player.name);
  if (settings.lang === null) {
    openLangScreen(player, openSettingsScreen);
  } else {
    openSettingsScreen(player);
  }
}
