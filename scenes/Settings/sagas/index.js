import { settingsPageRoot } from "./settings";

export function runSettingsPageSagas(sagaRunFn) {
  sagaRunFn(settingsPageRoot);
}
