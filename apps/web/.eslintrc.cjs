module.exports = {
	root: true,
	// env: { browser: true, es2020: true },
	extends: [
		'eslint:recommended',
		'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'plugin:react-hooks/recommended'
	],
	rules: {
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'prettier/prettier': [
			'warn',
			{
				arrowParens: 'always',
				semi: false,
				trailingComma: 'none',
				tabWidth: 4,
				endOfLine: 'auto',
				useTabs: true,
				singleQuote: true,
				printWidth: 120,
				jsxSingleQuote: true,
				bracketSpacing: true,
				bracketSameLine: true
			}
		],
		'no-undef': 'off',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-var-requires': 'off'
	},
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
	settings: { react: { version: '18.2' } },
	plugins: ['react-refresh'],
	rules: {
		'react-refresh/only-export-components': ['warn', { allowConstantExport: true }]
	}
}
