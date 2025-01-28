import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import copy from 'rollup-plugin-copy';
import strip from '@rollup/plugin-strip';
import del from "rollup-plugin-delete";
import inject from '@rollup/plugin-inject';
import path from 'path';

const environment = process.env.NODE_ENV || 'dev'; 
console.log('[rollup.config.js] environment:', environment);
const isProduction = (environment == 'prod');

export default {
  input: 'src/code.js',
  output: {
    dir: `dist/${environment}`,
    format: 'cjs',
    sourcemap: false,
    name: 'global',
    extend: true,
    entryFileNames: '[name].gs',
  },
  treeshake: false,
  plugins: [
    // Inject files imported into multiple files here so individual imports do not cause collisons and get renamed by Rollup 
    // Example: { NameForInjectedClass: path.resolve('src/ExampleClassToInject.js'), }
    // Uncomment `inject()` to use it. It will error if you don't provide it with a valid param
    // inject(),
    // Delete anything currently in the dist folder
    del({ targets: 'dist/*' }),
    resolve(),
    commonjs(),
    // Add files here that you don't want rollup to touch, like JSON or HTML
    copy({
      targets: [
        { src: 'appsscript.json', dest: `dist/${environment}` },
        { src: '.clasp.json', dest: `dist/${environment}` },
      ]
    }),
    isProduction && strip({
      functions: ['console.log'],
    })
  ],
  onwarn(warning, warn) {
    if (warning.code === 'EMPTY_BUNDLE') {
      console.error(`No output will be generated because the bundle is empty: ${warning.message}`);
    } else {
      warn(warning);
    }
  }
};