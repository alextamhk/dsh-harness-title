/**
 * The harness-title badge: a fixed-position name plate rendered into the
 * shell's `shell.overlay` slot (root-scoped list slot, above every column).
 *
 * Click-through discipline: the overlay layer container is pointer-events:
 * none but restores pointer events on its DIRECT children, so this badge's
 * root element must re-disable them — the badge never blocks the New Session
 * button (or anything else) underneath it.
 *
 * The badge hides itself while the settings namespace is not ready, while
 * disabled, or while the text is empty; the `above-new-session` position
 * additionally auto-hides when the frame collapses the sidebar to the rail
 * (ancestor `data-sidebar-collapsed`).
 *
 * Besides the title text the badge can render a bracketed workspace name
 * (`TITLE [workspace]`): independently switchable, with its own font size,
 * placed left / right / below the title (data-workspace-position). The
 * workspace part disappears while disabled or its name is empty.
 *
 * The workspace name follows the settings source: in `auto` mode it is the
 * current workspace's name, resolved from the root standard hooks
 * (useSessions / useWorkspaces) — the current session's owning workspace
 * title, falling back to the session cwd basename (ungrouped sessions), then
 * the most recently active workspace — and re-resolves on every store
 * update, so switching sessions or workspaces updates the badge live.
 * @module harness-title/client/TitleBadge
 */

import type { SessionListState, SettingsScopeSnapshot, SnapshotStore, WorkspaceListState } from '@deepseek-ai/dsh-client-runtime/client'
import { workspaceTitleOf } from '@deepseek-ai/dsh-client-runtime/client'
import type { InjectFace, SnapshotSelectorHook } from '@deepseek-ai/dsh-client-ui-slots'
import { TITLE_DEFAULTS, type TitleSettings } from './settings.ts'
import css from './title.module.css'

/** The injected face: the bound settings scope as a selector-hook source. */
export interface TitleBadgeInjected {
  hooks: {
    /** Live settings snapshot (status, resolved value, writability). */
    titleSettings: SnapshotStore<SettingsScopeSnapshot<TitleSettings>>
  }
}

/** Props the slot renderer binds for the badge (root-scope standard kit + injected face). */
export type TitleBadgeProps = InjectFace<TitleBadgeInjected> & {
  /** Root standard kit: live session list snapshot (current session + cwd). */
  useSessions: SnapshotSelectorHook<SessionListState>
  /** Root standard kit: live workspace list snapshot (titles + recency). */
  useWorkspaces: SnapshotSelectorHook<WorkspaceListState>
}

/**
 * Resolve the current workspace's display name from the root standard
 * snapshots. Priority: the current session's owning workspace title; the
 * current session's cwd basename (an ungrouped session); the most recently
 * active workspace's title. Returns '' when nothing resolves.
 * @param sessions - the live session list snapshot.
 * @param workspaces - the live workspace list snapshot.
 * @returns the current workspace name, or '' when absent.
 */
function currentWorkspaceTitle(sessions: SessionListState, workspaces: WorkspaceListState): string {
  const currentId = sessions.current
  if (currentId !== undefined) {
    const owner = workspaces.items.find(workspace => workspace.sessionIds.includes(currentId))
    if (owner !== undefined) return owner.title
    const cwd = sessions.byId[currentId]?.cwd
    if (cwd !== undefined && cwd !== '') return workspaceTitleOf(cwd)
  }
  const recentId = workspaces.recentWorkspaceId
  if (recentId !== undefined) {
    const recent = workspaces.items.find(workspace => workspace.workspaceId === recentId)
    if (recent !== undefined) return recent.title
  }
  return ''
}

/**
 * Render the title badge per the current settings snapshot.
 * @param props - the bound settings hook.
 * @returns the badge, or nothing when hidden.
 */
export function TitleBadge(props: TitleBadgeProps) {
  const snapshot = props.useTitleSettings(settings => settings)
  const sessions = props.useSessions(state => state)
  const workspaces = props.useWorkspaces(state => state)
  const value = snapshot.value
  if (snapshot.status !== 'ready' || value === undefined) return null
  const settings = { ...TITLE_DEFAULTS, ...value }
  const text = settings.text.trim()
  if (!settings.enabled || text === '') return null
  const workspaceText = settings.workspaceMode === 'auto'
    ? currentWorkspaceTitle(sessions, workspaces)
    : settings.workspaceText.trim()
  const showWorkspace = settings.workspaceEnabled && workspaceText !== ''
  return (
    <div
      className={css.badge}
      data-position={settings.position}
      data-workspace-position={showWorkspace ? settings.workspacePosition : undefined}
      style={{
        color: settings.color,
        backgroundColor: settings.backgroundColor,
      }}
      title={showWorkspace ? `${settings.text} [${workspaceText}]` : settings.text}
    >
      <span className={css.title} style={{ fontSize: `${settings.fontSize}px` }}>{settings.text}</span>
      {showWorkspace
        ? (
          <span className={css.workspace} style={{ fontSize: `${settings.workspaceFontSize}px` }}>
            [{workspaceText}]
          </span>
        )
        : null}
    </div>
  )
}
