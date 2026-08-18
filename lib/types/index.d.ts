/**
 * harness-title host half — registers the `harness-title` settings namespace
 * so the browser half's settings card and title badge can read/write it.
 * That is the plugin's entire host footprint: the badge itself renders purely
 * on the client from the resolved settings section, and settings persist per
 * profile in ~/.dsh/settings.yaml (one file per machine → each machine names
 * its own Harness instance).
 *
 * The composition base defaults `text` to the machine hostname and
 * `workspaceText` to the host process's working-directory name, so a fresh
 * install already identifies the machine (and its workspace) out of the box;
 * the user can override either (or anything else) from the Settings page.
 * @module harness-title
 */
import { Context } from '@deepseek-ai/cordis';
/** Stable cordis plugin name (matches cordis.patch.yml insert id). */
export declare const name = "harness-title";
/** No host services required; the settings wiring is optional-service based. */
export declare const inject: string[];
/** Register the settings namespace with the machine hostname as the base text. */
export declare function apply(ctx: Context): void;
//# sourceMappingURL=index.d.ts.map