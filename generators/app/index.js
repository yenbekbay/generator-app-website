'use strict';

const generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const path = require('path');
const slug = require('slug');

function makePackageName(name) {
  name = slug(name).toLowerCase();
  name = name.indexOf('website-') === 0 ? name : name + '-website';
  return name;
}

module.exports = generator.Base.extend({
  initializing: function() {
    this.props = {};
  },
  prompts: function() {
    const done = this.async();

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
      name: 'appTagline',
      message: 'Your app\'s tagline',
      validate: str => str.length > 0
    }, {
      name: 'appUrl',
      message: 'Link to where this website will be located',
      validate: str => str.length > 0
    }, {
      name: 'language',
      message: 'Your app\'s primary language',
      type: 'list',
      choices: [{
        name: 'Russian',
        value: 'ru'
      }, {
        name: 'English',
        value: 'en'
      }]
    }, {
      name: 'country',
      message: 'Your app\'s target country',
      type: 'list',
      choices: [{
        name: 'Kazakhstan',
        value: 'KZ'
      }, {
        name: 'USA',
        value: 'US'
      }]
    }, {
      name: 'appStoreId',
      message: 'Your app\'s App Store ID'
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
      message: 'Color for the website\'s background',
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

    this.prompt(prompts, props => {
      this.props = props;
      this.props.packageName = makePackageName(props.appName);
      done();
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
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'), {
        packageName: this.props.packageName,
        authorName: this.props.authorName
      }
    );
    this.fs.copyTpl(
      this.templatePath('_config.yml'),
      this.destinationPath('_config.yml'), {
        appName: this.props.appName,
        appTagline: this.props.appTagline,
        appUrl: this.props.appUrl,
        language: this.props.language,
        country: this.props.country,
        authorName: this.props.authorName,
        authorUrl: this.props.authorUrl,
        appStoreId: this.props.appStoreId,
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
      this.templatePath('source/img/**'),
      this.destinationPath('source/img')
    );
    this.fs.copy(
      this.templatePath('themes/**'),
      this.destinationPath('themes')
    );
    this.fs.copyTpl(
      this.templatePath('themes/template-1/source/css/styles.less'),
      this.destinationPath('themes/template-1/source/css/styles.less'), {
        backgroundColor: this.props.backgroundColor,
        textColor: this.props.textColor,
        accentColor: this.props.accentColor
      }
    );
    const domain = this.props.appUrl
      .match(/^(?:https?:\/\/)?(?:[^@\/\n]+@)?(?:www\.)?([^:\/\n]+)/i);
    if (domain && domain.length > 1) {
      this.fs.write('source/CNAME', domain[1]);
    }
    this.fs.write('source/index.md', '');
  },

  install: function() {
    this.installDependencies({ bower: false });
  }
});
