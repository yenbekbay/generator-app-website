# generator-app-website [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generator for an iOS or Android app website built with Metalsmith

Preview: [live demo](http://app-website-demo.surge.sh/).

## Installation

First, install [Yeoman](http://yeoman.io) and generator-app-website using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
$ npm install -g yo generator-app-website
```

Then generate your new project:

```bash
$ yo app-website
```

Now go to the generated directory and start the server:

```bash
$ cd <app_name>-website
$ npm start
```

At this point, you should get a working website with your provided information. The only thing left to do is to replace the logo and screenshot images in `source/img` directory.

When you're done, publish your website using surge:

```bash
$ npm run deploy
```

To add your custom domain, follow [these instructions](http://surge.sh/help/adding-a-custom-domain) (you don't need to create a CNAME file though — it was automatically generated for you).

## License

MIT © [Ayan Yenbekbay](http://yenbekbay.me)

[npm-image]: https://badge.fury.io/js/generator-app-website.svg
[npm-url]: https://npmjs.org/package/generator-app-website
[daviddm-image]: https://david-dm.org/yenbekbay/generator-app-website.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/yenbekbay/generator-app-website
