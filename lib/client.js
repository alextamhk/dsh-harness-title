window.__ModuleLoader__.load({
	id: "harness-title",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		let react = require("react");
		let _deepseek_ai_dsh_client_runtime_client = require("@deepseek-ai/dsh-client-runtime/client");
		//#region src/client/settings.ts
		/** Settings namespace bound by the client scope (host registers it). */
		const TITLE_NS = "harness-title";
		/** Effective display settings when the namespace is not ready yet. */
		const TITLE_DEFAULTS = {
			enabled: true,
			text: "",
			color: "#f0f0f0",
			backgroundColor: "var(--dsw-alias-bg-layer-3)",
			fontSize: 22,
			position: "above-new-session"
		};
		/** Position choices in display order (the card's select). */
		const POSITION_CHOICES = [
			"above-new-session",
			"top-right",
			"top-left",
			"top-center"
		];
		/**
		* The preset colors offered by the color fields (shared by text color
		* and background color): two theme tokens, transparency, and seven fixed
		* colors. Anything beyond these goes through the custom input.
		*/
		const COLOR_PRESETS = [
			{
				value: "var(--dsw-alias-label-primary)",
				labelKey: "settings.color.preset.themeLabel"
			},
			{
				value: "var(--dsw-alias-bg-layer-3)",
				labelKey: "settings.color.preset.themeSurface"
			},
			{
				value: "transparent",
				labelKey: "settings.color.preset.transparent"
			},
			{
				value: "#f0f0f0",
				labelKey: "settings.color.preset.nearWhite"
			},
			{
				value: "#1f1f1f",
				labelKey: "settings.color.preset.nearBlack"
			},
			{
				value: "#e5484d",
				labelKey: "settings.color.preset.red"
			},
			{
				value: "#ffd60a",
				labelKey: "settings.color.preset.yellow"
			},
			{
				value: "#86efac",
				labelKey: "settings.color.preset.lightGreen"
			},
			{
				value: "#7dd3fc",
				labelKey: "settings.color.preset.lightBlue"
			},
			{
				value: "#f9a8d4",
				labelKey: "settings.color.preset.pink"
			}
		];
		//#endregion
		//#region \0dsh-css:U:\Projects\ai\deepseek-harness\Plugin\harness-title\src\client\title.module.css.mjs
		const css$3 = ".aY1d8q_badge{pointer-events:none;user-select:none;z-index:30;box-sizing:border-box;letter-spacing:.01em;max-width:min(60vw,480px);font-weight:600;line-height:1.3;font-family:var(--dsw-alias-font-family,inherit);white-space:nowrap;text-overflow:ellipsis;text-shadow:0 1px 2px #00000059;border-radius:8px;padding:4px 10px;position:fixed;top:8px;overflow:hidden;box-shadow:0 1px 3px #0000002e}.aY1d8q_badge[data-position=above-new-session]{max-width:200px;left:12px}.aY1d8q_badge[data-position=top-right]{right:12px}.aY1d8q_badge[data-position=top-left]{left:12px}.aY1d8q_badge[data-position=top-center]{left:50%;transform:translate(-50%)}[data-sidebar-collapsed] .aY1d8q_badge[data-position=above-new-session]{display:none}";
		const tagId$3 = "harness-title/title.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$3) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "harness-title";
			tag.dataset.pluginCss = tagId$3;
			tag.textContent = css$3;
			document.head.appendChild(tag);
		}
		var title_module_css_default = { "badge": "aY1d8q_badge" };
		//#endregion
		//#region src/client/TitleBadge.tsx
		/**
		* Render the title badge per the current settings snapshot.
		* @param props - the bound settings hook.
		* @returns the badge, or nothing when hidden.
		*/
		function TitleBadge(props) {
			const snapshot = props.useTitleSettings((settings) => settings);
			const value = snapshot.value;
			if (snapshot.status !== "ready" || value === void 0) return null;
			const settings = {
				...TITLE_DEFAULTS,
				...value
			};
			const text = settings.text.trim();
			if (!settings.enabled || text === "") return null;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
				className: title_module_css_default.badge,
				"data-position": settings.position,
				style: {
					color: settings.color,
					backgroundColor: settings.backgroundColor,
					fontSize: `${settings.fontSize}px`
				},
				title: settings.text,
				children: settings.text
			});
		}
		//#endregion
		//#region \0dsh-css:U:\Projects\ai\deepseek-harness\Plugin\harness-title\src\client\settings-card.module.css.mjs
		const css$2 = ".Z0ktsa_card{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);border-radius:12px;list-style:none;transition:border-color .16s,background .16s}.Z0ktsa_card:hover{border-color:var(--dsw-alias-label-dimmed)}.Z0ktsa_cardOpen{background:var(--dsw-alias-bg-layer-2);border-color:var(--dsw-alias-label-dimmed)}.Z0ktsa_header{appearance:none;width:100%;font:inherit;color:inherit;text-align:left;cursor:pointer;background:0 0;border:0;border-radius:12px;align-items:center;gap:12px;padding:14px 16px;display:flex}.Z0ktsa_header:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:-2px}.Z0ktsa_headerStatic{border-radius:12px;align-items:center;gap:12px;width:100%;padding:14px 16px;display:flex}.Z0ktsa_headText{flex-direction:column;flex:1;gap:4px;min-width:0;display:flex}.Z0ktsa_name{color:var(--dsw-alias-label-primary);font-size:15px;font-weight:600;line-height:1.4}.Z0ktsa_description{color:var(--dsw-alias-label-tertiary);font-size:13px;line-height:1.5}.Z0ktsa_pending{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;flex:none;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.Z0ktsa_chevron{color:var(--dsw-alias-label-tertiary);flex:none;transition:transform .16s}.Z0ktsa_chevronOpen{transform:rotate(180deg)}.Z0ktsa_body{border-top:1px solid var(--dsw-alias-border-l2);margin:0 16px;padding-bottom:8px}.Z0ktsa_readOnly{color:var(--dsw-alias-label-tertiary);margin:12px 0 0;font-size:12px;line-height:1.5}.Z0ktsa_notExposed{color:var(--dsw-alias-state-warn-primary);margin:12px 0 0;font-size:12px;line-height:1.5}.Z0ktsa_footer{border-top:1px solid var(--dsw-alias-border-l2);justify-content:flex-end;align-items:center;gap:8px;padding:12px 0 4px;display:flex}.Z0ktsa_failed{min-width:0;color:var(--dsw-alias-label-error);text-overflow:ellipsis;white-space:nowrap;flex:1;margin:0;font-size:12px;line-height:1.5;overflow:hidden}.Z0ktsa_discard,.Z0ktsa_save{appearance:none;font:inherit;cursor:pointer;border:1px solid #0000;border-radius:8px;padding:5px 14px;font-size:13px;line-height:1.5}.Z0ktsa_discard{border-color:var(--dsw-alias-border-l2);color:var(--dsw-alias-label-secondary);background:0 0}.Z0ktsa_discard:hover:not(:disabled){color:var(--dsw-alias-label-primary);border-color:var(--dsw-alias-label-dimmed)}.Z0ktsa_save{background:var(--dsw-alias-label-primary);color:var(--dsw-alias-bg-layer-3)}.Z0ktsa_discard:disabled,.Z0ktsa_save:disabled{opacity:.4;cursor:default}.Z0ktsa_discard:focus-visible,.Z0ktsa_save:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:1px}.Z0ktsa_field{flex-direction:column;gap:6px;padding:12px 0;display:flex}.Z0ktsa_field+.Z0ktsa_field{border-top:1px solid var(--dsw-alias-border-l2)}.Z0ktsa_head{align-items:center;gap:8px;display:flex}.Z0ktsa_label{min-width:0;color:var(--dsw-alias-label-primary);flex:1;font-size:13px;font-weight:500;line-height:1.5}.Z0ktsa_badges{align-items:center;gap:8px;display:inline-flex}.Z0ktsa_badge{white-space:nowrap;background:var(--dsw-alias-bg-module-platform);color:var(--dsw-alias-label-secondary);border-radius:999px;padding:1px 8px;font-size:11px;font-weight:500;line-height:17px}.Z0ktsa_reset{font:inherit;color:var(--dsw-alias-label-secondary);cursor:pointer;background:0 0;border:none;padding:0;font-size:12px;line-height:1.5}.Z0ktsa_reset:hover:not(:disabled){color:var(--dsw-alias-label-primary)}.Z0ktsa_reset:disabled{cursor:default}.Z0ktsa_reset:focus-visible{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.Z0ktsa_input,.Z0ktsa_select{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.Z0ktsa_input:focus-visible,.Z0ktsa_select:focus-visible{border-color:var(--dsw-alias-brand-primary);outline:none}.Z0ktsa_input:disabled,.Z0ktsa_select:disabled{color:var(--dsw-alias-label-tertiary);cursor:default}.Z0ktsa_inputInvalid{border:1px solid var(--dsw-alias-label-error);background:var(--dsw-alias-bg-layer-3);height:34px;font:inherit;color:var(--dsw-alias-label-primary);border-radius:8px;padding:0 12px;font-size:13px;line-height:1.5}.Z0ktsa_inputInvalid:focus-visible{outline:2px solid var(--dsw-alias-label-error);outline-offset:1px;border-color:var(--dsw-alias-label-error)}.Z0ktsa_invalid{color:var(--dsw-alias-label-error);margin:0;font-size:12px;line-height:1.5}.Z0ktsa_hint{color:var(--dsw-alias-label-tertiary);margin:0;font-size:12px;line-height:1.5}@media (prefers-reduced-motion:reduce){.Z0ktsa_card,.Z0ktsa_header,.Z0ktsa_chevron,.Z0ktsa_chevronOpen,.Z0ktsa_discard,.Z0ktsa_save{transition:none}}";
		const tagId$2 = "harness-title/settings-card.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$2) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "harness-title";
			tag.dataset.pluginCss = tagId$2;
			tag.textContent = css$2;
			document.head.appendChild(tag);
		}
		var settings_card_module_css_default = {
			"badge": "Z0ktsa_badge",
			"badges": "Z0ktsa_badges",
			"body": "Z0ktsa_body",
			"card": "Z0ktsa_card",
			"cardOpen": "Z0ktsa_cardOpen",
			"chevron": "Z0ktsa_chevron",
			"chevronOpen": "Z0ktsa_chevronOpen",
			"description": "Z0ktsa_description",
			"discard": "Z0ktsa_discard",
			"failed": "Z0ktsa_failed",
			"field": "Z0ktsa_field",
			"footer": "Z0ktsa_footer",
			"head": "Z0ktsa_head",
			"headText": "Z0ktsa_headText",
			"header": "Z0ktsa_header",
			"headerStatic": "Z0ktsa_headerStatic",
			"hint": "Z0ktsa_hint",
			"input": "Z0ktsa_input",
			"inputInvalid": "Z0ktsa_inputInvalid",
			"invalid": "Z0ktsa_invalid",
			"label": "Z0ktsa_label",
			"name": "Z0ktsa_name",
			"notExposed": "Z0ktsa_notExposed",
			"pending": "Z0ktsa_pending",
			"readOnly": "Z0ktsa_readOnly",
			"reset": "Z0ktsa_reset",
			"save": "Z0ktsa_save",
			"select": "Z0ktsa_select"
		};
		//#endregion
		//#region src/client/PluginSettingsCard.tsx
		/**
		* Family-shared chrome for plugin settings cards: a disclosure header naming
		* the plugin and what its settings govern, the controls inside, and the save
		* that writes them. Renders nothing while the namespace is unavailable — a
		* deployment that does not compose the owning plugin should show no trace of
		* it. Inlined into each consumer's client bundle; mirrors the official
		* ui-plugin-config PluginCard in a self-contained slice.
		*/
		/**
		* Render one plugin settings card.
		* @param props - the plugin's copy keys, its form state, and its controls.
		* @returns the card, or nothing while the namespace is still loading.
		*/
		function PluginSettingsCard(props) {
			const [open, setOpen] = (0, react.useState)(props.defaultOpen ?? true);
			const { state, alwaysOpen } = props;
			if (!state.available) return null;
			const title = props.t(props.titleKey);
			const description = props.t(props.descriptionKey);
			const blocked = !state.dirty || state.invalid || state.saving;
			const expanded = alwaysOpen === true || open;
			const cardClass = expanded ? `${settings_card_module_css_default.cardOpen} ${settings_card_module_css_default.card}` : settings_card_module_css_default.card;
			const header = alwaysOpen === true ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.headerStatic,
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
					className: settings_card_module_css_default.headText,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.name,
						title,
						children: title
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.description,
						title: description,
						children: description
					})]
				}), state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
					className: settings_card_module_css_default.pending,
					title: props.t("settings.unsaved"),
					children: props.t("settings.unsaved")
				}) : null]
			}) : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("button", {
				type: "button",
				className: settings_card_module_css_default.header,
				"aria-expanded": open,
				"aria-label": `${props.t(open ? "settings.collapse" : "settings.expand")}: ${title}`,
				onClick: () => {
					setOpen(!open);
				},
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
						className: settings_card_module_css_default.headText,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.name,
							title,
							children: title
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
							className: settings_card_module_css_default.description,
							title: description,
							children: description
						})]
					}),
					state.dirty ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
						className: settings_card_module_css_default.pending,
						title: props.t("settings.unsaved"),
						children: props.t("settings.unsaved")
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("svg", {
						width: "14",
						height: "14",
						viewBox: "0 0 14 14",
						fill: "none",
						xmlns: "http://www.w3.org/2000/svg",
						className: open ? `${settings_card_module_css_default.chevron} ${settings_card_module_css_default.chevronOpen}` : settings_card_module_css_default.chevron,
						children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("path", {
							d: "M11.8486 5.5L11.4238 5.92383L8.69727 8.65137C8.44157 8.90706 8.21562 9.13382 8.01172 9.29785C7.79912 9.46883 7.55595 9.61756 7.25 9.66602C7.08435 9.69222 6.91565 9.69222 6.75 9.66602C6.44405 9.61756 6.20088 9.46883 5.98828 9.29785C5.78438 9.13382 5.55843 8.90706 5.30273 8.65137L2.57617 5.92383L2.15137 5.5L3 4.65137L3.42383 5.07617L6.15137 7.80273C6.42595 8.07732 6.59876 8.24849 6.74023 8.3623C6.87291 8.46904 6.92272 8.47813 6.9375 8.48047C6.97895 8.48703 7.02105 8.48703 7.0625 8.48047C7.07727 8.47813 7.12709 8.46904 7.25977 8.3623C7.40124 8.24849 7.57405 8.07732 7.84863 7.80273L10.5762 5.07617L11 4.65137L11.8486 5.5Z",
							fill: "currentColor"
						})
					})
				]
			});
			if (!state.exposed) return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: cardClass,
				children: [header, expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
					className: settings_card_module_css_default.body,
					children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.notExposed,
						role: "status",
						children: props.t("settings.notExposed")
					})
				}) : null]
			});
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("li", {
				className: cardClass,
				children: [header, expanded ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: settings_card_module_css_default.body,
					children: [
						!state.writable ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
							className: settings_card_module_css_default.readOnly,
							role: "status",
							children: props.t("settings.readOnly")
						}) : null,
						props.children,
						props.hideFooter === true ? null : /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
							className: settings_card_module_css_default.footer,
							children: [
								state.failed ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("p", {
									className: settings_card_module_css_default.failed,
									role: "status",
									children: [props.t("settings.saveFailed"), state.failedReason ? " - " + state.failedReason : ""]
								}) : null,
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: settings_card_module_css_default.discard,
									disabled: !state.dirty || state.saving,
									onClick: props.onDiscard,
									children: props.t("settings.discard")
								}),
								/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: settings_card_module_css_default.save,
									disabled: blocked,
									onClick: props.onSave,
									children: props.t(!state.saving ? "settings.save" : "settings.saving")
								})
							]
						})
					]
				}) : null]
			});
		}
		/** A staged value field. `numeric` only hints the keypad: which drafts a field accepts is decided by its spec. */
		function ValueField(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: settings_card_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), props.overridden ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: settings_card_module_css_default.badges,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.badge,
								children: props.overriddenLabel
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: settings_card_module_css_default.reset,
								disabled: props.disabled,
								onClick: props.onReset,
								children: props.resetLabel
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						id: props.id,
						className: props.invalid ? settings_card_module_css_default.inputInvalid : settings_card_module_css_default.input,
						type: "text",
						...props.numeric === true ? { inputMode: "numeric" } : {},
						...props.invalid ? { "aria-invalid": true } : {},
						value: props.text,
						placeholder: props.placeholder ?? "",
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: props.invalid ? settings_card_module_css_default.invalid : settings_card_module_css_default.hint,
						children: props.invalid ? props.invalidLabel : props.hint
					})
				]
			});
		}
		/** A staged boolean field: 继承 / 开 / 关. */
		function BooleanField(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: settings_card_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), props.overridden ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: settings_card_module_css_default.badges,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.badge,
								children: props.overriddenLabel
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: settings_card_module_css_default.reset,
								disabled: props.disabled,
								onClick: props.onReset,
								children: props.resetLabel
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
						id: props.id,
						className: settings_card_module_css_default.select,
						value: props.text,
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						},
						children: [
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "",
								children: props.inheritLabel
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "true",
								children: props.onLabel
							}),
							/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
								value: "false",
								children: props.offLabel
							})
						]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: settings_card_module_css_default.hint,
						children: props.hint
					})
				]
			});
		}
		/** A staged enumerated field rendered as a select. */
		function ChoiceField(props) {
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: settings_card_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), props.overridden ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: settings_card_module_css_default.badges,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.badge,
								children: props.overriddenLabel
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: settings_card_module_css_default.reset,
								disabled: props.disabled,
								onClick: props.onReset,
								children: props.resetLabel
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("select", {
						id: props.id,
						className: settings_card_module_css_default.select,
						value: props.text,
						disabled: props.disabled,
						onChange: (event) => {
							props.onEdit(event.target.value);
						},
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
							value: "",
							children: props.inheritLabel
						}), props.choices.map((choice) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("option", {
							value: choice.value,
							children: choice.label
						}, choice.value))]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: props.invalid ? settings_card_module_css_default.invalid : settings_card_module_css_default.hint,
						children: props.invalid ? props.invalidLabel : props.hint
					})
				]
			});
		}
		//#endregion
		//#region \0dsh-css:U:\Projects\ai\deepseek-harness\Plugin\harness-title\src\client\color-field.module.css.mjs
		const css$1 = ".ZXsSzq_swatches{flex-wrap:wrap;align-items:center;gap:8px;display:flex}.ZXsSzq_swatch{appearance:none;border:1px solid var(--dsw-alias-border-l2);cursor:pointer;background-clip:padding-box;border-radius:50%;flex:none;justify-content:center;align-items:center;width:28px;height:28px;padding:0;display:inline-flex;position:relative}.ZXsSzq_swatch:hover:not(:disabled){border-color:var(--dsw-alias-label-dimmed)}.ZXsSzq_swatch:disabled{cursor:default;opacity:.45}.ZXsSzq_swatchSelected{outline:2px solid var(--dsw-alias-brand-primary);outline-offset:2px}.ZXsSzq_swatchTransparent{background:repeating-conic-gradient(#80808059 0% 25%,#0000 0% 50%) 0 0/12px 12px}.ZXsSzq_swatchCheck{color:#fff;text-shadow:0 1px 2px #0009;font-size:13px;font-weight:700;line-height:1}.ZXsSzq_swatchCustom{background:var(--dsw-alias-bg-layer-3);border-style:dashed}.ZXsSzq_swatchCustom.ZXsSzq_swatchSelected{border-style:solid}.ZXsSzq_customIcon{color:var(--dsw-alias-label-tertiary);font-size:14px;font-weight:700;line-height:1}";
		const tagId$1 = "harness-title/color-field.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId$1) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "harness-title";
			tag.dataset.pluginCss = tagId$1;
			tag.textContent = css$1;
			document.head.appendChild(tag);
		}
		var color_field_module_css_default = {
			"customIcon": "ZXsSzq_customIcon",
			"swatch": "ZXsSzq_swatch",
			"swatchCheck": "ZXsSzq_swatchCheck",
			"swatchCustom": "ZXsSzq_swatchCustom",
			"swatchSelected": "ZXsSzq_swatchSelected",
			"swatchTransparent": "ZXsSzq_swatchTransparent",
			"swatches": "ZXsSzq_swatches"
		};
		//#endregion
		//#region src/client/ColorField.tsx
		/**
		* A staged color field: a row of preset swatches plus a Custom option that
		* reveals a free-text input. Rides the same staged CardForm draft text as the
		* other controls — clicking a swatch stages that preset's value, typing in the
		* custom input stages the draft — so the save/discard semantics are identical
		* to every other field. The invalid state (unparseable color) blocks the save.
		* @module harness-title/client/ColorField
		*/
		/**
		* Render a staged color field (swatches + custom input).
		* @param props - shared field props plus the preset list.
		* @returns the field.
		*/
		function ColorField(props) {
			const [customOpen, setCustomOpen] = (0, react.useState)(false);
			const selected = props.presets.find((preset) => preset.value === props.text);
			const customActive = customOpen || selected === void 0 && props.text !== "";
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
				className: settings_card_module_css_default.field,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: settings_card_module_css_default.head,
						children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("label", {
							className: settings_card_module_css_default.label,
							htmlFor: props.id,
							children: props.label
						}), props.overridden ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("span", {
							className: settings_card_module_css_default.badges,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: settings_card_module_css_default.badge,
								children: props.overriddenLabel
							}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: settings_card_module_css_default.reset,
								disabled: props.disabled,
								onClick: props.onReset,
								children: props.resetLabel
							})]
						}) : null]
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
						className: color_field_module_css_default.swatches,
						children: [props.presets.map((preset) => {
							const isSelected = selected?.value === preset.value;
							const label = props.presetLabel(preset);
							return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
								type: "button",
								className: [
									color_field_module_css_default.swatch,
									preset.value === "transparent" ? color_field_module_css_default.swatchTransparent : void 0,
									isSelected ? color_field_module_css_default.swatchSelected : void 0
								].filter(Boolean).join(" "),
								style: preset.value === "transparent" ? void 0 : { backgroundColor: preset.value },
								title: label,
								"aria-label": label,
								"aria-pressed": isSelected,
								disabled: props.disabled,
								onClick: () => {
									setCustomOpen(false);
									props.onEdit(preset.value);
								},
								children: isSelected ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
									className: color_field_module_css_default.swatchCheck,
									children: "✓"
								}) : null
							}, preset.value);
						}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
							type: "button",
							className: [
								color_field_module_css_default.swatch,
								color_field_module_css_default.swatchCustom,
								customActive ? color_field_module_css_default.swatchSelected : void 0
							].filter(Boolean).join(" "),
							title: props.customLabel,
							"aria-label": props.customLabel,
							"aria-pressed": customActive,
							disabled: props.disabled,
							onClick: () => {
								setCustomOpen(!customOpen);
							},
							children: customActive ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: color_field_module_css_default.swatchCheck,
								children: "✓"
							}) : /* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
								className: color_field_module_css_default.customIcon,
								children: "⋯"
							})
						})]
					}),
					customActive ? /* @__PURE__ */ (0, react_jsx_runtime.jsx)("input", {
						id: props.id,
						className: props.invalid ? settings_card_module_css_default.inputInvalid : settings_card_module_css_default.input,
						type: "text",
						value: props.text,
						disabled: props.disabled,
						"aria-invalid": props.invalid || void 0,
						onChange: (event) => {
							props.onEdit(event.target.value);
						}
					}) : null,
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: props.invalid ? settings_card_module_css_default.invalid : settings_card_module_css_default.hint,
						children: props.invalid ? props.invalidLabel : props.hint
					})
				]
			});
		}
		//#endregion
		//#region src/client/settings-form.ts
		/** A free-text field. An empty draft clears the field. */
		function textField(field) {
			return {
				field,
				format: (value) => typeof value === "string" ? value : "",
				parse: (text) => {
					const trimmed = text.trim();
					return trimmed === "" ? { kind: "clear" } : {
						kind: "set",
						value: trimmed
					};
				}
			};
		}
		/** A boolean field, edited through true/false draft text. */
		function booleanField(field) {
			return {
				field,
				format: (value) => typeof value === "boolean" ? String(value) : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					if (trimmed === "true") return {
						kind: "set",
						value: true
					};
					if (trimmed === "false") return {
						kind: "set",
						value: false
					};
				}
			};
		}
		/** An enumerated string field; only the listed choices are accepted. An empty draft clears the field. */
		function choiceField(field, choices) {
			return {
				field,
				format: (value) => typeof value === "string" && choices.includes(value) ? value : "",
				parse: (text) => {
					if (text === "") return { kind: "clear" };
					return choices.includes(text) ? {
						kind: "set",
						value: text
					} : void 0;
				}
			};
		}
		/**
		* Stages one card's edits over one settings namespace and writes them on save.
		*
		* The Host is the only authority on whether a value was accepted — its
		* validators own the constraints no schema can express — so the outcome is
		* read back from the section rather than predicted here. A save that did not
		* land keeps its drafts, so the user can correct them instead of retyping.
		*/
		var CardForm = class {
			scope;
			specs;
			staged = /* @__PURE__ */ new Map();
			listeners = /* @__PURE__ */ new Set();
			/** The scope subscription installed in the constructor; released by dispose(). */
			disposeScope;
			disposed = false;
			saving = false;
			failed = false;
			failedReason;
			/** @param scope - the bound settings scope for this card's namespace. */
			constructor(scope, specs) {
				this.scope = scope;
				this.specs = new Map(specs.map((spec) => [spec.field, spec]));
				this.disposeScope = scope.subscribe(() => {
					this.publish();
				});
			}
			/**
			* Release the scope subscription and every bound store listener. The card
			* must call this on teardown; later calls are no-ops.
			*/
			dispose() {
				if (this.disposed) return;
				this.disposed = true;
				this.disposeScope();
				this.listeners.clear();
			}
			/** Publish a projection of this form, rebuilt whenever the scope or a draft changes. */
			bind(project) {
				const store = (0, _deepseek_ai_dsh_client_runtime_client.createSnapshotStore)(project());
				this.listeners.add(() => {
					store.set(project());
				});
				return store;
			}
			/** Read the card-level state: what the Host serves, and what a save would do. */
			shell() {
				const snapshot = this.scope.getSnapshot();
				const plan = this.plan();
				return {
					available: snapshot.status !== "loading",
					exposed: snapshot.status === "ready",
					writable: snapshot.writable,
					dirty: plan.length > 0,
					invalid: plan.some((item) => item.run === void 0),
					saving: this.saving,
					failed: this.failed,
					...this.failedReason === void 0 ? {} : { failedReason: this.failedReason }
				};
			}
			/** Read one field's state from the effective section and its staged draft. */
			field(field) {
				const spec = this.specOf(field);
				const staged = this.staged.get(field);
				if (staged === void 0) return {
					text: spec.format(this.sectionValue(field)),
					overridden: this.stored(field),
					invalid: false
				};
				const write = staged.clear ? { kind: "clear" } : spec.parse(staged.text);
				return {
					text: staged.text,
					overridden: write?.kind === "set",
					invalid: write === void 0
				};
			}
			/** The actions the card's slot registration injects. */
			actions() {
				return {
					edit: (field, text) => {
						this.stage(field, {
							text,
							clear: false
						});
					},
					resetField: (field) => {
						this.stage(field, {
							text: this.specOf(field).format(this.baseValue(field)),
							clear: true
						});
					},
					save: () => {
						this.save();
					},
					discard: () => {
						if (this.staged.size === 0 && !this.failed) return;
						this.staged.clear();
						this.failed = false;
						this.failedReason = void 0;
						this.publish();
					}
				};
			}
			/**
			* Write every staged edit, then re-seed from what the Host accepted.
			*
			* When the scope carries the optional batch surface (the dsh-web-ui
			* bridge scope), every planned write rides one mutation so cross-field
			* validate hooks (baseURL+model) judge the batch as a unit instead of
			* deadlocking on per-field writes. Otherwise the per-field loop runs.
			* A field lands only when the Host reports it held the staged value; a
			* landed field's draft is dropped, a failed one stays staged for the user.
			* @returns settlement after every write and the read-back.
			*/
			async save() {
				const plan = this.plan();
				const valid = plan.filter((item) => item.run !== void 0);
				if (plan.length === 0 || this.saving || valid.length !== plan.length) return;
				const plannedWrites = valid.map((item) => item.op);
				const fields = new Set(plan.map((item) => item.field));
				this.saving = true;
				this.failed = false;
				this.failedReason = void 0;
				this.publish();
				const landed = /* @__PURE__ */ new Set();
				const batch = this.batchedScope();
				if (batch !== void 0) {
					const result = await batch.mutate(plannedWrites);
					if (result.ok) {
						for (const field of result.fields) if (field.landed) landed.add(field.field);
					} else this.failedReason = result.message;
				} else for (const item of valid) if (await item.run()) landed.add(item.field);
				for (const field of fields) if (landed.has(field)) this.staged.delete(field);
				this.saving = false;
				this.failed = landed.size !== fields.size;
				this.publish();
			}
			/** The scope's batch surface when it supports one; undefined conservatively otherwise. */
			batchedScope() {
				const candidate = this.scope;
				return typeof candidate?.mutate === "function" ? candidate : void 0;
			}
			/**
			* Every staged edit a save would write. An entry whose draft is not a value
			* its field accepts carries no write: the form is still dirty, and the save
			* refuses rather than dropping the edit. A staged edit that matches the
			* effective section is not a write at all.
			* @returns the planned writes, in the order the fields were staged.
			*/
			plan() {
				const plan = [];
				for (const [field, staged] of this.staged) {
					const spec = this.specOf(field);
					if (staged.clear) {
						if (this.stored(field)) plan.push({
							field,
							op: {
								field,
								op: "unset"
							},
							run: () => this.clear(field)
						});
						continue;
					}
					if (staged.text === spec.format(this.sectionValue(field))) continue;
					const write = spec.parse(staged.text);
					if (write === void 0) plan.push({
						field,
						op: {
							field,
							op: "unset"
						},
						run: void 0
					});
					else if (write.kind === "clear") plan.push({
						field,
						op: {
							field,
							op: "unset"
						},
						run: () => this.clear(field)
					});
					else plan.push({
						field,
						op: {
							field,
							op: "set",
							value: write.value
						},
						run: () => this.store(field, write.value)
					});
				}
				return plan;
			}
			async clear(field) {
				await this.scope.unset(field);
				return !this.stored(field);
			}
			async store(field, value) {
				await this.scope.set(field, value);
				if (this.specOf(field).secret) return true;
				return this.userLayer()?.[field] === value;
			}
			stage(field, edit) {
				this.staged.set(field, edit);
				this.failed = false;
				this.failedReason = void 0;
				this.publish();
			}
			specOf(field) {
				const spec = this.specs.get(field);
				if (spec === void 0) throw new Error(`settings card has no field ${field}`);
				return spec;
			}
			snapshotOf() {
				return this.scope.getSnapshot();
			}
			sectionValue(field) {
				return this.snapshotOf().value?.[field];
			}
			baseValue(field) {
				return this.snapshotOf().base?.[field];
			}
			userLayer() {
				return this.snapshotOf().user;
			}
			stored(field) {
				const user = this.userLayer();
				return user !== void 0 && Object.hasOwn(user, field);
			}
			publish() {
				for (const listener of this.listeners) listener();
			}
		};
		//#endregion
		//#region \0dsh-css:U:\Projects\ai\deepseek-harness\Plugin\harness-title\src\client\settings-section.module.css.mjs
		const css = ".r9QVWW_sectionList{margin:0;padding:0;list-style:none}";
		const tagId = "harness-title/settings-section.module.css";
		if (typeof document !== "undefined" && document.querySelector("style[data-plugin-css=" + JSON.stringify(tagId) + "]") === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "harness-title";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var settings_section_module_css_default = { "sectionList": "r9QVWW_sectionList" };
		//#endregion
		//#region src/client/TitleSettingsCard.tsx
		/** Locale key of each position's label (re-read per render, so a locale switch refreshes it). */
		const POSITION_LABEL_KEYS = {
			"above-new-session": "settings.position.aboveNewSession",
			"top-right": "settings.position.topRight",
			"top-left": "settings.position.topLeft",
			"top-center": "settings.position.topCenter"
		};
		/** Whether a draft is a usable CSS color (hex, named, functional, or a --dsw-* token). */
		function isValidCssColor(value) {
			const trimmed = value.trim();
			if (trimmed === "") return false;
			if (/^var\(--[\w-]+\)$/.test(trimmed)) return true;
			if (typeof CSS !== "undefined" && typeof CSS.supports === "function") return CSS.supports("color", trimmed);
			return /^(#[\da-f]{3,8}|transparent|currentcolor|[a-z]+|rgb\(|rgba\(|hsl\(|hsla\(|hwb\(|oklch\(|lab\(|color\()/i.test(trimmed);
		}
		/** A CSS-color field; a draft that is not a valid color blocks the save. An empty draft clears the field. */
		function colorField(field) {
			return {
				field,
				format: (value) => typeof value === "string" ? value : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					return isValidCssColor(trimmed) ? {
						kind: "set",
						value: trimmed
					} : void 0;
				}
			};
		}
		/** A whole-number field within [min, max] (mirrors the host schema bounds). */
		function boundedNumberField(field, min, max) {
			return {
				field,
				format: (value) => typeof value === "number" ? String(value) : "",
				parse: (text) => {
					const trimmed = text.trim();
					if (trimmed === "") return { kind: "clear" };
					const parsed = Number(trimmed);
					if (!Number.isFinite(parsed) || !Number.isInteger(parsed)) return void 0;
					if (parsed < min || parsed > max) return void 0;
					return {
						kind: "set",
						value: parsed
					};
				}
			};
		}
		/** Bridges the 'harness-title' scope onto the card's staged form. */
		var TitleSettingsCardController = class {
			form;
			store;
			/** @param scope - the bound settings scope for the 'harness-title' namespace. */
			constructor(scope) {
				this.form = new CardForm(scope, [
					booleanField("enabled"),
					textField("text"),
					colorField("color"),
					colorField("backgroundColor"),
					boundedNumberField("fontSize", 10, 72),
					choiceField("position", POSITION_CHOICES)
				]);
				this.store = this.form.bind(() => this.projection());
			}
			projection() {
				return {
					...this.form.shell(),
					enabled: this.form.field("enabled"),
					text: this.form.field("text"),
					color: this.form.field("color"),
					backgroundColor: this.form.field("backgroundColor"),
					fontSize: this.form.field("fontSize"),
					position: this.form.field("position")
				};
			}
			/**
			* Build the face the card's slot registration injects.
			* @returns the card's snapshot and its form actions.
			*/
			inject() {
				return {
					hooks: { titleSettingsCard: this.store },
					...this.form.actions()
				};
			}
			/**
			* Release the card's scope subscription and bound stores; the slot
			* disposer calls this on teardown.
			*/
			dispose() {
				this.form.dispose();
			}
		};
		/**
		* Render the title settings card.
		* @param props - locale copy, the card snapshot, and its form actions.
		* @returns the card.
		*/
		function TitleSettingsCard(props) {
			const { t } = props;
			const state = props.useTitleSettingsCard((snapshot) => snapshot);
			const disabled = !state.writable;
			const fieldProps = {
				overriddenLabel: t("settings.overridden"),
				resetLabel: t("settings.reset"),
				invalidLabel: t("settings.invalidNumber"),
				disabled
			};
			const positionChoices = POSITION_CHOICES.map((position) => ({
				value: position,
				label: t(POSITION_LABEL_KEYS[position])
			}));
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)(PluginSettingsCard, {
				t,
				titleKey: "settings.title",
				descriptionKey: "settings.description",
				state,
				onSave: props.save,
				onDiscard: props.discard,
				alwaysOpen: true,
				children: [
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(BooleanField, {
						id: "settings-harness-title-enabled",
						label: t("settings.enabled"),
						hint: t("settings.enabledHint"),
						inheritLabel: t("settings.inherit"),
						onLabel: t("settings.on"),
						offLabel: t("settings.off"),
						...fieldProps,
						...state.enabled,
						onEdit: (text) => {
							props.edit("enabled", text);
						},
						onReset: () => {
							props.resetField("enabled");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-harness-title-text",
						label: t("settings.text"),
						hint: t("settings.textHint"),
						...fieldProps,
						...state.text,
						onEdit: (text) => {
							props.edit("text", text);
						},
						onReset: () => {
							props.resetField("text");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorField, {
						id: "settings-harness-title-color",
						label: t("settings.color"),
						hint: t("settings.colorHint"),
						...fieldProps,
						invalidLabel: t("settings.invalidColor"),
						...state.color,
						presets: COLOR_PRESETS,
						customLabel: t("settings.color.custom"),
						presetLabel: (preset) => t(preset.labelKey),
						onEdit: (text) => {
							props.edit("color", text);
						},
						onReset: () => {
							props.resetField("color");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ColorField, {
						id: "settings-harness-title-background",
						label: t("settings.backgroundColor"),
						hint: t("settings.backgroundColorHint"),
						...fieldProps,
						invalidLabel: t("settings.invalidColor"),
						...state.backgroundColor,
						presets: COLOR_PRESETS,
						customLabel: t("settings.color.custom"),
						presetLabel: (preset) => t(preset.labelKey),
						onEdit: (text) => {
							props.edit("backgroundColor", text);
						},
						onReset: () => {
							props.resetField("backgroundColor");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ValueField, {
						id: "settings-harness-title-font-size",
						label: t("settings.fontSize"),
						hint: t("settings.fontSizeHint"),
						numeric: true,
						...fieldProps,
						...state.fontSize,
						onEdit: (text) => {
							props.edit("fontSize", text);
						},
						onReset: () => {
							props.resetField("fontSize");
						}
					}),
					/* @__PURE__ */ (0, react_jsx_runtime.jsx)(ChoiceField, {
						id: "settings-harness-title-position",
						label: t("settings.position"),
						hint: t("settings.positionHint"),
						inheritLabel: t("settings.inherit"),
						...fieldProps,
						...state.position,
						choices: positionChoices,
						onEdit: (text) => {
							props.edit("position", text);
						},
						onReset: () => {
							props.resetField("position");
						}
					})
				]
			});
		}
		/** Render the title settings card as a first-level settings page. */
		function TitleSettingsSection(props) {
			const { t, useTitleSettingsCard, save, discard, edit, resetField } = props;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsx)("ul", {
				className: settings_section_module_css_default.sectionList,
				children: /* @__PURE__ */ (0, react_jsx_runtime.jsx)(TitleSettingsCard, {
					t,
					useTitleSettingsCard,
					save,
					discard,
					edit,
					resetField
				})
			});
		}
		//#endregion
		//#region src/client/locales.ts
		/**
		* harness-title locale dictionaries (zh/en).
		* @module harness-title/client/locales
		*/
		/** Dictionary namespace this package registers. */
		const NS = "harness-title";
		/** Chinese copy. */
		const zh = {
			"settings.title": "Harness 標題",
			"settings.description": "在畫面上顯示大字標題，用於識別目前正在使用哪一台機器的 Harness。",
			"settings.enabled": "啟用標題",
			"settings.enabledHint": "關閉後標題隱藏；可隨時在此重新啟用。",
			"settings.text": "標題文字",
			"settings.textHint": "留空則不顯示。預設為本機 hostname（未覆寫時）。",
			"settings.color": "文字顏色",
			"settings.colorHint": "從十款預設色中選擇，或點「自訂」輸入任意 CSS 色值（如 rgb(255 255 255)）。",
			"settings.backgroundColor": "背景色",
			"settings.backgroundColorHint": "從十款預設色中選擇，或點「自訂」輸入任意 CSS 色值或主題變數；transparent 為無背景。",
			"settings.color.custom": "自訂…",
			"settings.color.preset.themeLabel": "主題文字色",
			"settings.color.preset.themeSurface": "主題底色",
			"settings.color.preset.transparent": "透明",
			"settings.color.preset.nearWhite": "近白",
			"settings.color.preset.nearBlack": "近黑",
			"settings.color.preset.red": "紅",
			"settings.color.preset.yellow": "黃",
			"settings.color.preset.lightGreen": "淺綠",
			"settings.color.preset.lightBlue": "淺藍",
			"settings.color.preset.pink": "粉紅",
			"settings.fontSize": "字體大小（px）",
			"settings.fontSizeHint": "範圍 10–72。",
			"settings.position": "顯示位置",
			"settings.positionHint": "預設在 New Session 按鈕上方；側欄收起成 rail 時該位置會自動隱藏。",
			"settings.position.aboveNewSession": "New Session 按鈕上方",
			"settings.position.topRight": "右上角",
			"settings.position.topLeft": "左上角",
			"settings.position.topCenter": "頂部居中",
			"settings.inherit": "繼承",
			"settings.on": "開",
			"settings.off": "關",
			"settings.overridden": "已覆寫",
			"settings.reset": "恢復預設",
			"settings.notExposed": "目前 DSH 版本未向設定頁暴露本插件的設定命名空間，表單不可用。可直接編輯 ~/.dsh/settings.yaml 的 harness-title: 區段，或為 dsh-host-apiproxy 的 WEB_SETTINGS_NAMESPACES 白名單補充本命名空間後重啟。",
			"settings.readOnly": "目前部署的設定為唯讀。",
			"settings.expand": "展開設定",
			"settings.collapse": "收起設定",
			"settings.save": "儲存",
			"settings.saving": "儲存中…",
			"settings.discard": "放棄",
			"settings.unsaved": "未儲存",
			"settings.saveFailed": "部署未接受這些值，已保留供你修改。",
			"settings.invalidNumber": "請輸入數字，留空則使用預設值。",
			"settings.invalidColor": "請輸入有效的 CSS 色值（如 #f0f0f0），留空則使用預設值。"
		};
		/** English copy. */
		const en = {
			"settings.title": "Harness Title",
			"settings.description": "Shows a large title on the GUI so you can tell which machine’s Harness instance you are using.",
			"settings.enabled": "Enable the title",
			"settings.enabledHint": "When off, the title hides; re-enable it here.",
			"settings.text": "Title text",
			"settings.textHint": "Leave empty to hide. Defaults to this machine’s hostname (until overridden).",
			"settings.color": "Text color",
			"settings.colorHint": "Pick one of ten preset colors, or choose Custom to enter any CSS color value (e.g. rgb(255 255 255)).",
			"settings.backgroundColor": "Background color",
			"settings.backgroundColorHint": "Pick one of ten preset colors, or choose Custom to enter any CSS color value or theme token; transparent disables the background.",
			"settings.color.custom": "Custom…",
			"settings.color.preset.themeLabel": "Theme text",
			"settings.color.preset.themeSurface": "Theme surface",
			"settings.color.preset.transparent": "Transparent",
			"settings.color.preset.nearWhite": "Near white",
			"settings.color.preset.nearBlack": "Near black",
			"settings.color.preset.red": "Red",
			"settings.color.preset.yellow": "Yellow",
			"settings.color.preset.lightGreen": "Light green",
			"settings.color.preset.lightBlue": "Light blue",
			"settings.color.preset.pink": "Pink",
			"settings.fontSize": "Font size (px)",
			"settings.fontSizeHint": "Range 10–72.",
			"settings.position": "Position",
			"settings.positionHint": "Above the New Session button by default; that position auto-hides while the sidebar is collapsed to the rail.",
			"settings.position.aboveNewSession": "Above the New Session button",
			"settings.position.topRight": "Top right",
			"settings.position.topLeft": "Top left",
			"settings.position.topCenter": "Top center",
			"settings.inherit": "Inherit",
			"settings.on": "On",
			"settings.off": "Off",
			"settings.overridden": "Overridden",
			"settings.reset": "Reset to default",
			"settings.notExposed": "This DSH version does not expose this plugin’s settings namespace to the configuration page, so the form is unavailable. Edit the harness-title: section of ~/.dsh/settings.yaml directly, or add the namespace to dsh-host-apiproxy’s WEB_SETTINGS_NAMESPACES allowlist and restart.",
			"settings.readOnly": "This deployment stores settings read-only.",
			"settings.expand": "Show settings",
			"settings.collapse": "Hide settings",
			"settings.save": "Save",
			"settings.saving": "Saving…",
			"settings.discard": "Discard",
			"settings.unsaved": "Unsaved",
			"settings.saveFailed": "The deployment did not accept these values; they were left for you to correct.",
			"settings.invalidNumber": "Enter a number, or leave blank to use the default.",
			"settings.invalidColor": "Enter a valid CSS color (e.g. #f0f0f0), or leave blank to use the default."
		};
		//#endregion
		//#region src/client/index.ts
		/** Required services (settingsScope drives both surfaces; remote forwards invalidation). */
		const inject = [
			"slots",
			"locale",
			"connection",
			"settingsScope",
			"remote"
		];
		/**
		* Client plugin body: register dictionaries, seat the settings card, and
		* render the title badge over the whole frame.
		* @param ctx - client root context.
		*/
		function apply(ctx) {
			ctx.effect(() => ctx.locale.register(NS, {
				zh,
				en
			}), "harness-title: dictionaries");
			const settingsScope = (ctx.get("webUiSettings") ?? ctx.settingsScope).bind({ namespace: TITLE_NS });
			const card = new TitleSettingsCardController(settingsScope);
			ctx.slots.inject("settings.section", () => {
				const unregister = ctx.slots.register({
					name: "settings.section",
					id: TITLE_NS,
					order: 150,
					label: () => ctx.locale.bind(NS)("settings.title"),
					locale: NS,
					inject: () => card.inject()
				}, TitleSettingsSection);
				return () => {
					card.dispose();
					unregister();
				};
			});
			ctx.slots.inject("shell.overlay", () => {
				const unregister = ctx.slots.register({
					name: "shell.overlay",
					id: TITLE_NS,
					order: 0,
					inject: () => ({ hooks: { titleSettings: settingsScope } })
				}, TitleBadge);
				return () => {
					unregister();
				};
			});
		}
		//#endregion
		exports.apply = apply;
		exports.inject = inject;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map