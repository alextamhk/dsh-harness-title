import { installSettingsSection, settingsNamespace } from "@deepseek-ai/dsh-settings";
import os from "node:os";
import path from "node:path";
import z from "schemastery";
//#region src/settings.ts
/**
* Shared settings contract for the harness-title plugin (HOST side).
*
* The schemastery schema resolves the `harness-title` settings namespace the
* web settings surface edits. The browser half re-declares the TS interface
* in src/client/settings.ts (type-only imports are erased at build, so the
* client bundle never carries schemastery); keep the two field sets in sync.
* @module harness-title/settings
*/
/** Settings namespace this plugin owns (registered by the host half). */
const TITLE_NS = "harness-title";
/** Workspace-name placements relative to the title text. */
const WORKSPACE_POSITIONS = [
	"left",
	"right",
	"below"
];
/** The default placement (right of the title, like `TITLE [workspace]`). */
const WORKSPACE_POSITION_DEFAULT = "right";
/** Workspace-name sources: follow the current DSH workspace, or a fixed manual text. */
const WORKSPACE_MODES = ["auto", "manual"];
/** The default source: follow the current workspace. */
const WORKSPACE_MODE_DEFAULT = "auto";
/** Display positions; `above-new-session` is the user-approved default. */
const POSITIONS = [
	"above-new-session",
	"top-right",
	"top-left",
	"top-center"
];
/** The default position (above the New Session button, sidebar top). */
const POSITION_DEFAULT = "above-new-session";
/** Default text color (readable on the dark sidebar fill). */
const COLOR_DEFAULT = "#f0f0f0";
/**
* Default badge background. A theme token rather than `transparent`: the
* badge sits over the sidebar's wordmark row by default, and an opaque
* theme-aware chip keeps the out-of-box title readable in both themes until
* the user picks their own color (custom colors always win).
*/
const BACKGROUND_COLOR_DEFAULT = "var(--dsw-alias-bg-layer-3)";
/** Schemastery schema for the namespace (defaults resolve empty user layers). */
const TitleSettingsSchema = z.object({
	enabled: z.boolean().default(true),
	text: z.string().default(""),
	color: z.string().default(COLOR_DEFAULT),
	backgroundColor: z.string().default(BACKGROUND_COLOR_DEFAULT),
	fontSize: z.number().step(1).min(10).max(72).default(22),
	position: z.union([...POSITIONS]).default(POSITION_DEFAULT),
	workspaceEnabled: z.boolean().default(true),
	workspaceMode: z.union([...WORKSPACE_MODES]).default(WORKSPACE_MODE_DEFAULT),
	workspaceText: z.string().default(""),
	workspaceFontSize: z.number().step(1).min(10).max(72).default(20),
	workspacePosition: z.union([...WORKSPACE_POSITIONS]).default(WORKSPACE_POSITION_DEFAULT)
});
//#endregion
//#region src/index.ts
/** Stable cordis plugin name (matches cordis.patch.yml insert id). */
const name = "harness-title";
/** No host services required; the settings wiring is optional-service based. */
const inject = [];
/** Register the settings namespace with the machine hostname as the base text. */
function apply(ctx) {
	const base = {
		enabled: true,
		text: os.hostname(),
		color: COLOR_DEFAULT,
		backgroundColor: BACKGROUND_COLOR_DEFAULT,
		fontSize: 22,
		position: POSITION_DEFAULT,
		workspaceEnabled: true,
		workspaceMode: WORKSPACE_MODE_DEFAULT,
		workspaceText: path.basename(process.cwd()),
		workspaceFontSize: 20,
		workspacePosition: WORKSPACE_POSITION_DEFAULT
	};
	let current = () => base;
	installSettingsSection(ctx, settingsNamespace(TITLE_NS), TitleSettingsSchema, base, {
		setSource: (source) => {
			current = source;
		},
		onChange: () => {
			current();
		}
	});
}
//#endregion
export { apply, inject, name };
