'use strict';

const autoprefixer = require('metalsmith-autoprefixer');
const cleanCSS = require('metalsmith-clean-css');
const concat = require('metalsmith-concat');
const htmlMinifier = require('metalsmith-html-minifier');
const layouts = require('metalsmith-layouts');
const less = require('metalsmith-less');
const Metalsmith = require('metalsmith');
const serve = require('metalsmith-serve');
const uglify = require('metalsmith-uglify');
const watch = require('metalsmith-watch');

const argv = require('minimist')(process.argv.slice(2));

const task = Metalsmith(__dirname)
  .metadata({
    site: require('./config')
  })
  .source('./_source')
  .destination('./_build')
  .clean(false)
  .use(layouts({
    engine: 'swig',
    directory: '_layouts'
  }))
  .use(less())
  .use(autoprefixer())
  .use(concat({
    files: [
      'normalize/normalize.css',
      'flickity/dist/flickity.min.css',
      'css/*.css'
    ],
    searchPaths: ['node_modules'],
    output: 'css/bundle.css'
  }))
  .use(cleanCSS())
  .use(concat({
    files: [
      'flickity/dist/flickity.pkgd.min.js',
      'js/*.js'
    ],
    searchPaths: ['node_modules'],
    output: 'js/bundle.js'
  }))
  .use(uglify({
    concat: 'js/bundle.js'
  }));

if (argv.serve || argv.s) {
  task
    .use(watch({
      paths: {
        '_source/**/*.md': true,
        '_source/**/*.{less,js}': '**/*',
        '_layouts/**/*': '**/*'
      }
    }))
    .use(serve())
    .build(err => {
      if (err) { throw err; }
    });
} else {
  task
    .use(htmlMinifier())
    .build(err => {
      if (err) { throw err; }
    });
}
