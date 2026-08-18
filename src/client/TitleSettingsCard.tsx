/**
 * The harness-title settings card: title text, colors, font size, position
 * and master switch, bound to the `harness-title` settings namespace the host
 * plugin registers. Rendered as an always-open first-level settings page; the
 * section wrapper mounts it as the content of the top-level
 * 'settings.section' nav entry (order 150 — clear of the family plugins).
 * @module harness-title/client/TitleSettingsCard
 */

import type { ReactNode } from 'react'
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots'
import type { SettingsScope, SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client'
// Type-only: pulls the settings-surface SlotMap merge (the 'settings.section' entry).
import type {} from '@deepseek-ai/dsh-client-ui-settings/client'
import { PluginSettingsCard, ValueField, BooleanField, ChoiceField } from './PluginSettingsCard.tsx'
import { ColorField } from './ColorField.tsx'
import { CardForm, booleanField, choiceField, textField, type CardActions, type CardShell, type FieldSpec, type FieldState as CardFieldState } from './settings-form.ts'
import { COLOR_PRESETS, FONT_SIZE_MAX, FONT_SIZE_MIN, POSITION_CHOICES, type TitlePosition, type TitleSettings } from './settings.ts'
import type { TitleKey } from './locales.ts'
import sectionCss from './settings-section.module.css'

/** Locale key of each position's label (re-read per render, so a locale switch refreshes it). */
const POSITION_LABEL_KEYS: Record<TitlePosition, TitleKey> = {
  'above-new-session': 'settings.position.aboveNewSession',
  'top-right': 'settings.position.topRight',
  'top-left': 'settings.position.topLeft',
  'top-center': 'settings.position.topCenter',
}

/** The namespace's fields this card edits. */
export type { TitleSettings }

/** What the title settings card renders. */
export interface TitleSettingsCardState extends CardShell {
  /** Master switch. */
  enabled: CardFieldState
  /** Title text. */
  text: CardFieldState
  /** Text color. */
  color: CardFieldState
  /** Badge background color. */
  backgroundColor: CardFieldState
  /** Font size px. */
  fontSize: CardFieldState
  /** Display position. */
  position: CardFieldState
}

/** The registration-side face the card's slot entry injects. */
export interface TitleSettingsCardFace extends CardActions {
  hooks: {
    /** Card snapshot bound by the renderer as useTitleSettingsCard. */
    titleSettingsCard: SnapshotStore<TitleSettingsCardState>
  }
}

/** Whether a draft is a usable CSS color (hex, named, functional, or a --dsw-* token). */
function isValidCssColor(value: string): boolean {
  const trimmed = value.trim()
  if (trimmed === '') return false
  if (/^var\(--[\w-]+\)$/.test(trimmed)) return true
  if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
    return CSS.supports('color', trimmed)
  }
  return /^(#[\da-f]{3,8}|transparent|currentcolor|[a-z]+|rgb\(|rgba\(|hsl\(|hsla\(|hwb\(|oklch\(|lab\(|color\()/i.test(trimmed)
}

/** A CSS-color field; a draft that is not a valid color blocks the save. An empty draft clears the field. */
function colorField(field: string): FieldSpec {
  return {
    field,
    format: value => typeof value === 'string' ? value : '',
    parse: (text) => {
      const trimmed = text.trim()
      if (trimmed === '') return { kind: 'clear' }
      return isValidCssColor(trimmed) ? { kind: 'set', value: trimmed } : undefined
    },
  }
}

/** A whole-number field within [min, max] (mirrors the host schema bounds). */
function boundedNumberField(field: string, min: number, max: number): FieldSpec {
  return {
    field,
    format: value => typeof value === 'number' ? String(value) : '',
    parse: (text) => {
      const trimmed = text.trim()
      if (trimmed === '') return { kind: 'clear' }
      const parsed = Number(trimmed)
      if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return undefined
      if (parsed < min || parsed > max) return undefined
      return { kind: 'set', value: parsed }
    },
  }
}

/** Bridges the 'harness-title' scope onto the card's staged form. */
export class TitleSettingsCardController {
  private readonly form: CardForm<TitleSettings>
  private readonly store: SnapshotStore<TitleSettingsCardState>

  /** @param scope - the bound settings scope for the 'harness-title' namespace. */
  constructor(scope: SettingsScope<TitleSettings>) {
    this.form = new CardForm(scope, [
      booleanField('enabled'),
      textField('text'),
      colorField('color'),
      colorField('backgroundColor'),
      boundedNumberField('fontSize', FONT_SIZE_MIN, FONT_SIZE_MAX),
      choiceField('position', POSITION_CHOICES),
    ])
    this.store = this.form.bind(() => this.projection())
  }

  private projection(): TitleSettingsCardState {
    return {
      ...this.form.shell(),
      enabled: this.form.field('enabled'),
      text: this.form.field('text'),
      color: this.form.field('color'),
      backgroundColor: this.form.field('backgroundColor'),
      fontSize: this.form.field('fontSize'),
      position: this.form.field('position'),
    }
  }

  /**
   * Build the face the card's slot registration injects.
   * @returns the card's snapshot and its form actions.
   */
  inject(): TitleSettingsCardFace {
    return { hooks: { titleSettingsCard: this.store }, ...this.form.actions() }
  }

  /**
   * Release the card's scope subscription and bound stores; the slot
   * disposer calls this on teardown.
   */
  dispose(): void {
    this.form.dispose()
  }
}

/** Props the renderer binds for the title settings card. */
export type TitleSettingsCardProps =
  PropsLocale<'harness-title'>
  & InjectFace<TitleSettingsCardFace>

/**
 * Render the title settings card.
 * @param props - locale copy, the card snapshot, and its form actions.
 * @returns the card.
 */
export function TitleSettingsCard(props: TitleSettingsCardProps) {
  const { t } = props
  const state = props.useTitleSettingsCard(snapshot => snapshot)
  const disabled = !state.writable
  const fieldProps = {
    overriddenLabel: t('settings.overridden'),
    resetLabel: t('settings.reset'),
    invalidLabel: t('settings.invalidNumber'),
    disabled,
  }
  const positionChoices = POSITION_CHOICES.map(position => ({ value: position, label: t(POSITION_LABEL_KEYS[position]) }))
  return (
    <PluginSettingsCard
      t={t}
      titleKey="settings.title"
      descriptionKey="settings.description"
      state={state}
      onSave={props.save}
      onDiscard={props.discard}
      alwaysOpen
    >
      <BooleanField
        id="settings-harness-title-enabled"
        label={t('settings.enabled')}
        hint={t('settings.enabledHint')}
        inheritLabel={t('settings.inherit')}
        onLabel={t('settings.on')}
        offLabel={t('settings.off')}
        {...fieldProps}
        {...state.enabled}
        onEdit={(text) => { props.edit('enabled', text) }}
        onReset={() => { props.resetField('enabled') }}
      />
      <ValueField
        id="settings-harness-title-text"
        label={t('settings.text')}
        hint={t('settings.textHint')}
        {...fieldProps}
        {...state.text}
        onEdit={(text) => { props.edit('text', text) }}
        onReset={() => { props.resetField('text') }}
      />
      <ColorField
        id="settings-harness-title-color"
        label={t('settings.color')}
        hint={t('settings.colorHint')}
        {...fieldProps}
        invalidLabel={t('settings.invalidColor')}
        {...state.color}
        presets={COLOR_PRESETS}
        customLabel={t('settings.color.custom')}
        presetLabel={(preset) => t(preset.labelKey)}
        onEdit={(text) => { props.edit('color', text) }}
        onReset={() => { props.resetField('color') }}
      />
      <ColorField
        id="settings-harness-title-background"
        label={t('settings.backgroundColor')}
        hint={t('settings.backgroundColorHint')}
        {...fieldProps}
        invalidLabel={t('settings.invalidColor')}
        {...state.backgroundColor}
        presets={COLOR_PRESETS}
        customLabel={t('settings.color.custom')}
        presetLabel={(preset) => t(preset.labelKey)}
        onEdit={(text) => { props.edit('backgroundColor', text) }}
        onReset={() => { props.resetField('backgroundColor') }}
      />
      <ValueField
        id="settings-harness-title-font-size"
        label={t('settings.fontSize')}
        hint={t('settings.fontSizeHint')}
        numeric
        {...fieldProps}
        {...state.fontSize}
        onEdit={(text) => { props.edit('fontSize', text) }}
        onReset={() => { props.resetField('fontSize') }}
      />
      <ChoiceField
        id="settings-harness-title-position"
        label={t('settings.position')}
        hint={t('settings.positionHint')}
        inheritLabel={t('settings.inherit')}
        {...fieldProps}
        {...state.position}
        choices={positionChoices}
        onEdit={(text) => { props.edit('position', text) }}
        onReset={() => { props.resetField('position') }}
      />
    </PluginSettingsCard>
  )
}

/** Props the settings section binds for the title card page. */
export type TitleSettingsSectionProps =
  PropsRuntime<'settings.section'>
  & PropsLocale<'harness-title'>
  & InjectFace<TitleSettingsCardFace>

/** Render the title settings card as a first-level settings page. */
export function TitleSettingsSection(props: TitleSettingsSectionProps): ReactNode {
  const { t, useTitleSettingsCard, save, discard, edit, resetField } = props
  return (
    <ul className={sectionCss.sectionList}>
      <TitleSettingsCard t={t} useTitleSettingsCard={useTitleSettingsCard} save={save} discard={discard} edit={edit} resetField={resetField} />
    </ul>
  )
}
