import { defineConfig } from "eslint/config";
import stylisticEslintPluginJs from "@stylistic/eslint-plugin-js";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
	baseDirectory: __dirname,
	recommendedConfig: js.configs.recommended,
	allConfig: js.configs.all,
});

export default defineConfig([
	{
		extends: compat.extends("eslint:recommended"),

		plugins: { "@stylistic/js": stylisticEslintPluginJs },

		languageOptions: {
			globals: { ...globals.browser },

			ecmaVersion: "latest",
			sourceType: "module",
		},

		rules: {
			indent: ["error", "tab", { SwitchCase: 1 }],
			quotes: ["error", "double"],
			semi: ["error", "always"],
			"linebreak-style": ["error", "windows"],
			"no-undef": "off",
			"func-names": "warn",
			"consistent-return": "off",
			"no-console": "off",
			"@stylistic/js/indent": ["error", "tab"],
			"@stylistic/js/semi": [2, "always"],
			"@stylistic/js/quotes": ["error", "double"],
			"@stylistic/js/multiline-ternary": ["error", "never"],
			"@stylistic/js/space-before-function-paren": [
				"error",
				{ anonymous: "always", named: "never", asyncArrow: "always" },
			],
		},
	},
]);
