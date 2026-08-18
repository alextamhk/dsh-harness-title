/**
 * harness-title host half — registers the `harness-title` settings namespace
 * so the browser half's settings card and title badge can read/write it.
 * That is the plugin's entire host footprint: the badge itself renders purely
 * on the client from the resolved settings section, and settings persist per
 * profile in ~/.dsh/settings.yaml (one file per machine → each machine names
 * its own Harness instance).
 *
 * The composition base defaults `text` to the machine hostname, so a fresh
 * install already identifies the machine out of the box; the user can
 * override it (or anything else) from the Settings page.
 * @module harness-title
 */

import { Context } from '@deepseek-ai/cordis'
import { installSettingsSection, settingsNamespace } from '@deepseek-ai/dsh-settings'
import os from 'node:os'
import {
  BACKGROUND_COLOR_DEFAULT,
  COLOR_DEFAULT,
  FONT_SIZE_DEFAULT,
  POSITION_DEFAULT,
  TITLE_NS,
  TitleSettingsSchema,
  type TitleSettings,
} from './settings.ts'

/** Stable cordis plugin name (matches cordis.patch.yml insert id). */
export const name = 'harness-title'

/** No host services required; the settings wiring is optional-service based. */
export const inject: string[] = []

/** Register the settings namespace with the machine hostname as the base text. */
export function apply(ctx: Context): void {
  const base: TitleSettings = {
    enabled: true,
    text: os.hostname(),
    color: COLOR_DEFAULT,
    backgroundColor: BACKGROUND_COLOR_DEFAULT,
    fontSize: FONT_SIZE_DEFAULT,
    position: POSITION_DEFAULT,
  }
  let current: () => TitleSettings = () => base
  installSettingsSection<TitleSettings>(
    ctx,
    settingsNamespace(TITLE_NS),
    TitleSettingsSchema,
    base,
    {
      setSource: (source) => { current = source },
      onChange: () => {
        // The badge lives entirely on the client; nothing host-side derives
        // from the section today. Keep the hooks for future extensions
        // (e.g. mirroring the title into the window title).
        void current()
      },
    },
  )
}
