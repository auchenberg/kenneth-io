---
layout: post
title: "Insights from building @stripe's developer platform & API developer experience: Part 1"
date: 2024-04-06 09:00
published: true
comments: true
draft: true
categories:
og_image: images/posts/api-developer-experience-2024/social.png
description:
---

This content initially started as a brain dump that was supposed to ship as a short Twitter thread, but based on [this](https://twitter.com/auchenberg/status/1776695008692715627), I'm now shipping this as a blog post. It will probably turn into a mini-series of smaller posts like this.

Since leaving Stripe, I've received many questions from founders, operators, and investors about whether I could share some insights into the work we put into building Stripe's developer platform and API developer experience. In this post, I want to share a few learnings from some of the pieces we built over the years, and link to resources that might be valuable for others building their developer platforms.

In 2024, I often see companies providing public APIs focused on delivering excellent documentation and code-generated SDKs, fueled by the rise of [DXI companies](/post/developer-experience-infrastructure-dxi). However, to provide a truly great developer experience for APIs in 2024, there's more to it than meets the eye.

So here are a few insights and some of the things we built for @stripe's developer platform:

- **Foundation:** First and foremost, a great API developer experience starts with a strong foundation: An intuitive API platform grounded in principles and predictable patterns across its surface area.

  At Stripe, we spend a *lot* of time agonizing over patterns and consistency across the API to ensure developers have a consistent DX across products and abstractions.

- **API Review:** To operationalize this, we introduced a forcing function called API Review, where every change that modifies Stripe’s API must pass a strict review process staffed by a cross-functional group of people who care about API design.

  Naturally, it was challenging to manage as a centralized friction point for the company, particularly at scale with 1000s of engineers.

  {% image src="/images/posts/api-developer-experience-2024/api_review.png" title="API Review" /%}

  If I were to do things differently today, I would probably pivot the concept away from “review” to more of an education service that helps internal engineers develop excellent and consistent APIs.

  Engineers aren't always great API/abstraction designers, but this skill can be learned with support and tools.

  My former colleague [@cjav_dev](https://twitter.com/cjav_dev/) has a great post on the API design process here: [https://blog.postman.com/how-stripe-builds-apis/](https://blog.postman.com/how-stripe-builds-apis/).

- **Abstraction ladders:** Every API is an abstraction, and as APIs evolve, so does their abstraction ladder. Great abstractions enable developers to do powerful things with minimal effort, and great platforms reveal power and complexity as they progress through the abstraction ladder.

  {% image src="/images/posts/api-developer-experience-2024/abstraction_ladders.png" title="abstraction_ladders" /%}

  My former colleague, [@sebasbensu](https://twitter.com/sebasbensu/), has a great blog post about API as ladders: [https://blog.sbensu.com/posts/apis-as-ladders/](https://blog.sbensu.com/posts/apis-as-ladders/)

- **Consistency across abstractions:** One of the most common mistakes I see among companies are inconsistencies between method names and return signatures across abstraction ladders like REST → Back-end SDK → React SDK.

  It doesn't matter if you call GET request to retrieve or get in your SDKs. What matters is consistency all the way through.

- **Error messages:** The difference between a good and a great error message can mean hours saved in debugging, so in addition to being rigorous on the error messages themselves, we also included two links directly to the request logs and the relevant doc page as part of the API response to enable better resource discoverability.

  {% image src="/images/posts/api-developer-experience-2024/error_message.png" title="Error Message" /%}

- **Request spell-checking:** Building upon great error messages, a common mistake is getting a parameter name wrong, so why not do some spell-checking and help developers?

  Notice the: Did you mean email?

  {% image src="/images/posts/api-developer-experience-2024/spell_check.png" title="spell_check" /%}

- **Test-mode and instances:** As developers build integrations with your platform, they will make a lot of requests, and a good portion of those will have errors as the developers learn your API. To make it easier to get rolling, we set the standard by introducing a test mode that enabled developers to test their integration with Stripe without messing up real data or moving real money.

  Having a test mode is critical, and in this day and age, I consider the evolution of test-mode with multi-instance/environment support to be a table stakes in 2024.

  {% image src="/images/posts/api-developer-experience-2024/test_mode.png" title="test_mode" /%}

- **Request logs:** As developers make requests to your platform, they want to understand what’s happening with those requests. So, we offered Request Logs in our developer dashboard to enable developers to confirm that Stripe actually received requests and what we received.

  Request logs are a very underrated feature and something most developer platforms lack.

  {% image src="/images/posts/api-developer-experience-2024/request_log.png" title="request_log" /%}

- Further, having request logs enables “inspectability” of any API request, an essential educational tool for developers, as they can learn how the platform works by inspecting requests and understated object models and relationships.

  **Example:** Every API request made by the Stripe Dashboard shows up in request logs, enabling anyone to use the Dashboard UI and map it to the underlying API requests.

  {% image src="/images/posts/api-developer-experience-2024/inspectability.png" title="inspectability" /%}

- **Integration insights:** Building upon request logs and the concept of inspectability, we built Integration Insights, which would analyze API request errors and provide developers with actionable insights and tips on fixing their integration.

  Developers would up/downvote insights, which helped our recommendation engine provide insights.

  {% image src="/images/posts/api-developer-experience-2024/integration_insights.png" title="integration_insights" /%}

- **Integration builders:** It's common to provide sample projects and code examples to help developers get started, but what developers really want is a more educational approach that can teach them core concepts while they see code.

  So we introduced what we called [integration builders](https://docs.stripe.com/checkout/quickstart), which takes an interactive approach to explain concepts while showing developers tangible sample code they can download and run.

  The format has been vital in getting developers started even faster on Stripe. In particular, Stripe has scaled from indie hackers building in PHP to enterprise developers building in Java.

  {% image src="/images/posts/api-developer-experience-2024/integration_builder.png" title="integration_builder" /%}

- **Integration with existing tools:** Most developers don’t live inside your platform but in other tools and platforms. So, to meet developers where they are, we built tools like [Stripe CLI](https://stripe.com/blog/stripe-cli) and [Stripe for VS Code](https://stripe.com/blog/stripe-extension-for-vs-code), enabling developers to quickly test their webhooks, lint their code, and generate integrations with Stripe.

  {% image src="/images/posts/api-developer-experience-2024/cli.png" title="cli" /%}

- **Thicker SDKs:** As we went from handwritten SDKs to code-generated SDKs based upon our OpenAPI spec, we gained the ability to have always up-to-date SDKs and code examples in our docs. This also enabled us to provide static types for languages like TypeScript.

  Most importantly, it enabled us to focus our investments on thicker SDKs for frameworks like React, where we could now provide more tailored experiences by building upon our code-generated baseline.

  {% image src="/images/posts/api-developer-experience-2024/thick_sdks.png" title="thick_sdks" /%}

- Lastly, while building supporting developer products and processes for our developer platform, nothing would beat the process of **dogfooding** our own products and abstractions through a process we called **friction logging**, where we all would try to use a new thing and document all the friction along the way.

  Here is [@dps](https://twitter.com/dps) sharing insights about friction logging to [@lennysan](https://twitter.com/lennysan/):

  {% tweet_embed id="1658293670960066562" /%}

If you've made it this far, I hope you enjoyed this little post. Let me know what else you find interesting, and I'll incorporate that into the next post.

As always, I regularly share thoughts and perspectives on developer experience and developer platforms, so follow me at [@auchenberg](https://twitter.com/auchenberg).

Best,
Kenneth
