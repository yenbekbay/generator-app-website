# generator-app-website [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]
> Generator for an iOS app website built with hexo

## Installation

First, install [Yeoman](http://yeoman.io), generator-app-website, [hexo](https://hexo.io/), and [surge](http://surge.sh/) using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)):

```bash
$ npm install -g yo generator-app-website hexo surge
```

Then generate your new project:

```bash
$ yo app-website
```

Now go to the generated directory and start the server:

```bash
$ cd <app_name>-website
$ hexo server
```

At this point, you should get a working website with your provided information. The only thing left to do is to replace the logo and screenshot images in `source/img` directory.

When you're done, publish your website using surge:

```bash
$ surge ./public
```

To add your custom domain, follow [these instructions](http://surge.sh/help/adding-a-custom-domain) (you don't need to create a CNAME file though — it was automatically generated for you).

## License

MIT © [Ayan Yenbekbay](http://yenbekbay.me)

[npm-image]: https://badge.fury.io/js/generator-app-website.svg
[npm-url]: https://npmjs.org/package/generator-app-website
[daviddm-image]: https://david-dm.org/n17r/generator-app-website.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/n17r/generator-app-website
