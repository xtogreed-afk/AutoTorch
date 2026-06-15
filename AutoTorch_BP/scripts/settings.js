const playerSettings = new Map();

export function getSettings(playerName) {
  if (!playerSettings.has(playerName)) {
    playerSettings.set(playerName, {
      enabled: true,
      placement: 0,
      threshold: 7,
      lang: null
    });
  }
  return playerSettings.get(playerName);
}
