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
    // These are injected here so individual imports do not cause collisons and get renamed by Rollup 
    inject({
      SheetUtils: path.resolve('src/SheetUtils.js' ),
      ScriptUtils: path.resolve('src/ScriptUtils.js'),
      executeFunctionByName: path.resolve('src/executeFunctionByName.js'),
      onFileUploadClick: path.resolve('src/onFileUploadClick.js'),
    }),
    del({ targets: 'dist/*' }),
    resolve(),
    commonjs(),
    copy({
      targets: [
        { src: 'src/uploader.html', dest: `dist/${environment}`},
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