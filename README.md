### Designs:
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
[![All Contributors](https://img.shields.io/badge/all_contributors-24-orange.svg?style=flat-square)](#contributors-)
<!-- ALL-CONTRIBUTORS-BADGE:END -->
1. https://www.figma.com/file/0SyY1BtTeON6Zp1QoyLecT/kottans_site_v1.2?node-id=0%3A2
2. https://www.figma.com/file/JfoY8Yf8PwlcN0c2jzRfHH/kottans-mob-v0.1?node-id=0%3A2


# How to use


Clone this repo and then in command line type:

* `npm install` or `yarn` - install all dependencies
* `gulp` - run dev-server and let magic happen, or
* `gulp build` - build project from sources

--

## List of Gulp tasks

To run separate task type in command line `gulp [task_name]`.
Almost all tasks also have watch mode - `gulp [task_name]:watch`, but you don't need to use it directly.

### Main tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files, run server with livereload
`build:dev`        | build dev version of project (without code optimizations)
`build`            | build production-ready project (with code optimizations)

### Other tasks
Task name          | Description                                                      
:------------------|:----------------------------------
`sass` 	         | compile .sass/.scss to .css. We also use [postcss](https://github.com/postcss/postcss) for [autoprefixer](https://github.com/postcss/autoprefixer) and [Lost](https://github.com/peterramsing/lost), so feel free to include other awesome postcss [plugins](https://github.com/postcss/postcss#plugins) when needed
`webpack`          | compile .js sources into bundle file
`copy`             | copy common files from `./src` path to `./build` path
`swig`             | compile [swig](http://paularmstrong.github.io/swig/)  templates
`nunjucks`         | compile Mozilla's awesome [nunjucks](https://mozilla.github.io/nunjucks/) templates
`jade`             | compile [jade](http://jade-lang.com/) templates
`svgo`             | optimize svg files with [svgo](https://github.com/svg/svgo)
`iconfont`         | compile iconfonts from svg sources
`sprite:svg`       | create svg symbol sprites ([css-tricks](https://css-tricks.com/svg-sprites-use-better-icon-fonts/))
`sprite:png`       | create png sprites
`server`           | run dev-server powered by [BrowserSync](https://www.browsersync.io/)
`clean`            | remove `./build` folder
`list-pages`       | create index file with links to all project pages

_This is a full list of tasks, that we use in our projects, but not all of them should be available in current project. For example, we only use one template engine out of these three [`jade`, `nunjucks`, `swig`]. All available tasks are placed in a folder `./gulp/tasks` as separate *.js files. Usually, file name = task name._


## Flags

We have several useful flags.

* `gulp --open` or `gulp server --open` - run dev server and then open preview in browser
* `gulp --tunnel=[name]` or `gulp server --tunnel [name]` - runs dev server and allows you to easily share a web service on your local development machine (powered by [localtunnel.me](https://localtunnel.me/)). Your local site will be available at `[name].localtunnel.me`.
* `gulp [task_name] --prod` or `gulp [task_name] --production` - run task in production mode. Some of the tasks (like, sass or js compilation) have additional settings for production mode (such as code minification), so with this flag you can force production mode. `gulp build` uses this mode by default.

##Other
You can also use [npm scripts](https://docs.npmjs.com/misc/scripts):

* `npm run start` - same as `gulp default`.
* `npm run build` - same as `gulp build`.
* `npm run ghpages` to push only `./build` folder to **gh-pages** branch on github (very useful for previews).
* `npm run lint` - linting javascript with **eslint**.
* `npm run lint-fix` - fix as many issues as possible relatives to **eslint** settings.



## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://www.programulya.com"><img src="https://avatars0.githubusercontent.com/u/2372431?v=4" width="100px;" alt=""/><br /><sub><b>Julia Savinkova</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=programulya" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/sudodoki"><img src="https://avatars3.githubusercontent.com/u/1506905?v=4" width="100px;" alt=""/><br /><sub><b>Джон, просто Джон</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=sudodoki" title="Code">💻</a></td>
    <td align="center"><a href="http://artemsychov.com/"><img src="https://avatars3.githubusercontent.com/u/1478985?v=4" width="100px;" alt=""/><br /><sub><b>Artem Sychov</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=suchov" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/mayosh"><img src="https://avatars0.githubusercontent.com/u/3317247?v=4" width="100px;" alt=""/><br /><sub><b>Julia</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=mayosh" title="Code">💻</a></td>
    <td align="center"><a href="https://gitter.im"><img src="https://avatars2.githubusercontent.com/u/8518239?v=4" width="100px;" alt=""/><br /><sub><b>The Gitter Badger</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=gitter-badger" title="Code">💻</a></td>
    <td align="center"><a href="http://cv.vradchuk.info"><img src="https://avatars3.githubusercontent.com/u/1470686?v=4" width="100px;" alt=""/><br /><sub><b>Valentyn Radchuk</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=Zaknafeyn" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/brain-geek"><img src="https://avatars3.githubusercontent.com/u/307982?v=4" width="100px;" alt=""/><br /><sub><b>Oleksandr Rozumii</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=brain-geek" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/m1n0s"><img src="https://avatars0.githubusercontent.com/u/12004923?v=4" width="100px;" alt=""/><br /><sub><b>Leo Hrabovetskyi</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=m1n0s" title="Code">💻</a></td>
    <td align="center"><a href="https://me.st"><img src="https://avatars1.githubusercontent.com/u/494013?v=4" width="100px;" alt=""/><br /><sub><b>Stanislav Termosa</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=termosa" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/firec0der"><img src="https://avatars1.githubusercontent.com/u/11492412?v=4" width="100px;" alt=""/><br /><sub><b>Ivan Stetsenko</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=firec0der" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/lavriv92"><img src="https://avatars2.githubusercontent.com/u/2587946?v=4" width="100px;" alt=""/><br /><sub><b>Ivan Lavriv</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=lavriv92" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/kwalx"><img src="https://avatars0.githubusercontent.com/u/19335102?v=4" width="100px;" alt=""/><br /><sub><b>Alexander</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=kwalx" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/MarinaZadoyanchuk"><img src="https://avatars0.githubusercontent.com/u/8450971?v=4" width="100px;" alt=""/><br /><sub><b>Marina</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=MarinaZadoyanchuk" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/cwayfinder"><img src="https://avatars0.githubusercontent.com/u/355902?v=4" width="100px;" alt=""/><br /><sub><b>Taras Hupalo</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=cwayfinder" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://github.com/AMashoshyna"><img src="https://avatars0.githubusercontent.com/u/17703790?v=4" width="100px;" alt=""/><br /><sub><b>Anastasiya Mashoshyna</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=AMashoshyna" title="Code">💻</a></td>
    <td align="center"><a href="https://g3d.dev/"><img src="https://avatars3.githubusercontent.com/u/859210?v=4" width="100px;" alt=""/><br /><sub><b>Bohdan V.</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=g3d" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/zxftr45"><img src="https://avatars1.githubusercontent.com/u/4060982?v=4" width="100px;" alt=""/><br /><sub><b>Denis Sergienko</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=zxftr45" title="Code">💻</a></td>
    <td align="center"><a href="http://yavorsky.org"><img src="https://avatars0.githubusercontent.com/u/1521229?v=4" width="100px;" alt=""/><br /><sub><b>Artem Yavorsky</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=yavorsky" title="Code">💻</a></td>
    <td align="center"><a href="http://yakubiv.com"><img src="https://avatars3.githubusercontent.com/u/8440244?v=4" width="100px;" alt=""/><br /><sub><b>Viktor Yakubiv</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=viktor-yakubiv" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/ititarenko/"><img src="https://avatars1.githubusercontent.com/u/2997359?v=4" width="100px;" alt=""/><br /><sub><b>Ivan Tytarenko</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=zonzujiro" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/OleksiyRudenko"><img src="https://avatars2.githubusercontent.com/u/8686631?v=4" width="100px;" alt=""/><br /><sub><b>Oleksiy Rudenko</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=OleksiyRudenko" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="http://yevhenorlov.com"><img src="https://avatars2.githubusercontent.com/u/17388747?v=4" width="100px;" alt=""/><br /><sub><b>yevhen orlov</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=yevhenorlov" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/A-Ostrovnyy"><img src="https://avatars3.githubusercontent.com/u/16196199?v=4" width="100px;" alt=""/><br /><sub><b>Alexandr</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=A-Ostrovnyy" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/igor-kurkov-634760132/"><img src="https://avatars3.githubusercontent.com/u/29090227?v=4" width="100px;" alt=""/><br /><sub><b>Igor Kurkov</b></sub></a><br /><a href="https://github.com/kottans/kottans/commits?author=IgorKurkov" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!