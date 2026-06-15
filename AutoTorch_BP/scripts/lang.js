export const LANGS = {
  ru: {
    btn: "\uE100\uE101 Русский",
    title: "AutoTorch — Настройки",
    toggle: "Включить AutoTorch",
    placement: "Куда ставить факел",
    placementOpts: ["Авто (стена → пол)", "Только пол", "Только стена"],
    threshold: "Порог темноты (1=тьма, 12=везде)",
    changeLang: "Сменить язык",
    saved: "§e[AutoTorch] §aНастройки сохранены!",
    cmdOn: "§e[AutoTorch] §aВключён!",
    cmdOff: "§e[AutoTorch] §cВыключен!",
    langTitle: "AutoTorch — Выбор языка",
    langBody: "Выберите язык интерфейса:"
  },
  en: {
    btn: "\uE102\uE103 English",
    title: "AutoTorch — Settings",
    toggle: "Enable AutoTorch",
    placement: "Where to place torch",
    placementOpts: ["Auto (wall → floor)", "Floor only", "Wall only"],
    threshold: "Darkness threshold (1=dark, 12=everywhere)",
    changeLang: "Change language",
    saved: "§e[AutoTorch] §aSettings saved!",
    cmdOn: "§e[AutoTorch] §aEnabled!",
    cmdOff: "§e[AutoTorch] §cDisabled!",
    langTitle: "AutoTorch — Language",
    langBody: "Choose interface language:"
  },
  uk: {
    btn: "\uE104\uE105 Українська",
    title: "AutoTorch — Налаштування",
    toggle: "Увімкнути AutoTorch",
    placement: "Куди ставити факел",
    placementOpts: ["Авто (стіна → підлога)", "Тільки підлога", "Тільки стіна"],
    threshold: "Поріг темряви (1=темно, 12=скрізь)",
    changeLang: "Змінити мову",
    saved: "§e[AutoTorch] §aНалаштування збережено!",
    cmdOn: "§e[AutoTorch] §aУвімкнено!",
    cmdOff: "§e[AutoTorch] §cВимкнено!",
    langTitle: "AutoTorch — Мова",
    langBody: "Оберіть мову інтерфейсу:"
  },
  zh: {
    btn: "\uE106\uE107 中文",
    title: "AutoTorch — 设置",
    toggle: "启用 AutoTorch",
    placement: "放置火把的位置",
    placementOpts: ["自动（墙→地板）", "仅地板", "仅墙壁"],
    threshold: "黑暗阈值（1=黑暗，12=到处）",
    changeLang: "更改语言",
    saved: "§e[AutoTorch] §a设置已保存！",
    cmdOn: "§e[AutoTorch] §a已启用！",
    cmdOff: "§e[AutoTorch] §c已禁用！",
    langTitle: "AutoTorch — 语言",
    langBody: "选择界面语言："
  },
  ja: {
    btn: "\uE108\uE109 日本語",
    title: "AutoTorch — 設定",
    toggle: "AutoTorch を有効にする",
    placement: "たいまつを置く場所",
    placementOpts: ["自動（壁→床）", "床のみ", "壁のみ"],
    threshold: "暗さの閾値（1=暗い、12=どこでも）",
    changeLang: "言語を変更",
    saved: "§e[AutoTorch] §a設定を保存しました！",
    cmdOn: "§e[AutoTorch] §a有効にしました！",
    cmdOff: "§e[AutoTorch] §c無効にしました！",
    langTitle: "AutoTorch — 言語",
    langBody: "言語を選んでください："
  }
};

export function getLang(settings) {
  return LANGS[settings.lang] ?? LANGS.ru;
}
