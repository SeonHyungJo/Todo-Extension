import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import cleaner from 'rollup-plugin-cleaner';
import { uglify } from "rollup-plugin-uglify";
import htmlTemplate from 'rollup-plugin-generate-html-template';
import sass from 'rollup-plugin-sass';
import copy from 'rollup-plugin-copy';

module.exports = {
  input: 'src/templates/index.ts',
  output: {
    name: 'main',
    sourcemap: true,
    file: 'dist/bundle.js',
    format: 'cjs'
  },
  plugins: [
    typescript(),
    commonjs({
      include: 'node_modules/**'
    }),
    resolve(),
    babel({
      exclude: 'node_modules/**'
    }),
    uglify(),
    cleaner({
      targets: [
        './dist'
      ]
    }),
    htmlTemplate({
      template: 'src/index.html',
      target: 'dist/index.html',
    }),
    sass({
      output: 'dist/index.css'
    }),
    copy({
      targets: [
        { src: 'src/static/**/*', dest: 'dist' }
      ]
    })
  ],
};