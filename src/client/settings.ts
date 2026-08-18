/**
 * Client-side settings contract for harness-title (browser half).
 *
 * Value constants are duplicated from src/settings.ts on purpose: the host
 * schema module imports schemastery, which must never ride the client bundle.
 * The TitleSettings interface is imported type-only (erased at build), so the
 * two field sets share one source of truth for shapes.
 * @module harness-title/client/settings
 */

import type { TitlePosition, TitleSettings, WorkspaceMode, WorkspacePosition } from '../settings.ts'
import type { TitleKey } from './locales.ts'

export type { TitlePosition, TitleSettings, WorkspaceMode, WorkspacePosition }

/** Settings namespace bound by the client scope (host registers it). */
export const TITLE_NS = 'harness-title'

/** Font size bounds shown by the card's number field. */
export const FONT_SIZE_MIN = 10
export const FONT_SIZE_MAX = 72

/** Effective display settings when the namespace is not ready yet. */
export const TITLE_DEFAULTS: Required<TitleSettings> = {
  enabled: true,
  text: '',
  color: '#f0f0f0',
  backgroundColor: 'var(--dsw-alias-bg-layer-3)',
  fontSize: 22,
  position: 'above-new-session',
  workspaceEnabled: true,
  workspaceMode: 'auto',
  workspaceText: '',
  workspaceFontSize: 20,
  workspacePosition: 'right',
}

/** Workspace-name source choices in display order (the card's select). */
export const WORKSPACE_MODE_CHOICES: readonly WorkspaceMode[] = [
  'auto',
  'manual',
]

/** Workspace-name placement choices in display order (the card's select). */
export const WORKSPACE_POSITION_CHOICES: readonly WorkspacePosition[] = [
  'left',
  'right',
  'below',
]

/** Position choices in display order (the card's select). */
export const POSITION_CHOICES: readonly TitlePosition[] = [
  'above-new-session',
  'top-right',
  'top-left',
  'top-center',
]

/** One selectable color swatch. */
export interface ColorPreset {
  /** The CSS color value stored by this preset. */
  value: string
  /** Locale key of the preset's display label. */
  labelKey: TitleKey
}

/**
 * The preset colors offered by the color fields (shared by text color
 * and background color): two theme tokens, transparency, and seven fixed
 * colors. Anything beyond these goes through the custom input.
 */
export const COLOR_PRESETS: readonly ColorPreset[] = [
  { value: 'var(--dsw-alias-label-primary)', labelKey: 'settings.color.preset.themeLabel' },
  { value: 'var(--dsw-alias-bg-layer-3)', labelKey: 'settings.color.preset.themeSurface' },
  { value: 'transparent', labelKey: 'settings.color.preset.transparent' },
  { value: '#f0f0f0', labelKey: 'settings.color.preset.nearWhite' },
  { value: '#1f1f1f', labelKey: 'settings.color.preset.nearBlack' },
  { value: '#e5484d', labelKey: 'settings.color.preset.red' },
  { value: '#ffd60a', labelKey: 'settings.color.preset.yellow' },
  { value: '#86efac', labelKey: 'settings.color.preset.lightGreen' },
  { value: '#7dd3fc', labelKey: 'settings.color.preset.lightBlue' },
  { value: '#f9a8d4', labelKey: 'settings.color.preset.pink' },
]
