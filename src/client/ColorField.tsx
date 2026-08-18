/**
 * A staged color field: a row of preset swatches plus a Custom option that
 * reveals a free-text input. Rides the same staged CardForm draft text as the
 * other controls — clicking a swatch stages that preset's value, typing in the
 * custom input stages the draft — so the save/discard semantics are identical
 * to every other field. The invalid state (unparseable color) blocks the save.
 * @module harness-title/client/ColorField
 */

import { useState } from 'react'
import type { FieldProps } from './PluginSettingsCard.tsx'
import type { ColorPreset } from './settings.ts'
import cardCss from './settings-card.module.css'
import css from './color-field.module.css'

/** Props the color field needs beyond the shared field props. */
export interface ColorFieldProps extends FieldProps {
  /** The preset swatches offered by this field. */
  presets: readonly ColorPreset[]
  /** Localized label of the Custom option. */
  customLabel: string
  /** Localized label of each preset (resolved by the caller through t). */
  presetLabel: (preset: ColorPreset) => string
}

/**
 * Render a staged color field (swatches + custom input).
 * @param props - shared field props plus the preset list.
 * @returns the field.
 */
export function ColorField(props: ColorFieldProps) {
  const [customOpen, setCustomOpen] = useState(false)
  const selected = props.presets.find(preset => preset.value === props.text)
  // The custom input shows while the user opened it, or while the current
  // draft is a value no preset carries (an existing custom color).
  const customActive = customOpen || (selected === undefined && props.text !== '')
  return (
    <div className={cardCss.field}>
      <div className={cardCss.head}>
        <label className={cardCss.label} htmlFor={props.id}>{props.label}</label>
        {props.overridden
          ? (
            <span className={cardCss.badges}>
              <span className={cardCss.badge}>{props.overriddenLabel}</span>
              <button
                type="button"
                className={cardCss.reset}
                disabled={props.disabled}
                onClick={props.onReset}
              >
                {props.resetLabel}
              </button>
            </span>
          )
          : null}
      </div>
      <div className={css.swatches}>
        {props.presets.map(preset => {
          const isSelected = selected?.value === preset.value
          const label = props.presetLabel(preset)
          return (
            <button
              key={preset.value}
              type="button"
              className={[
                css.swatch,
                preset.value === 'transparent' ? css.swatchTransparent : undefined,
                isSelected ? css.swatchSelected : undefined,
              ].filter(Boolean).join(' ')}
              style={preset.value === 'transparent' ? undefined : { backgroundColor: preset.value }}
              title={label}
              aria-label={label}
              aria-pressed={isSelected}
              disabled={props.disabled}
              onClick={() => {
                setCustomOpen(false)
                props.onEdit(preset.value)
              }}
            >
              {isSelected ? <span className={css.swatchCheck}>✓</span> : null}
            </button>
          )
        })}
        <button
          type="button"
          className={[css.swatch, css.swatchCustom, customActive ? css.swatchSelected : undefined].filter(Boolean).join(' ')}
          title={props.customLabel}
          aria-label={props.customLabel}
          aria-pressed={customActive}
          disabled={props.disabled}
          onClick={() => { setCustomOpen(!customOpen) }}
        >
          {customActive ? <span className={css.swatchCheck}>✓</span> : <span className={css.customIcon}>⋯</span>}
        </button>
      </div>
      {customActive
        ? (
          <input
            id={props.id}
            className={props.invalid ? cardCss.inputInvalid : cardCss.input}
            type="text"
            value={props.text}
            disabled={props.disabled}
            aria-invalid={props.invalid || undefined}
            onChange={(event) => { props.onEdit(event.target.value) }}
          />
        )
        : null}
      <p className={props.invalid ? cardCss.invalid : cardCss.hint}>
        {props.invalid ? props.invalidLabel : props.hint}
      </p>
    </div>
  )
}
