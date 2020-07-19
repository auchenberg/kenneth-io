---
title: "Super-charged live editing and JavaScript debugging for Angular using Visual Studio Code \U0001F525 \U0001F389"
description: >-
  Use Visual Studio Code to super-charge your Angular JavaScript debugging
  workflow in a few simple steps
date: '2017-06-15T16:38:58.987Z'
---

![Demo of a click event handler in an Angular component being debugged and live edited from VS Code](/static/images/posts/1__GNaWtfa4A61eFU9QQiwRXQ.gif)
Demo of a click event handler in an Angular component being debugged and live edited from VS Code

Back in February I wrote a Medium post on [How to Live edit and debug your React apps directly from VS Code](http://Live%20edit%20and%20debug%20your%20React%20apps%20directly%20from%20VS%20Code — without%20leaving%20the%20editor) powered by our [Chrome debugger for VS Code](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome) and Webpack’s Hot Module Reloading mechanism. Today I’m gonna show how you can achieve the same super-charged workflow for Angular by using [angular-cli](https://github.com/angular/angular-cli) and Visual Studio Code.

Super-charged live editing and JavaScript debugging enables you to write and debug your Angular code without leaving the editor, and most importantly it enables you to have a more efficient development workflow, without context switching, because you stay inside your editor while you both author and debug 🔥 _🎉_ 🎈

![](/static/images/posts/1____5HNFFK4YwHduy7uXuvUgQ.png)

### How to get started

1.  Download the [latest release of VS Code](http://code.visualstudio.com/Download) and install our [Chrome debugger](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
2.  Make sure Chrome is at least version version 59 (see [issue](https://github.com/Microsoft/vscode-chrome-debug/issues/447))
3.  Create your Angular app using [angular-cli](https://github.com/angular/angular-cli)
4.  Create a`launch.json`file to configure the VS Code debugger and put it inside `.vscode` in your root folder. VS Code launch.json configs for angular-cli
5. Start your Angular app by running `ng serve` in your favorite terminal.
6. Start debugging in VS Code by pressing `F5`or going to the debug section select `Launch Chrome with ng serve` followed by clicking the `green debug icon`.

#### Debugging Angular unit tests with VS Code

You can also debug your Angular unit tests using VS Code. You’ll find a more detailed guide on how to do this in our new [VS Code recipes repository on GitHub](https://github.com/weinand/vscode-recipes/tree/master/Angular-CLI).

#### Help VS Code understand your source-maps with an extra option

If you are using a custom bundling solution you might need to provide Visual Studio Code with more information, as we have learned that many boilerplates/bundlers/setups are generating source-maps with incorrect paths to the files (on the file system).

To overcome this we have introduced a [`sourceMapPathOverride`](https://github.com/Microsoft/vscode-chrome-debug#sourcemapss) option which allows VS Code to override paths inside the source map. This is needed to map the files correctly to the file system, as our debugger relies on the source files for debugging. You can read more about [`sourceMapPathOverrides`](https://github.com/Microsoft/vscode-chrome-debug#sourcemaps) here.

That’s it for now. Happy debugging! 🎉🎈

/k