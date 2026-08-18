import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * A staged color field: a row of preset swatches plus a Custom option that
 * reveals a free-text input. Rides the same staged CardForm draft text as the
 * other controls — clicking a swatch stages that preset's value, typing in the
 * custom input stages the draft — so the save/discard semantics are identical
 * to every other field. The invalid state (unparseable color) blocks the save.
 * @module harness-title/client/ColorField
 */
import { useState } from 'react';
import cardCss from './settings-card.module.css';
import css from './color-field.module.css';
/**
 * Render a staged color field (swatches + custom input).
 * @param props - shared field props plus the preset list.
 * @returns the field.
 */
export function ColorField(props) {
    const [customOpen, setCustomOpen] = useState(false);
    const selected = props.presets.find(preset => preset.value === props.text);
    // The custom input shows while the user opened it, or while the current
    // draft is a value no preset carries (an existing custom color).
    const customActive = customOpen || (selected === undefined && props.text !== '');
    return (_jsxs("div", { className: cardCss.field, children: [_jsxs("div", { className: cardCss.head, children: [_jsx("label", { className: cardCss.label, htmlFor: props.id, children: props.label }), props.overridden
                        ? (_jsxs("span", { className: cardCss.badges, children: [_jsx("span", { className: cardCss.badge, children: props.overriddenLabel }), _jsx("button", { type: "button", className: cardCss.reset, disabled: props.disabled, onClick: props.onReset, children: props.resetLabel })] }))
                        : null] }), _jsxs("div", { className: css.swatches, children: [props.presets.map(preset => {
                        const isSelected = selected?.value === preset.value;
                        const label = props.presetLabel(preset);
                        return (_jsx("button", { type: "button", className: [
                                css.swatch,
                                preset.value === 'transparent' ? css.swatchTransparent : undefined,
                                isSelected ? css.swatchSelected : undefined,
                            ].filter(Boolean).join(' '), style: preset.value === 'transparent' ? undefined : { backgroundColor: preset.value }, title: label, "aria-label": label, "aria-pressed": isSelected, disabled: props.disabled, onClick: () => {
                                setCustomOpen(false);
                                props.onEdit(preset.value);
                            }, children: isSelected ? _jsx("span", { className: css.swatchCheck, children: "\u2713" }) : null }, preset.value));
                    }), _jsx("button", { type: "button", className: [css.swatch, css.swatchCustom, customActive ? css.swatchSelected : undefined].filter(Boolean).join(' '), title: props.customLabel, "aria-label": props.customLabel, "aria-pressed": customActive, disabled: props.disabled, onClick: () => { setCustomOpen(!customOpen); }, children: customActive ? _jsx("span", { className: css.swatchCheck, children: "\u2713" }) : _jsx("span", { className: css.customIcon, children: "\u22EF" }) })] }), customActive
                ? (_jsx("input", { id: props.id, className: props.invalid ? cardCss.inputInvalid : cardCss.input, type: "text", value: props.text, disabled: props.disabled, "aria-invalid": props.invalid || undefined, onChange: (event) => { props.onEdit(event.target.value); } }))
                : null, _jsx("p", { className: props.invalid ? cardCss.invalid : cardCss.hint, children: props.invalid ? props.invalidLabel : props.hint })] }));
}
