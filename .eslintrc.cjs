module.exports = {
    "root": true,
    "env": {
        "es2021": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:jsonc/auto-config",
        "plugin:markdown/recommended",
        "plugin:security/recommended",
        "plugin:sonarjs/recommended",
        "plugin:unicorn/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "tsconfigRootDir": __dirname,
        "project": ["./tsconfig.json"],
        "ecmaVersion": 2021,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    },
    "plugins": [
            "@typescript-eslint"
    ],
    "rules": {
        "arrow-parens": ["error", "as-needed"],
        "block-spacing": ["error", "never"],
        "brace-style": "off",
        "curly": "off",
        "complexity": "off",
        "eol-last": ["error", "always"],
        "eqeqeq": "warn",
        "func-call-spacing": ["error", "never"],
        "handle-callback-err": "off",
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "MemberExpression": "off",
            "flatTernaryExpressions": true
        }],
        "key-spacing": "off",
        "multiline-ternary": "off",
        "no-case-declarations": "off",
        "no-console": "off",
        "no-mixed-spaces-and-tabs": ["error", "smart-tabs"],
        "no-multi-spaces": "off",
        "no-prototype-builtins": "off",
        "no-return-assign": "off",
        "no-self-assign": "off",
        "no-tabs": "off",
        "no-undef": "warn",
        "no-unused-expressions": "warn",
        "no-unused-vars": "off",
        "one-var": "off",
        "quote-props": ["error", "consistent"],
        "quotes": ["error", "double", {
            "allowTemplateLiterals": true
        }],
        "prefer-spread": "off",
        "semi-spacing": ["error", {
            "before": false,
            "after": true
        }],
        "semi-style": ["error", "last"],
        "semi": ["error", "always", {
            "omitLastInOneLineBlock": true
        }],
        "space-before-function-paren": ["off"],
        "@typescript-eslint/ban-ts-comment": "off",
        "@typescript-eslint/no-extra-semi": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/no-inferrable-types": "off",
        "@typescript-eslint/no-non-null-assertion": "off",
        "@typescript-eslint/no-empty-interface": "off",
        "@typescript-eslint/no-namespace": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/consistent-type-imports": "error",
        "@typescript-eslint/no-unused-vars": ["error"],
        "unicorn/prevent-abbreviations": ["warn", {
            "ignore": [
                /entry\.dev$/
            ]
        }],
        "unicorn/filename-case": ["error", {
            "case": "camelCase"
        }],
        "unicorn/prefer-top-level-await": "off",
        "unicorn/text-encoding-identifier-case": "off",
        "sonarjs/cognitive-complexity": "off"
    },
};
