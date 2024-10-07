module.exports = {
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 2020,
		project: 'tsconfig.json',
		tsconfigRootDir: __dirname,
		sourceType: 'module'
	},
	plugins: ['@typescript-eslint/eslint-plugin', 'prettier'],
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'eslint-config-prettier',
		'prettier'
	],
	root: true,
	env: {
		node: true,
		jest: true
	},
	ignorePatterns: ['.eslintrc.js'],
	rules: {
		'@typescript-eslint/interface-name-prefix': 'off',
		'@typescript-eslint/explicit-function-return-type': 'off',
		'@typescript-eslint/explicit-module-boundary-types': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
		'@typescript-eslint/no-unused-vars': 'none',
		'@typescript-eslint/no-inferrable-types': 'off',
		'@typescript-eslint/no-var-requires': 'off',
		'no-undef': 'off',
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
				printWidth: 80,
				jsxSingleQuote: true,
				bracketSpacing: true,
				bracketSameLine: true
			}
		]
	}
}