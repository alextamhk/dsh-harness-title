/**
 * harness-title browser half — seats the title badge into the shell's
 * `shell.overlay` slot (frame-wide floating layer, above every column) and
 * the settings card into the first-level `settings.section` nav. Both read
 * the `harness-title` settings namespace the host half registers; edits from
 * the settings card persist to ~/.dsh/settings.yaml and re-render the badge
 * live through the shared scope.
 * @module harness-title/client
 */
import type { ClientContext, SettingsScope, SettingsScopeSpec } from '@deepseek-ai/dsh-client-runtime/client';
declare module '@deepseek-ai/cordis' {
    interface Context {
        /**
         * Optional rc.6 compatibility binder provided by dsh-web-ui-settings;
         * absent when that group plugin is not installed, so callers fall back to
         * the official settings scope.
         */
        webUiSettings?: {
            bind<S>(spec: SettingsScopeSpec<S>): SettingsScope<S>;
        };
    }
}
/** Required services (settingsScope drives both surfaces; remote forwards invalidation). */
export declare const inject: string[];
/** Re-export the badge for consumers that type against the injected face. */
export type { TitleBadgeProps } from './TitleBadge.tsx';
export type { TitleSettingsCardFace, TitleSettingsCardProps, TitleSettingsCardState, TitleSettingsSectionProps } from './TitleSettingsCard.tsx';
export type { TitlePosition, TitleSettings } from './settings.ts';
/**
 * Client plugin body: register dictionaries, seat the settings card, and
 * render the title badge over the whole frame.
 * @param ctx - client root context.
 */
export declare function apply(ctx: ClientContext): void;
//# sourceMappingURL=index.d.ts.map