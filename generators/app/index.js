'use strict';

const generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const path = require('path');
const slug = require('slug');

function makePackageName(name) {
  name = slug(name).toLowerCase();

  return name.indexOf('website-') === 0 ? name : name + '-website';
}

module.exports = generator.Base.extend({
  initializing: function() {
    this.props = {};
  },
  prompting: function() {
    const prompts = [{
      name: 'authorName',
      message: 'Your name',
      default: this.user.git.name()
    }, {
      name: 'authorUrl',
      message: 'Link to your website'
    }, {
      name: 'appName',
      message: 'Your app\'s name',
      default: path.basename(process.cwd()),
      validate: str => str.length > 0
    }, {
      name: 'appDescription',
      message: 'Your app\'s description',
      validate: str => str.length > 0
    }, {
      name: 'url',
      message: 'Link to where this website will be located',
      validate: str => str.length > 0
    }, {
      name: 'language',
      message: 'Your app\'s primary language',
      type: 'list',
      default: 'en',
      choices: [{
        name: 'English',
        value: 'en'
      }, {
        name: 'Russian',
        value: 'ru'
      }]
    }, {
      name: 'country',
      message: 'Your app\'s target country (two letter code)',
      default: 'US',
      validate: str => str.length === 2
    }, {
      name: 'appStoreId',
      message: 'Your app\'s App Store ID'
    }, {
      name: 'googlePlayId',
      message: 'Your app\'s Google Play package name'
    }, {
      name: 'twitter',
      message: 'Your app\'s Twitter username'
    }, {
      name: 'facebook',
      message: 'Your app\'s Facebook username'
    }, {
      name: 'googleAnalytics',
      message: 'Your Google Analytics tracking code (UA-XXXXXXXX-X)'
    }, {
      name: 'backgroundColor',
      message: 'Background color',
      default: '#3f4f63'
    }, {
      name: 'textColor',
      message: 'Body text color',
      default: '#ffffff'
    }, {
      name: 'accentColor',
      message: 'Accent color',
      default: '#fff5d1'
    }];

    this.log('--=[ generator-app-website ]=--');

    return this.prompt(prompts).then(props => {
      this.props = props;
      this.props.packageName = makePackageName(props.appName);
    });
  },
  default: function() {
    if (path.basename(this.destinationPath()) !== this.props.packageName) {
      mkdirp(this.props.packageName);
      this.destinationRoot(this.destinationPath(this.props.packageName));
    }

    this.composeWith('git-init', {}, {
      local: require.resolve('generator-git-init')
    });
  },
  writing: function() {
    this.fs.copy(
      this.templatePath('_layouts/**'),
      this.destinationPath('_layouts')
    );
    this.fs.copy(
      this.templatePath('_source/**'),
      this.destinationPath('_source')
    );
    this.fs.copyTpl(
      this.templatePath('_source/css/site.less'),
      this.destinationPath('_source/css/site.less'), {
        backgroundColor: this.props.backgroundColor,
        textColor: this.props.textColor,
        accentColor: this.props.accentColor
      }
    );
    const domain = this.props.url
      .match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/i);
    if (domain && domain.length > 1) {
      this.fs.write('_source/CNAME', domain[1]);
    }

    this.fs.copyTpl(
      this.templatePath('config.json'),
      this.destinationPath('config.json'), {
        title: this.props.appName,
        description: this.props.appDescription,
        url: this.props.url,
        language: this.props.language,
        country: this.props.country,
        authorName: this.props.authorName,
        authorUrl: this.props.authorUrl,
        appStoreId: this.props.appStoreId,
        googlePlayId: this.props.googlePlayId,
        twitter: this.props.twitter,
        facebook: this.props.facebook,
        googleAnalytics: this.props.googleAnalytics
      }
    );
    this.fs.copy(
      this.templatePath('gitignore'),
      this.destinationPath('.gitignore')
    );
    this.fs.copy(
      this.templatePath('index.js'),
      this.destinationPath('index.js')
    );
    this.fs.copy(
      this.templatePath('LICENSE'),
      this.destinationPath('LICENSE')
    );
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        packageName: this.props.packageName,
        authorName: this.props.authorName
      }
    );
    this.fs.copyTpl(
      this.templatePath('README.md'),
      this.destinationPath('README.md'), {
        packageName: this.props.packageName,
        appName: this.props.appName
      }
    );
  },

  install: function() {
    this.installDependencies({ bower: false });
  }
});
