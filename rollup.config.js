import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';
import fs from 'fs';

const extensions = [
  '.js', '.jsx', '.ts', '.tsx',
];

const packageRaw = fs.readFileSync("./package.json");
const pkg = JSON.parse(packageRaw);

const name = 'RollupTypeScriptBabel';

export default {
  input: './src/index.ts',

  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  // https://rollupjs.org/guide/en#external-e-external
  external: [...Object.keys(pkg.dependencies || {})],

  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),

    json(),
    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'], babelHelpers: 'runtime' }),
  ],

  output: [{
    file: pkg.main,
    format: 'cjs',
  }]
};