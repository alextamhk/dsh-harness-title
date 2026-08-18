import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { PluginSettingsCard, ValueField, BooleanField, ChoiceField } from "./PluginSettingsCard.js";
import { ColorField } from "./ColorField.js";
import { CardForm, booleanField, choiceField, textField } from "./settings-form.js";
import { COLOR_PRESETS, FONT_SIZE_MAX, FONT_SIZE_MIN, POSITION_CHOICES, WORKSPACE_MODE_CHOICES, WORKSPACE_POSITION_CHOICES } from "./settings.js";
import sectionCss from './settings-section.module.css';
/** Locale key of each position's label (re-read per render, so a locale switch refreshes it). */
const POSITION_LABEL_KEYS = {
    'above-new-session': 'settings.position.aboveNewSession',
    'top-right': 'settings.position.topRight',
    'top-left': 'settings.position.topLeft',
    'top-center': 'settings.position.topCenter',
};
/** Locale key of each workspace placement's label. */
const WORKSPACE_POSITION_LABEL_KEYS = {
    left: 'settings.workspacePosition.left',
    right: 'settings.workspacePosition.right',
    below: 'settings.workspacePosition.below',
};
/** Locale key of each workspace-name source's label. */
const WORKSPACE_MODE_LABEL_KEYS = {
    auto: 'settings.workspaceMode.auto',
    manual: 'settings.workspaceMode.manual',
};
/** Whether a draft is a usable CSS color (hex, named, functional, or a --dsw-* token). */
function isValidCssColor(value) {
    const trimmed = value.trim();
    if (trimmed === '')
        return false;
    if (/^var\(--[\w-]+\)$/.test(trimmed))
        return true;
    if (typeof CSS !== 'undefined' && typeof CSS.supports === 'function') {
        return CSS.supports('color', trimmed);
    }
    return /^(#[\da-f]{3,8}|transparent|currentcolor|[a-z]+|rgb\(|rgba\(|hsl\(|hsla\(|hwb\(|oklch\(|lab\(|color\()/i.test(trimmed);
}
/** A CSS-color field; a draft that is not a valid color blocks the save. An empty draft clears the field. */
function colorField(field) {
    return {
        field,
        format: value => typeof value === 'string' ? value : '',
        parse: (text) => {
            const trimmed = text.trim();
            if (trimmed === '')
                return { kind: 'clear' };
            return isValidCssColor(trimmed) ? { kind: 'set', value: trimmed } : undefined;
        },
    };
}
/** A whole-number field within [min, max] (mirrors the host schema bounds). */
function boundedNumberField(field, min, max) {
    return {
        field,
        format: value => typeof value === 'number' ? String(value) : '',
        parse: (text) => {
            const trimmed = text.trim();
            if (trimmed === '')
                return { kind: 'clear' };
            const parsed = Number(trimmed);
            if (!Number.isFinite(parsed) || !Number.isInteger(parsed))
                return undefined;
            if (parsed < min || parsed > max)
                return undefined;
            return { kind: 'set', value: parsed };
        },
    };
}
/** Bridges the 'harness-title' scope onto the card's staged form. */
export class TitleSettingsCardController {
    form;
    store;
    /** @param scope - the bound settings scope for the 'harness-title' namespace. */
    constructor(scope) {
        this.form = new CardForm(scope, [
            booleanField('enabled'),
            textField('text'),
            colorField('color'),
            colorField('backgroundColor'),
            boundedNumberField('fontSize', FONT_SIZE_MIN, FONT_SIZE_MAX),
            choiceField('position', POSITION_CHOICES),
            booleanField('workspaceEnabled'),
            choiceField('workspaceMode', WORKSPACE_MODE_CHOICES),
            textField('workspaceText'),
            boundedNumberField('workspaceFontSize', FONT_SIZE_MIN, FONT_SIZE_MAX),
            choiceField('workspacePosition', WORKSPACE_POSITION_CHOICES),
        ]);
        this.store = this.form.bind(() => this.projection());
    }
    projection() {
        return {
            ...this.form.shell(),
            enabled: this.form.field('enabled'),
            text: this.form.field('text'),
            color: this.form.field('color'),
            backgroundColor: this.form.field('backgroundColor'),
            fontSize: this.form.field('fontSize'),
            position: this.form.field('position'),
            workspaceEnabled: this.form.field('workspaceEnabled'),
            workspaceMode: this.form.field('workspaceMode'),
            workspaceText: this.form.field('workspaceText'),
            workspaceFontSize: this.form.field('workspaceFontSize'),
            workspacePosition: this.form.field('workspacePosition'),
        };
    }
    /**
     * Build the face the card's slot registration injects.
     * @returns the card's snapshot and its form actions.
     */
    inject() {
        return { hooks: { titleSettingsCard: this.store }, ...this.form.actions() };
    }
    /**
     * Release the card's scope subscription and bound stores; the slot
     * disposer calls this on teardown.
     */
    dispose() {
        this.form.dispose();
    }
}
/**
 * Render the title settings card.
 * @param props - locale copy, the card snapshot, and its form actions.
 * @returns the card.
 */
export function TitleSettingsCard(props) {
    const { t } = props;
    const state = props.useTitleSettingsCard(snapshot => snapshot);
    const disabled = !state.writable;
    const fieldProps = {
        overriddenLabel: t('settings.overridden'),
        resetLabel: t('settings.reset'),
        invalidLabel: t('settings.invalidNumber'),
        disabled,
    };
    const positionChoices = POSITION_CHOICES.map(position => ({ value: position, label: t(POSITION_LABEL_KEYS[position]) }));
    const workspacePositionChoices = WORKSPACE_POSITION_CHOICES.map(position => ({ value: position, label: t(WORKSPACE_POSITION_LABEL_KEYS[position]) }));
    const workspaceModeChoices = WORKSPACE_MODE_CHOICES.map(mode => ({ value: mode, label: t(WORKSPACE_MODE_LABEL_KEYS[mode]) }));
    return (_jsxs(PluginSettingsCard, { t: t, titleKey: "settings.title", descriptionKey: "settings.description", state: state, onSave: props.save, onDiscard: props.discard, alwaysOpen: true, children: [_jsx(BooleanField, { id: "settings-harness-title-enabled", label: t('settings.enabled'), hint: t('settings.enabledHint'), inheritLabel: t('settings.inherit'), onLabel: t('settings.on'), offLabel: t('settings.off'), ...fieldProps, ...state.enabled, onEdit: (text) => { props.edit('enabled', text); }, onReset: () => { props.resetField('enabled'); } }), _jsx(ValueField, { id: "settings-harness-title-text", label: t('settings.text'), hint: t('settings.textHint'), ...fieldProps, ...state.text, onEdit: (text) => { props.edit('text', text); }, onReset: () => { props.resetField('text'); } }), _jsx(ColorField, { id: "settings-harness-title-color", label: t('settings.color'), hint: t('settings.colorHint'), ...fieldProps, invalidLabel: t('settings.invalidColor'), ...state.color, presets: COLOR_PRESETS, customLabel: t('settings.color.custom'), presetLabel: (preset) => t(preset.labelKey), onEdit: (text) => { props.edit('color', text); }, onReset: () => { props.resetField('color'); } }), _jsx(ColorField, { id: "settings-harness-title-background", label: t('settings.backgroundColor'), hint: t('settings.backgroundColorHint'), ...fieldProps, invalidLabel: t('settings.invalidColor'), ...state.backgroundColor, presets: COLOR_PRESETS, customLabel: t('settings.color.custom'), presetLabel: (preset) => t(preset.labelKey), onEdit: (text) => { props.edit('backgroundColor', text); }, onReset: () => { props.resetField('backgroundColor'); } }), _jsx(ValueField, { id: "settings-harness-title-font-size", label: t('settings.fontSize'), hint: t('settings.fontSizeHint'), numeric: true, ...fieldProps, ...state.fontSize, onEdit: (text) => { props.edit('fontSize', text); }, onReset: () => { props.resetField('fontSize'); } }), _jsx(ChoiceField, { id: "settings-harness-title-position", label: t('settings.position'), hint: t('settings.positionHint'), inheritLabel: t('settings.inherit'), ...fieldProps, ...state.position, choices: positionChoices, onEdit: (text) => { props.edit('position', text); }, onReset: () => { props.resetField('position'); } }), _jsx(BooleanField, { id: "settings-harness-title-workspace-enabled", label: t('settings.workspaceEnabled'), hint: t('settings.workspaceEnabledHint'), inheritLabel: t('settings.inherit'), onLabel: t('settings.on'), offLabel: t('settings.off'), ...fieldProps, ...state.workspaceEnabled, onEdit: (text) => { props.edit('workspaceEnabled', text); }, onReset: () => { props.resetField('workspaceEnabled'); } }), _jsx(ChoiceField, { id: "settings-harness-title-workspace-mode", label: t('settings.workspaceMode'), hint: t('settings.workspaceModeHint'), inheritLabel: t('settings.inherit'), ...fieldProps, ...state.workspaceMode, choices: workspaceModeChoices, onEdit: (text) => { props.edit('workspaceMode', text); }, onReset: () => { props.resetField('workspaceMode'); } }), _jsx(ValueField, { id: "settings-harness-title-workspace-text", label: t('settings.workspaceText'), hint: t('settings.workspaceTextHint'), ...fieldProps, ...state.workspaceText, onEdit: (text) => { props.edit('workspaceText', text); }, onReset: () => { props.resetField('workspaceText'); } }), _jsx(ValueField, { id: "settings-harness-title-workspace-font-size", label: t('settings.workspaceFontSize'), hint: t('settings.workspaceFontSizeHint'), numeric: true, ...fieldProps, ...state.workspaceFontSize, onEdit: (text) => { props.edit('workspaceFontSize', text); }, onReset: () => { props.resetField('workspaceFontSize'); } }), _jsx(ChoiceField, { id: "settings-harness-title-workspace-position", label: t('settings.workspacePosition'), hint: t('settings.workspacePositionHint'), inheritLabel: t('settings.inherit'), ...fieldProps, ...state.workspacePosition, choices: workspacePositionChoices, onEdit: (text) => { props.edit('workspacePosition', text); }, onReset: () => { props.resetField('workspacePosition'); } })] }));
}
/** Render the title settings card as a first-level settings page. */
export function TitleSettingsSection(props) {
    const { t, useTitleSettingsCard, save, discard, edit, resetField } = props;
    return (_jsx("ul", { className: sectionCss.sectionList, children: _jsx(TitleSettingsCard, { t: t, useTitleSettingsCard: useTitleSettingsCard, save: save, discard: discard, edit: edit, resetField: resetField }) }));
}
