---
title: Detecting multi-touch trackpad gestures in JavaScript
description: >-
  For a long time I have wondered how Google Maps and Figma have been able to
  support pinch-to-zoom multi-touch gestures from my trackpad on…
date: '2018-04-08T21:52:45.693Z'
og_image: images/posts/1__bwwRLlyBufhc1Tbjta3Szg.jpeg
published: true
---

![Photo by [Scott Webb](https://unsplash.com/photos/ZLeogVvtXk0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/kP0pjdyYNyU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)](/images/posts/1__bwwRLlyBufhc1Tbjta3Szg.jpeg)
Photo by [Scott Webb](https://unsplash.com/photos/ZLeogVvtXk0?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/photos/kP0pjdyYNyU?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText)

For a long time I have wondered how [Google Maps](http://maps.google.com/) and [Figma](http://figma.com) have been able to support pinch-to-zoom multi-touch gestures from my trackpad on my Macbook, when there’s no special trackpad JavaScript events exposed.

So I started exploring this a few months ago and this weekend I stumbled upon this bug, [1052253 — OS X: Pinch to zoom gesture should map to mousewheel with the control key, like Chrome](https://bugzilla.mozilla.org/show_bug.cgi?id=1052253 'https://bugzilla.mozilla.org/show_bug.cgi?id=1052253'), in the Mozilla bug tracker and that finally made things click.

Apparently Microsoft with IE10 was the pioneers here, as they enabled pinch-to-zoom gestures from multi-touch trackpad’s to be surfaced as `mousewheel`event with the `ctrl`modifier set to true.

The Chrome team had a discussion [about this back in January 2014](https://groups.google.com/a/chromium.org/forum/#!searchin/chromium-dev/mousewheel$20byers/chromium-dev/L_kaBhYFi5U/RIMFBx12dJoJ), and the adaption landed in Chrome M35 as per [documented in this bug](https://bugs.chromium.org/p/chromium/issues/detail?id=289887). Mozilla followed up with parity and [landed the support](https://bugzilla.mozilla.org/show_bug.cgi?id=1052253) in Firefox 55.

As explained by [Rick Byers](https://twitter.com/RickByers) in the [this Chrome issue](https://bugs.chromium.org/p/chromium/issues/detail?id=289887), the spec has an example that says:

> "The user's environment might be configured to associate vertical scrolling with rotation along the y-axis, horizontal scrolling with rotation along the x-axis, and zooming with rotation along the z-axis."

> From this perspective it seems reasonable to generate deltaZ wheel events for trackpad pinch gestures. This would enable apps like google maps to respond nicely to pinch.

So that was a bit of the historic context. Today this means that we have a de-facto “hack” standard to detect pinch-to-zoom gestures from trackpads, which is supported in multiple browsers.

### Detecting pinch-to-zoom on your trackpad with JavaScript

So how does it work?

You can detect a pinch-to-zoom gesture with this quite simple event handler listening for the `wheel` event, where the `e.deltaY` value represents your zoom/scale factor when the `e.ctrlKey` is set.

That’s it.

#### What browsers does this work in?

The browser support seems to be as following:

- Chrome: ✅ since Chrome M35
- Firefox: ✅ since Firefox 55
- Edge: ✅ [Unless you are using a “precision-touchpad”](https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7134034/)
- Safari has basic wheel-events and supports the proprietary [gestureEvents](https://developer.mozilla.org/en-US/docs/Web/API/GestureEvent) which are explains below

### Detecting more advanced trackpad gestures with GesturesEvents in Webkit

After the ctrl key modifer hacker landed there seem to have been a discussion on how this could formalized into a better API as per this dicussion on Twitter:

{% tweet_embed id="618380969343451136" /%}

In March 2016 Apple has shipped new a`GestureEvent` for Webkit that shipped as a part of [Safari 9.1](https://webkit.org/blog/6008/new-web-features-in-safari/), and this new event model allow us to detect gesture rotation and much.

You can read more about `GestureEvents` in the Apple documentation here: [https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW23](https://developer.apple.com/library/content/documentation/AppleApplications/Reference/SafariWebContent/HandlingEvents/HandlingEvents.html#//apple_ref/doc/uid/TP40006511-SW23)

### Demo using a combination of wheel + gesture events

I’ve put together a simple demo of a <div> which you can move around and scale using your multi-touch trackpad, which is using a combination of the `wheel` event and `gestureEvents` when in Webkit. The latter enables rotation of the element, which is quite cool:

**Demo:** [https://multi-touch-trackpad-gesture.stackblitz.io/](https://multi-touch-trackpad-gesture.stackblitz.io/)  
**Code:** [https://stackblitz.com/edit/multi-touch-trackpad-gesture](https://stackblitz.com/edit/multi-touch-trackpad-gesture)

![[https://multi-touch-trackpad-gesture.stackblitz.io/](https://multi-touch-trackpad-gesture.stackblitz.io/)](/images/posts/1__ly0W__nCdu__7DmiA3j7arww.png)

Another cool demo I found is using WebGL and the performance is even better: [http://jsbin.com/fepuficudolo/3/edit?html,output](http://jsbin.com/fepuficudolo/3/edit?html,output)

### Towards standardization

Today there doesn't seem to be a web standard for this, but there’s requests opened on the W3C UI Events specification here [https://github.com/w3c/uievents/issues/31](https://github.com/w3c/uievents/issues/31), and there’s a separate discussion on extending PointerEvents to expose raw Trackpad events here [https://github.com/w3c/pointerevents/issues/206](https://github.com/w3c/pointerevents/issues/206), so maybe one day we’ll have a web standard for this. Personally I would expect PointerEvents as the place for this.

Hope that clarified a few things. At least it did for me.

/k
