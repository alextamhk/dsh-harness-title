/**
 * harness-title browser half — seats the title badge into the shell's
 * `shell.overlay` slot (frame-wide floating layer, above every column) and
 * the settings card into the first-level `settings.section` nav. Both read
 * the `harness-title` settings namespace the host half registers; edits from
 * the settings card persist to ~/.dsh/settings.yaml and re-render the badge
 * live through the shared scope.
 * @module harness-title/client
 */

import type { ClientContext, SettingsScope, SettingsScopeSpec } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the locale plugin's Context merge (ctx.locale).
import type {} from '@deepseek-ai/dsh-client-locale/client'
// Type-only: pulls the settings-surface Context merge (ctx.settingsScope) and the settings.section SlotMap entry.
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
// Type-only: pulls the layout plugin's SlotMap merge (the shell.overlay entry).
import type {} from '@deepseek-ai/dsh-client-ui-layout/client'
// Type-only: pulls the slot registration surface (register/inject option types).
import type {} from '@deepseek-ai/dsh-client-ui-slots'
import { TitleBadge } from './TitleBadge.tsx'
import { TitleSettingsCardController, TitleSettingsSection } from './TitleSettingsCard.tsx'
import { NS, en, zh } from './locales.ts'
import { TITLE_NS, type TitleSettings } from './settings.ts'

declare module '@deepseek-ai/cordis' {
  interface Context {
    /**
     * Optional rc.6 compatibility binder provided by dsh-web-ui-settings;
     * absent when that group plugin is not installed, so callers fall back to
     * the official settings scope.
     */
    webUiSettings?: { bind<S>(spec: SettingsScopeSpec<S>): SettingsScope<S> }
  }
}

/** Required services (settingsScope drives both surfaces; remote forwards invalidation). */
export const inject = ['slots', 'locale', 'connection', 'settingsScope', 'remote']

/** Re-export the badge for consumers that type against the injected face. */
export type { TitleBadgeProps } from './TitleBadge.tsx'
export type { TitleSettingsCardFace, TitleSettingsCardProps, TitleSettingsCardState, TitleSettingsSectionProps } from './TitleSettingsCard.tsx'
export type { TitlePosition, TitleSettings } from './settings.ts'

/**
 * Client plugin body: register dictionaries, seat the settings card, and
 * render the title badge over the whole frame.
 * @param ctx - client root context.
 */
export function apply(ctx: ClientContext): void {
  ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'harness-title: dictionaries')

  const binder = ctx.get('webUiSettings') ?? ctx.settingsScope
  const settingsScope = binder.bind<TitleSettings>({ namespace: TITLE_NS })

  // First-level settings section: one staged form over the harness-title
  // namespace, registered as a top-level settings page.
  const card = new TitleSettingsCardController(settingsScope)
  ctx.slots.inject('settings.section', () => {
    const unregister = ctx.slots.register({
      name: 'settings.section',
      id: TITLE_NS,
      order: 150,
      label: () => ctx.locale.bind(NS)('settings.title'),
      locale: NS,
      inject: () => card.inject(),
    }, TitleSettingsSection)
    return () => {
      card.dispose()
      unregister()
    }
  })

  // The title badge: a root-scoped list entry in the frame-wide floating
  // layer, so it persists across sessions (and the no-session hero) and never
  // interferes with the UI underneath (the badge is pointer-events: none).
  ctx.slots.inject('shell.overlay', () => {
    const unregister = ctx.slots.register({
      name: 'shell.overlay',
      id: TITLE_NS,
      order: 0,
      inject: () => ({ hooks: { titleSettings: settingsScope } }),
    }, TitleBadge)
    return () => {
      unregister()
    }
  })
}
