/**
 * harness-title browser half — seats the title badge into the shell's
 * `shell.overlay` slot (frame-wide floating layer, above every column) and
 * the settings card into the first-level `settings.section` nav. Both read
 * the `harness-title` settings namespace the host half registers; edits from
 * the settings card persist to ~/.dsh/settings.yaml and re-render the badge
 * live through the shared scope.
 * @module harness-title/client
 */
import { TitleBadge } from "./TitleBadge.js";
import { TitleSettingsCardController, TitleSettingsSection } from "./TitleSettingsCard.js";
import { NS, en, zh } from "./locales.js";
import { TITLE_NS } from "./settings.js";
/** Required services (settingsScope drives both surfaces; remote forwards invalidation). */
export const inject = ['slots', 'locale', 'connection', 'settingsScope', 'remote'];
/**
 * Client plugin body: register dictionaries, seat the settings card, and
 * render the title badge over the whole frame.
 * @param ctx - client root context.
 */
export function apply(ctx) {
    ctx.effect(() => ctx.locale.register(NS, { zh, en }), 'harness-title: dictionaries');
    const binder = ctx.get('webUiSettings') ?? ctx.settingsScope;
    const settingsScope = binder.bind({ namespace: TITLE_NS });
    // First-level settings section: one staged form over the harness-title
    // namespace, registered as a top-level settings page.
    const card = new TitleSettingsCardController(settingsScope);
    ctx.slots.inject('settings.section', () => {
        const unregister = ctx.slots.register({
            name: 'settings.section',
            id: TITLE_NS,
            order: 150,
            label: () => ctx.locale.bind(NS)('settings.title'),
            locale: NS,
            inject: () => card.inject(),
        }, TitleSettingsSection);
        return () => {
            card.dispose();
            unregister();
        };
    });
    // The title badge: a root-scoped list entry in the frame-wide floating
    // layer, so it persists across sessions (and the no-session hero) and never
    // interferes with the UI underneath (the badge is pointer-events: none).
    ctx.slots.inject('shell.overlay', () => {
        const unregister = ctx.slots.register({
            name: 'shell.overlay',
            id: TITLE_NS,
            order: 0,
            inject: () => ({ hooks: { titleSettings: settingsScope } }),
        }, TitleBadge);
        return () => {
            unregister();
        };
    });
}
