---
layout: post
title: 'The end of human abstraction'
date: '2026-09-10'
published: true
comments: true
categories: [ai, developer-experience, infrastructure]
description: 'As AI agents write more code, the abstractions designed around human limits become an opportunity to rethink every layer of the software stack.'
---

In 2020, [Shopify went all in on React Native](https://shopify.engineering/react-native-future-mobile-shopify). The logic was simple. Why build the same thing twice? Instead of two separate iOS and Android apps, share most of the code through a common layer.

That made sense because humans were writing the code.

Today [Shopify announced that native](https://shopify.engineering/back-to-native) is once again the future of mobile at Shopify, and because we have entered a world where most code will get written by AI and agents.

For most of the history of computing, and for all of my career, we've designed our abstractions around human limits. Programming languages, frameworks, APIs, SDKs, cross-platform runtimes, all built in part to make complicated systems something we, humans, can work with.

We optimized for **legibility**, for **comprehension**, for humans being able to hold the complexity in our heads.

We optimized for a human developer experience.

Those assumptions are starting to fade.

Maintaining two implementations used to mean twice the work. But if writing code is free, suddenly human abstraction starts to feel expensive.

Another runtime, another dependency, another translation layer, all of that is now sitting between original intent and performant execution.

We accepted that overhead because it saved human time. When the cost of producing code goes to zero, we get to question whether those layers are even valuable.

And I don't think this stops with React Native.

As agents become both the builders and consumers of software, we'll need abstractions designed around how they work.

When I look at the next decade of infrastructure, the interesting part isn't just using AI to run the stack we already have. It’s the opportunity to rethink every layer of the stack for a world where humans are no longer the constraint.

**We spent 70 years making computers easier for humans to understand. We're about to find out what computers look like when they no longer have to be.**

/k
