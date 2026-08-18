/**
 * A staged color field: a row of preset swatches plus a Custom option that
 * reveals a free-text input. Rides the same staged CardForm draft text as the
 * other controls — clicking a swatch stages that preset's value, typing in the
 * custom input stages the draft — so the save/discard semantics are identical
 * to every other field. The invalid state (unparseable color) blocks the save.
 * @module harness-title/client/ColorField
 */
import type { FieldProps } from './PluginSettingsCard.tsx';
import type { ColorPreset } from './settings.ts';
/** Props the color field needs beyond the shared field props. */
export interface ColorFieldProps extends FieldProps {
    /** The preset swatches offered by this field. */
    presets: readonly ColorPreset[];
    /** Localized label of the Custom option. */
    customLabel: string;
    /** Localized label of each preset (resolved by the caller through t). */
    presetLabel: (preset: ColorPreset) => string;
}
/**
 * Render a staged color field (swatches + custom input).
 * @param props - shared field props plus the preset list.
 * @returns the field.
 */
export declare function ColorField(props: ColorFieldProps): import("react").JSX.Element;
//# sourceMappingURL=ColorField.d.ts.map