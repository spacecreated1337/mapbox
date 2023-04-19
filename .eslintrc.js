/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: ["plugin:vue/essential", "eslint:recommended", "@vue/eslint-config-prettier"],
    rules: {
        indent: ["error", 4, { SwitchCase: 1 }],
        "prettier/prettier": [
            "error",
            {
                tabWidth: 4,
                endOfLine: "auto",
                code: 120,
                printWidth: 120,
            },
        ],
        quotes: "off",
    },
};
