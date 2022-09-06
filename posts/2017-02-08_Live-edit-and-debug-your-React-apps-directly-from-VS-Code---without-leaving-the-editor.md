---
title: "Live edit and debug your React apps directly from VS Code — without leaving the editor \U0001F525 \U0001F389\U0001F388"
description: Supercharge your React debugging workflow with VS Code and Chrome debugging
date: '2017-02-08T17:48:45.380Z'
og_image: images/posts/1__lai2E3hB0L8oGBEUNcMsCQ.png
---

In our most recent release of our [Chrome debugger for VS Code](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome), we have landed a bunch of improvements to our sourcemapping-engine, which enables us to support live-editing and debugging out of the box with [create-react-app](https://github.com/facebookincubator/create-react-app).

![Demo of React app being live edited and debugged from VS Code](/images/posts/1__74lkRfxrsJlxEWXCwSOF__Q.gif)

This enables you as a developer to write and debug your React code without leaving the editor, and most importantly it enables you to have a continuous development workflow, where context switching is minimal, as you don’t have to switch between tools.

![](/images/posts/1__lai2E3hB0L8oGBEUNcMsCQ.png)

You can now write code, set a breakpoints, make a changes to the code, and debug your newly modified code — all from your editor 🔥 *🎉*🎈

### How to get started in 6 steps

1.  Download the [latest release of VS Code](http://code.visualstudio.com/Download) and install our [Chrome debugger](https://marketplace.visualstudio.com/items?itemName=msjsdiag.debugger-for-chrome)
2.  Create your React app using [create-react-app](https://github.com/facebookincubator/create-react-app)
3.  Use the following config for your `launch.json`file to configure the VS Code debugger and put it inside `.vscode` in your root folder.
4.  Start your React app by running `npm start` in your favorite terminal
5.  Start debugging in VS Code by pressing `F5`or by clicking the green debug icon

Happy debugging! 🎉🎈

### Details

Our Chrome debugger now supports [Webpack’s Hot Module Replacement mechanism](https://webpack.github.io/docs/hot-module-replacement.html), which pushes module changes to the browser by running a local file watcher.

Our debugger is now able to pickup these changes and re-applies the newly generated HMR sourcemap to the loaded source files on the fly. This enables the live editing and debugging experiences, _without adding a need for more file watches or background tools._

/k
