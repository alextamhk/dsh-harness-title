/**
 * Shared settings contract for the harness-title plugin (HOST side).
 *
 * The schemastery schema resolves the `harness-title` settings namespace the
 * web settings surface edits. The browser half re-declares the TS interface
 * in src/client/settings.ts (type-only imports are erased at build, so the
 * client bundle never carries schemastery); keep the two field sets in sync.
 * @module harness-title/settings
 */

import z from 'schemastery'

/** Settings namespace this plugin owns (registered by the host half). */
export const TITLE_NS = 'harness-title'

/** Font size bounds, mirrored by the client card's number field. */
export const FONT_SIZE_MIN = 10
export const FONT_SIZE_MAX = 72

/** Default display font size in px. */
export const FONT_SIZE_DEFAULT = 22

/** Default workspace-name font size in px (smaller than the title). */
export const WORKSPACE_FONT_SIZE_DEFAULT = 20

/** Workspace-name placements relative to the title text. */
export const WORKSPACE_POSITIONS = [
  'left',
  'right',
  'below',
] as const

/** One workspace-name placement key. */
export type WorkspacePosition = (typeof WORKSPACE_POSITIONS)[number]

/** The default placement (right of the title, like `TITLE [workspace]`). */
export const WORKSPACE_POSITION_DEFAULT: WorkspacePosition = 'right'

/** Workspace-name sources: follow the current DSH workspace, or a fixed manual text. */
export const WORKSPACE_MODES = [
  'auto',
  'manual',
] as const

/** One workspace-name source key. */
export type WorkspaceMode = (typeof WORKSPACE_MODES)[number]

/** The default source: follow the current workspace. */
export const WORKSPACE_MODE_DEFAULT: WorkspaceMode = 'auto'

/** Display positions; `above-new-session` is the user-approved default. */
export const POSITIONS = [
  'above-new-session',
  'top-right',
  'top-left',
  'top-center',
] as const

/** One display position key. */
export type TitlePosition = (typeof POSITIONS)[number]

/** The default position (above the New Session button, sidebar top). */
export const POSITION_DEFAULT: TitlePosition = 'above-new-session'

/** Default text color (readable on the dark sidebar fill). */
export const COLOR_DEFAULT = '#f0f0f0'

/**
 * Default badge background. A theme token rather than `transparent`: the
 * badge sits over the sidebar's wordmark row by default, and an opaque
 * theme-aware chip keeps the out-of-box title readable in both themes until
 * the user picks their own color (custom colors always win).
 */
export const BACKGROUND_COLOR_DEFAULT = 'var(--dsw-alias-bg-layer-3)'

/** The settings section the GUI card edits (optional fields = user layer may omit any). */
export interface TitleSettings {
  /** Master switch; off hides the badge. */
  enabled?: boolean
  /** Title text; empty string hides the badge. */
  text?: string
  /** Text color (any CSS color value). */
  color?: string
  /** Badge background (any CSS color value, incl. var(--dsw-*) tokens). */
  backgroundColor?: string
  /** Font size in px, 10–72. */
  fontSize?: number
  /** Display position. */
  position?: TitlePosition
  /** Workspace-name switch; off hides the bracketed workspace part. */
  workspaceEnabled?: boolean
  /** Workspace-name source: auto (current workspace) or manual (workspaceText). */
  workspaceMode?: WorkspaceMode
  /** Workspace name text (used by the manual source); empty string hides the bracketed part. */
  workspaceText?: string
  /** Workspace-name font size in px, 10–72 (independent of fontSize). */
  workspaceFontSize?: number
  /** Workspace-name placement relative to the title: left / right / below. */
  workspacePosition?: WorkspacePosition
}

/** Schemastery schema for the namespace (defaults resolve empty user layers). */
export const TitleSettingsSchema = z.object({
  enabled: z.boolean().default(true),
  text: z.string().default(''),
  color: z.string().default(COLOR_DEFAULT),
  backgroundColor: z.string().default(BACKGROUND_COLOR_DEFAULT),
  fontSize: z.number().step(1).min(FONT_SIZE_MIN).max(FONT_SIZE_MAX).default(FONT_SIZE_DEFAULT),
  position: z.union([...POSITIONS]).default(POSITION_DEFAULT),
  workspaceEnabled: z.boolean().default(true),
  workspaceMode: z.union([...WORKSPACE_MODES]).default(WORKSPACE_MODE_DEFAULT),
  workspaceText: z.string().default(''),
  workspaceFontSize: z.number().step(1).min(FONT_SIZE_MIN).max(FONT_SIZE_MAX).default(WORKSPACE_FONT_SIZE_DEFAULT),
  workspacePosition: z.union([...WORKSPACE_POSITIONS]).default(WORKSPACE_POSITION_DEFAULT),
})
