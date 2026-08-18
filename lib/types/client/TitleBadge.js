import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { workspaceTitleOf } from '@deepseek-ai/dsh-client-runtime/client';
import { TITLE_DEFAULTS } from "./settings.js";
import css from './title.module.css';
/**
 * Resolve the current workspace's display name from the root standard
 * snapshots. Priority: the current session's owning workspace title; the
 * current session's cwd basename (an ungrouped session); the most recently
 * active workspace's title. Returns '' when nothing resolves.
 * @param sessions - the live session list snapshot.
 * @param workspaces - the live workspace list snapshot.
 * @returns the current workspace name, or '' when absent.
 */
function currentWorkspaceTitle(sessions, workspaces) {
    const currentId = sessions.current;
    if (currentId !== undefined) {
        const owner = workspaces.items.find(workspace => workspace.sessionIds.includes(currentId));
        if (owner !== undefined)
            return owner.title;
        const cwd = sessions.byId[currentId]?.cwd;
        if (cwd !== undefined && cwd !== '')
            return workspaceTitleOf(cwd);
    }
    const recentId = workspaces.recentWorkspaceId;
    if (recentId !== undefined) {
        const recent = workspaces.items.find(workspace => workspace.workspaceId === recentId);
        if (recent !== undefined)
            return recent.title;
    }
    return '';
}
/**
 * Render the title badge per the current settings snapshot.
 * @param props - the bound settings hook.
 * @returns the badge, or nothing when hidden.
 */
export function TitleBadge(props) {
    const snapshot = props.useTitleSettings(settings => settings);
    const sessions = props.useSessions(state => state);
    const workspaces = props.useWorkspaces(state => state);
    const value = snapshot.value;
    if (snapshot.status !== 'ready' || value === undefined)
        return null;
    const settings = { ...TITLE_DEFAULTS, ...value };
    const text = settings.text.trim();
    if (!settings.enabled || text === '')
        return null;
    const workspaceText = settings.workspaceMode === 'auto'
        ? currentWorkspaceTitle(sessions, workspaces)
        : settings.workspaceText.trim();
    const showWorkspace = settings.workspaceEnabled && workspaceText !== '';
    return (_jsxs("div", { className: css.badge, "data-position": settings.position, "data-workspace-position": showWorkspace ? settings.workspacePosition : undefined, style: {
            color: settings.color,
            backgroundColor: settings.backgroundColor,
        }, title: showWorkspace ? `${settings.text} [${workspaceText}]` : settings.text, children: [_jsx("span", { className: css.title, style: { fontSize: `${settings.fontSize}px` }, children: settings.text }), showWorkspace
                ? (_jsxs("span", { className: css.workspace, style: { fontSize: `${settings.workspaceFontSize}px` }, children: ["[", workspaceText, "]"] }))
                : null] }));
}
