/**
 * Shared settings contract for the harness-title plugin (HOST side).
 *
 * The schemastery schema resolves the `harness-title` settings namespace the
 * web settings surface edits. The browser half re-declares the TS interface
 * in src/client/settings.ts (type-only imports are erased at build, so the
 * client bundle never carries schemastery); keep the two field sets in sync.
 * @module harness-title/settings
 */
import z from 'schemastery';
/** Settings namespace this plugin owns (registered by the host half). */
export const TITLE_NS = 'harness-title';
/** Font size bounds, mirrored by the client card's number field. */
export const FONT_SIZE_MIN = 10;
export const FONT_SIZE_MAX = 72;
/** Default display font size in px. */
export const FONT_SIZE_DEFAULT = 22;
/** Default workspace-name font size in px (smaller than the title). */
export const WORKSPACE_FONT_SIZE_DEFAULT = 20;
/** Workspace-name placements relative to the title text. */
export const WORKSPACE_POSITIONS = [
    'left',
    'right',
    'below',
];
/** The default placement (right of the title, like `TITLE [workspace]`). */
export const WORKSPACE_POSITION_DEFAULT = 'right';
/** Workspace-name sources: follow the current DSH workspace, or a fixed manual text. */
export const WORKSPACE_MODES = [
    'auto',
    'manual',
];
/** The default source: follow the current workspace. */
export const WORKSPACE_MODE_DEFAULT = 'auto';
/** Display positions; `above-new-session` is the user-approved default. */
export const POSITIONS = [
    'above-new-session',
    'top-right',
    'top-left',
    'top-center',
];
/** The default position (above the New Session button, sidebar top). */
export const POSITION_DEFAULT = 'above-new-session';
/** Default text color (readable on the dark sidebar fill). */
export const COLOR_DEFAULT = '#f0f0f0';
/**
 * Default badge background. A theme token rather than `transparent`: the
 * badge sits over the sidebar's wordmark row by default, and an opaque
 * theme-aware chip keeps the out-of-box title readable in both themes until
 * the user picks their own color (custom colors always win).
 */
export const BACKGROUND_COLOR_DEFAULT = 'var(--dsw-alias-bg-layer-3)';
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
});
