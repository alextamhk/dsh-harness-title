/**
 * Client-side settings contract for harness-title (browser half).
 *
 * Value constants are duplicated from src/settings.ts on purpose: the host
 * schema module imports schemastery, which must never ride the client bundle.
 * The TitleSettings interface is imported type-only (erased at build), so the
 * two field sets share one source of truth for shapes.
 * @module harness-title/client/settings
 */
import type { TitlePosition, TitleSettings, WorkspaceMode, WorkspacePosition } from '../settings.ts';
import type { TitleKey } from './locales.ts';
export type { TitlePosition, TitleSettings, WorkspaceMode, WorkspacePosition };
/** Settings namespace bound by the client scope (host registers it). */
export declare const TITLE_NS = "harness-title";
/** Font size bounds shown by the card's number field. */
export declare const FONT_SIZE_MIN = 10;
export declare const FONT_SIZE_MAX = 72;
/** Effective display settings when the namespace is not ready yet. */
export declare const TITLE_DEFAULTS: Required<TitleSettings>;
/** Workspace-name source choices in display order (the card's select). */
export declare const WORKSPACE_MODE_CHOICES: readonly WorkspaceMode[];
/** Workspace-name placement choices in display order (the card's select). */
export declare const WORKSPACE_POSITION_CHOICES: readonly WorkspacePosition[];
/** Position choices in display order (the card's select). */
export declare const POSITION_CHOICES: readonly TitlePosition[];
/** One selectable color swatch. */
export interface ColorPreset {
    /** The CSS color value stored by this preset. */
    value: string;
    /** Locale key of the preset's display label. */
    labelKey: TitleKey;
}
/**
 * The preset colors offered by the color fields (shared by text color
 * and background color): two theme tokens, transparency, and seven fixed
 * colors. Anything beyond these goes through the custom input.
 */
export declare const COLOR_PRESETS: readonly ColorPreset[];
//# sourceMappingURL=settings.d.ts.map