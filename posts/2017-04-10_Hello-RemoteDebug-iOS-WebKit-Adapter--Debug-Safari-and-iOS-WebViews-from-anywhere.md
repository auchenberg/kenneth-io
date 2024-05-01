---
title: "Hello RemoteDebug iOS WebKit Adapter: Debug Safari and iOS WebViews from anywhere \U0001F4E1\U0001F4F1"
description: >-
  Debug Safari and iOS WebViews on both Windows and Mac with Chrome DevTools, VS
  Code & debugger.html
date: '2017-04-10T13:01:03.039Z'
og_image: images/posts/1__NGdCzvXOHYFEmZzA1OId4Q.png
published: true
---

Today, I’m happy to announce a new project, [RemoteDebug iOS WebKit Adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter), which enables Safari and WebViews on iOS to be debugged from tools like [VS Code](http://code.visualstudio.com), [Chrome DevTools](https://developers.google.com/web/tools/chrome-devtools/) and [Firefox debugger.html](https://github.com/devtools-html/debugger.html) on both Windows and Mac.

![RemoteDebug iOS WebKit Adapter overview](/images/posts/1__NGdCzvXOHYFEmZzA1OId4Q.png)
RemoteDebug iOS WebKit Adapter overview

### Purpose

This adapter enables debugging of Safari/Webkit on iOS from [Chrome Debugging Protocol (CDP)](https://github.com/ChromeDevTools/devtools-protocol) based tools. The scope of the project is to provide a protocol adapter that handles the _API differences_ between the [Chrome Debugging Protocol](https://github.com/ChromeDevTools/devtools-protocol) and Webkit Remote Debugging Protocol. The project is continuation of the existing [ios-webkit-debug-proxy](https://github.com/google/ios-webkit-debug-proxy) project, by building on top.

### Goal

I hope by having an open source protocol adapter we can _unite the energy and resources that, until now, had been put into keeping_ [_Apache Cordova_](https://cordova.apache.org/) _and iOS WebKit/Safari web debugging work for a various number of tools and clients._ With one central protocol adapter that adheres to the [Chrome Debugging Protocol (CDP) API](https://github.com/ChromeDevTools/devtools-protocol), tools can focus on implementing the that API, and let compatibility be handled by the protocol adapter.

### Architecture

The protocol adapter is implemented in TypeScript as Node-based CLI tool which starts an instance of [ios-webkit-debug-proxy](https://github.com/google/ios-webkit-debug-proxy), detects the connected iOS devices, and then starts up an instance of the correct protocol adapter depending on the iOS version.

![RemoteDebug iOS WebKit Adapter architecture](/images/posts/1__2mCWfCt14HkSghg8fDcMug.png)
RemoteDebug iOS WebKit Adapter architecture

The iOS version detection relies on _ideviceinfo_ from [libimobiledevice](http://www.libimobiledevice.org/), and is needed because the API exposed over the WebKit Remote Debugging Protocol has small variations depending on the WebKit version. As a starting point API differences from iOS 10 down to iOS 8 has been implemented and the [implementation can be seen here](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter/tree/master/src/protocols/ios).

Finally, the adapter is exposing a WebSocket server and a HTTP server, which are compliant to CDP, which means there’s **no difference for the external tools, whether they are connected to a Chromium-based runtime or the adapter**.

### The adapter in a nutshell

The protocol adapter enables a broad range of features that hasn’t been working for a long time to the growing delta between the APIs exposed by Chromium and WebKit.

- **DOM / CSS editing**  
  Implements a range of basic DOM/CSS APIs which enables basic element inspection and CSS manipulation.
- **Console**  
  Enables the console to function as expected, by [mapping](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter/blob/master/src/protocols/ios/ios.ts#L79) the WebKit APIs to the new Chrome APIs.
- **Network tool**
  Enables the network tool to function as expected, and re-enables cookies to be set and deleted.
- **Script debugging**
  Debugging of scripts and enables usage of the debugger-statement from VS Code, debugger.html and Chrome DevTools
- **Screencasting**
  As a little extra thing the protocol adapter also enables a basic version of screencasting via Chrome DevTools, as we discovered WebKit supports taking screenshots of the viewport via the [Page.snapshotRect](http://compatibility.remotedebug.org/Page/Safari%20iOS%2010.0/commands/snapshotRect) API. This enables us to emulate the screencasting behavior of Chromium, with the caveat of performance is sub-pair with the native implementation, and touch emulation isn’t fully implemented. The experience is limited, but conceptually it works.

![Screencasting from iOS Simulator to Chrome DevTools](/images/posts/1__miVTt5ZXauyHyUYAYw__jXA.gif)
Screencasting from iOS Simulator to Chrome DevTools

### Getting started

RemoteDebug iOS WebKit adapter works both on Windows and MacOS, and to get started simply install the adapter via NPM:

```
npm install remotedebug-ios-webkit-adapter -g
```

Depending on your OS there might be special dependencies needed, please follow the [instructions in the README](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter#getting-started) for more details.

### Using the adapter with Chrome DevTools, VS Code and Firefox debugger.html

To get started you first need to start the adapter from your favorite command line:

```
remotedebug_ios_webkit_adapter --port=9000
```

Once the adapter is running you can configure Chrome DevTools to discover “Network targets” by [following this guide](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter#usage-with-chrome-canary-and-chrome-devtools), or you can start the adapter running on port `9222`, which enables [Firefox debugger.html](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter#using-with-mozilla-debuggerhtml) to work with it.

Alternatively you can also [configure VS Code](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter/blob/master/README.md#using-with-microsoft-vs-code) to use port `9000`with the following `launch.json` config, and enable easy debugging directly from your editor.

### Thanks to Microsoft for sponsoring the work

This project started as an internal Microsoft experiment with the aim to enable Visual Studio, VS Code and other tools to transparently target different runtimes, as we today have debuggers based on CDP used for Node and Chrome debugging.

Today the project has been donated to [RemoteDebug GitHub organization](https://github.com/RemoteDebug), and open-sourced under MIT. This is a one-time commitment from Microsoft and means Microsoft _won’t_ be maintaining the project going forward.

A big thanks to my employer Microsoft for allowing me, and the rest of team to spend time on making this project a reality. A particular thanks to [James Lissiak](https://github.com/jalissia) for outlining the architecture, crunching through the API differences and figuring out the screencasting bits.

### Going forward

The next step for RemoteDebug iOS WebKit adapter is to implement [the 32 remaining APIs](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter/issues), which would give the adapter coverage of the [public APIs in the Chrome Debugging Protocol](http://compatibility.remotedebug.org), which I hope the community can help with.

The adapter isn’t perfect, and it’s still early days, but it takes over from where the [ios-webkit-debug-proxy](https://github.com/google/ios-webkit-debug-proxy) project left, and enables more tools to debug WebKit on iOS which is great! Profiling is still one of the bigger things that needs to get tackled, but I imagine it will be hard to do, as the underlaying data model between WebKit and Chrome simply has diverged too much. That said, if possible, it could enable some interesting tooling scenarios as tools like [Lighthouse](https://github.com/GoogleChrome/lighthouse) and [CalibreApp](https://calibreapp.com/) would work with WebKit.

#### What’s next for RemoteDebug

The effort for [RemoteDebug](http://remotedebug.org) is still continuing with the goal to introduce a standardized Core Debugging Protocol that isn’t owned by one vendor with an open governance model that allows multiple vendors to collaborate.

The [RemoteDebug](http://remotedebug.org) effort should be combined with “_RemoteDebug test suite_” that would allow us to validate the compatibility across runtimes and ensure that tools such as VS Code, debugger.html and others works as expected. This testing effort hasn’t begun yet, but with [RemoteDebug iOS WebKit Adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter) in place, we now have the first test target in addition to the native Chrome implementation.

Please give the [RemoteDebug iOS WebKit Adapter](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter) a try, open issues and contribute with ideas for improvements on [GitHub](https://github.com/RemoteDebug/remotedebug-ios-webkit-adapter).

/k

_(Thanks to_ [_Ben Schwarz_](https://mobile.twitter.com/benschwarz)_,_ [James Lissiak](https://github.com/jalissia), [Jason Laster](https://twitter.com/jasonlaster11), [Konrad Dzwinel](https://mobile.twitter.com/kdzwinel) & [_Andy Sterland_](https://twitter.com/andysterland) _for reviewing this post)_
