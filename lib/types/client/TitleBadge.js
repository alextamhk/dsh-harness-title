import { jsx as _jsx } from "react/jsx-runtime";
import { TITLE_DEFAULTS } from "./settings.js";
import css from './title.module.css';
/**
 * Render the title badge per the current settings snapshot.
 * @param props - the bound settings hook.
 * @returns the badge, or nothing when hidden.
 */
export function TitleBadge(props) {
    const snapshot = props.useTitleSettings(settings => settings);
    const value = snapshot.value;
    if (snapshot.status !== 'ready' || value === undefined)
        return null;
    const settings = { ...TITLE_DEFAULTS, ...value };
    const text = settings.text.trim();
    if (!settings.enabled || text === '')
        return null;
    return (_jsx("div", { className: css.badge, "data-position": settings.position, style: {
            color: settings.color,
            backgroundColor: settings.backgroundColor,
            fontSize: `${settings.fontSize}px`,
        }, title: settings.text, children: settings.text }));
}
