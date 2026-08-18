/**
 * The harness-title badge: a fixed-position name plate rendered into the
 * shell's `shell.overlay` slot (root-scoped list slot, above every column).
 *
 * Click-through discipline: the overlay layer container is pointer-events:
 * none but restores pointer events on its DIRECT children, so this badge's
 * root element must re-disable them — the badge never blocks the New Session
 * button (or anything else) underneath it.
 *
 * The badge hides itself while the settings namespace is not ready, while
 * disabled, or while the text is empty; the `above-new-session` position
 * additionally auto-hides when the frame collapses the sidebar to the rail
 * (ancestor `data-sidebar-collapsed`).
 * @module harness-title/client/TitleBadge
 */

import type { SettingsScopeSnapshot } from '@deepseek-ai/dsh-client-runtime/client'
import type { SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
import type { InjectFace } from '@deepseek-ai/dsh-client-ui-slots'
import { TITLE_DEFAULTS, type TitleSettings } from './settings.ts'
import css from './title.module.css'

/** The injected face: the bound settings scope as a selector-hook source. */
export interface TitleBadgeInjected {
  hooks: {
    /** Live settings snapshot (status, resolved value, writability). */
    titleSettings: SnapshotStore<SettingsScopeSnapshot<TitleSettings>>
  }
}

/** Props the slot renderer binds for the badge. */
export type TitleBadgeProps = InjectFace<TitleBadgeInjected>

/**
 * Render the title badge per the current settings snapshot.
 * @param props - the bound settings hook.
 * @returns the badge, or nothing when hidden.
 */
export function TitleBadge(props: TitleBadgeProps) {
  const snapshot = props.useTitleSettings(settings => settings)
  const value = snapshot.value
  if (snapshot.status !== 'ready' || value === undefined) return null
  const settings = { ...TITLE_DEFAULTS, ...value }
  const text = settings.text.trim()
  if (!settings.enabled || text === '') return null
  return (
    <div
      className={css.badge}
      data-position={settings.position}
      style={{
        color: settings.color,
        backgroundColor: settings.backgroundColor,
        fontSize: `${settings.fontSize}px`,
      }}
      title={settings.text}
    >
      {settings.text}
    </div>
  )
}
