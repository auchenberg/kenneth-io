---
layout: post
title: 'Software-defined intelligence'
date: 2024-06-12 09:00
published: true
comments: true
draft: true
categories:
description:
---

A quick riff: When I look at most AI companies in 2024, they're deploying a similar strategy: investing heavily to build proprietary foundational models and then creating a business around those models, either through a platform, a consumer business, or a combination of both.

In the consumer business, it's typically an app that showcases the model's capabilities to users, who then pay a monthly subscription fee.

On the platform side, the approach involves selling access to the foundational model via API-first products and charging based on usage.

That's it. All major AI companies follow the business model developed initially by OpenAI.

However, I'm not convinced this is the best approach moving forward. What you are truly selling with a platform is a set of higher-level abstractions that simplify the underlying technology.

If AI platform companies continue to "just sell" the foundational model as an inference service, they will become indistinguishable from one another, leading customers to compare models across providers. Instead, to truly build a platform, you need to climb the abstraction ladder and create something more general: software-defined intelligence.

By building a platform that offers software-defined intelligence, your goal is to own the workflow of creating AI-powered products. You achieve this by providing a full spectrum of abstractions, enabling a seamless transition from low-level model inference to data storage, computing, agents, embedding, authorization, and an ecosystem for functionality and long-tail features such as function calling and actions.

The premise of your platform is no longer just the raw model; you're offering something differentiated; software-defined intelligence.

The value proposition for developers is that your platform offers better economics and primitives, allowing them to offload the cognitive overhead of building onto the platform. This means developers don't have to worry about inference scaling, model differences, or whether the models are locally or in the cloud. Instead, they use software-defined intelligence, leveraging your abstractions, SDKs, APIs, and whatever the future brings. The platform ensures the model runs securely, cost-effectively, and in the most privacy-sensitive way possible.

That's what AI platform companies should be selling: a higher-level platform that abstracts away the complexities. This approach moves them away from selling low-level models and positions them to capture more value.

## Relevent reading

- [https://stratechery.com/2024/ai-integration-and-modularization/](https://stratechery.com/2024/ai-integration-and-modularization/)
