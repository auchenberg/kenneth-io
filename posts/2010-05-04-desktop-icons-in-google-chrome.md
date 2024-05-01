---
layout: post
title: How to use desktop icons in Google Chrome - the HTML5 way.
date: 2010-05-04
published: true
---

Here's the HTML content converted to Markdown:

---

Today I wondered how Google Reader and Google Mail were having nice high-resolution icons when I saved an application shortcut to them in Google Chrome (currently a Windows-only feature).

I searched a bit, but had trouble finding documentation on this functionality. Even the Google Chrome/Chromium developer pages didn't contain anything. But after some more research, I discovered a small [Webmaster FAQ for Google Chrome](http://www.google.com/chrome/intl/en/webmasters-faq.html) that contained a single example on how to add icons, application name, description, and application URLs.

The code example:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Gmail</title>
    <meta name="application-name" content="Gmail" />
    <meta name="description" content="Google's approach to email" />
    <meta name="application-url" content="http://www.gmail.com" />
    <link rel="icon" href="gmail_32x32.png" sizes="32x32" />
    <link rel="icon" href="gmail_48x48.png" sizes="48x48" />
  </head>
  <body></body>
</html>
```

When I saw this code example the first thing that hit my mind was "This code is invalid!".

Take a look at the sizes attribute. This attribute isn't a part of any final HTML specification, but then I had a look at the [HTML5 specification](http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#rel-icon), and it seems to be that Google Chrome is following the HTML5 specification for external icon resources (an obvious choice!).

The [HTML5 specification 4.12.3.7 Link type "icon"](http://www.whatwg.org/specs/web-apps/current-work/multipage/links.html#rel-icon) defines as following:

```
The specified resource is an icon representing the page or site, and should be used by the user agent when representing the page in the user interface.
```

You might wonder what the correct values of the sizes attribute could be, and luckily the HTML5 specification tells a bit more about the sizes attribute.

```
If specified, the attribute must have a value that is an unordered set of unique space-separated tokens. The values must all be either "any" or a value that consists of two valid non-negative integers that do not have a leading U+0030 DIGIT ZERO (0) character and that are separated by a single U+0078 LATIN SMALL LETTER X character (x).
```

This means if you have two options for defining a size of an icon. You could either use "any" that represents that a resource which contains a scalable icon, or you could use a size in this pattern "[width]x[height]" with non-negative integers that represent the icon size in pixels.

You are able to define multiple resource links for icons in various sizes. Take a look at this example from the HTML5 specification:

```html
<!DOCTYPE html>
<html>
  <head>
    <title>lsForums — Inbox</title>
    <link rel="icon" href="favicon.png" sizes="16x16" type="image/png" />
    <link
      rel="icon"
      href="windows.ico"
      sizes="32x32 48x48"
      type="image/vnd.microsoft.icon"
    />
    <link
      rel="icon"
      href="mac.icns"
      sizes="128x128 512x512 8192x8192 32768x32768"
    />
    <link rel="icon" href="iphone.png" sizes="59x60" type="image/png" />
    <link rel="icon" href="gnome.svg" sizes="any" type="image/svg+xml" />
  </head>
  <body></body>
</html>
```

As you can see, this page would support a broad range of icon sizes from the commonly known favicon to a scalable SVG icon.

We can only hope that future browsers, and existing ones (Safari Mobile on iPhone, currently having its own resource type) will start supporting this specification since it would save us, web developers, a bit of work.

---
