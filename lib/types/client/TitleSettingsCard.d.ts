/**
 * The harness-title settings card: title text, colors, font size, position
 * and master switch, bound to the `harness-title` settings namespace the host
 * plugin registers. Rendered as an always-open first-level settings page; the
 * section wrapper mounts it as the content of the top-level
 * 'settings.section' nav entry (order 150 — clear of the family plugins).
 * @module harness-title/client/TitleSettingsCard
 */
import type { ReactNode } from 'react';
import type { InjectFace, PropsLocale, PropsRuntime } from '@deepseek-ai/dsh-client-ui-slots';
import type { SettingsScope, SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client';
import { type CardActions, type CardShell, type FieldState as CardFieldState } from './settings-form.ts';
import { type TitleSettings } from './settings.ts';
/** The namespace's fields this card edits. */
export type { TitleSettings };
/** What the title settings card renders. */
export interface TitleSettingsCardState extends CardShell {
    /** Master switch. */
    enabled: CardFieldState;
    /** Title text. */
    text: CardFieldState;
    /** Text color. */
    color: CardFieldState;
    /** Badge background color. */
    backgroundColor: CardFieldState;
    /** Font size px. */
    fontSize: CardFieldState;
    /** Display position. */
    position: CardFieldState;
    /** Workspace-name switch. */
    workspaceEnabled: CardFieldState;
    /** Workspace-name source (auto / manual). */
    workspaceMode: CardFieldState;
    /** Workspace name text. */
    workspaceText: CardFieldState;
    /** Workspace-name font size px. */
    workspaceFontSize: CardFieldState;
    /** Workspace-name placement (left / right / below the title). */
    workspacePosition: CardFieldState;
}
/** The registration-side face the card's slot entry injects. */
export interface TitleSettingsCardFace extends CardActions {
    hooks: {
        /** Card snapshot bound by the renderer as useTitleSettingsCard. */
        titleSettingsCard: SnapshotStore<TitleSettingsCardState>;
    };
}
/** Bridges the 'harness-title' scope onto the card's staged form. */
export declare class TitleSettingsCardController {
    private readonly form;
    private readonly store;
    /** @param scope - the bound settings scope for the 'harness-title' namespace. */
    constructor(scope: SettingsScope<TitleSettings>);
    private projection;
    /**
     * Build the face the card's slot registration injects.
     * @returns the card's snapshot and its form actions.
     */
    inject(): TitleSettingsCardFace;
    /**
     * Release the card's scope subscription and bound stores; the slot
     * disposer calls this on teardown.
     */
    dispose(): void;
}
/** Props the renderer binds for the title settings card. */
export type TitleSettingsCardProps = PropsLocale<'harness-title'> & InjectFace<TitleSettingsCardFace>;
/**
 * Render the title settings card.
 * @param props - locale copy, the card snapshot, and its form actions.
 * @returns the card.
 */
export declare function TitleSettingsCard(props: TitleSettingsCardProps): import("react").JSX.Element;
/** Props the settings section binds for the title card page. */
export type TitleSettingsSectionProps = PropsRuntime<'settings.section'> & PropsLocale<'harness-title'> & InjectFace<TitleSettingsCardFace>;
/** Render the title settings card as a first-level settings page. */
export declare function TitleSettingsSection(props: TitleSettingsSectionProps): ReactNode;
//# sourceMappingURL=TitleSettingsCard.d.ts.map