---
layout: post
title: CSS Reloader - an extension for Firefox and Chrome
categories: Uncategorized
date: 2010-03-21
published: true
---

Some months ago at Vodafone, I was finding myself doing a huge amount of F5's during the day while I was pixel-pushing parts of the layout at [360](http://360.com). 30 minutes later a new Firefox extension was born - [CSS Reloader](https://addons.mozilla.org/da/firefox/addon/46211).

[CSS Reloader](https://addons.mozilla.org/da/firefox/addon/46211) is an extension that allows you to reload the stylesheets of any site with a simple press of F9 (and via the context-menus).

I chose this shortcut because it wasn't used by any other extension in Firefox, and the key position is quite nice, in the middle of F5 (refresh) and F12 (for Firebug).
You may wonder why I would make such an extension, but imagine you are building a true web application, such as [360](http://360.com), where almost everything is happening in the client. This means that if you are tweaking the layout of a model placed in a sub-view, you would have to go to this view every time, and then open the selected modal (or just make it invokable from the JavaScript console). Anyways, it takes time to restore the application state, and with CSS Reloader, you can bypass that because all the state is kept. It's only the stylesheets that are being reloaded.

To begin with, I released a version of [CSS Reloader for Firefox](https://addons.mozilla.org/da/firefox/addon/46211), which already has been downloaded more than 7,700 times, so I guess some developers out there also think it is quite useful ;)

Because of the response (and my lately switch to Chrome) I decided to do a [Chrome-version of CSS Reloader](https://chrome.google.com/extensions/detail/dnfpcpfijpdhabaoieccoclghgplmpbd). The first version of this is available at the Chrome extension gallery, but since the extensibility of Chrome isn't the same as in Firefox, the Chrome-version is limited to only the F9-key.

CSS Reloader is my first browser extension and is literally 16 lines of code, that saves me (and the rest of the 360-team) some time during the development of 360, which then can be used on better things such as features, extensions, and social-beering ;)

Please, let me know what you think of CSS Reloader! What can be improved?
