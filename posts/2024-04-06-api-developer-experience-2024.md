---
layout: post
title: Insights from building @stripe's developer platform and API developer experience
date: 2024-04-06 09:00
published: true
comments: true
draft: true
categories:
og_image: images/posts/getting-back-to-my-entrepreneurial-roots.jpg
description:
---

I often see companies providing public APIs focused on delivering excellent documentation and code-generated SDKs, but to provide a truly great **developer experience for APIs** in 2024, there’s more to it.

Here's a few insights from building @stripe’s developer platform:

- **Foundation:** First and foremost, a great API developer experience starts with a strong foundation: a predictable API platform grounded in principles and predictable patterns across its surface area.

  At Stripe, we spend a *lot* of time agonizing over patterns and consistency across the API to ensure developers have a consistent DX across products and abstractions.

- **API Review:** To operationalize this, we introduced a forcing function called API Review, where every change that modifies Stripe’s API must pass a strict review process staffed by a cross-functional group of people who care about API design.

  Naturally, as a centralized friction point for the company, it was challenging to manage, particularly at scale with 1000s of engineers.

  {% image src="/images/posts/api-developer-experience-2024/api_review.png" title="API Review" /%}

  If I were to do things differently today, I would probably pivot the concept away from “review” to more of an education service that helps internal engineers develop excellent and consistent APIs.

  It turns out that great engineers aren’t always great API/abstraction designers, but this skill can be learned with support and tools.

  My former colleague @cjav_dev has a great post on the API design process here: [https://blog.postman.com/how-stripe-builds-apis/](https://blog.postman.com/how-stripe-builds-apis/).

- **Abstraction ladders:** Every API as an abstraction, and as APIs evolve over time, so does it’s abstraction ladder. Great abstractions enables developers to do powerful things with minimal effort, and great platforms reveals power and complexity as they go through the abstraction ladder.

  My former colleague, @sebasbensu, has a great blog post about API as ladders: [https://blog.sbensu.com/posts/apis-as-ladders/](https://blog.sbensu.com/posts/apis-as-ladders/)

- **Consistency across abstractions:** One of the most common mistakes I see among companies are inconsistencies between method names and return signatures across abstraction ladders like REST → Back-end SDK → React SDK.

  It doesn't matter if you call GET request to retrieve or get in your SDKs. What matters is consistency all the way through.

- **Error messages:** The difference between a good and a great error message can mean hours saved in debugging, so in addition, to being rigorous on the error messages themselves, we also included two links directly to the request logs and the relevant doc page as part of the API response to enable better resource discoverability.

  {% image src="/images/posts/api-developer-experience-2024/error_message.png" title="Error Message" /%}

- **Request spell checking:** Building upon great error messages, a common mistake is getting a parameter name wrong, so why not do some spell checking and help developers?

  Notice the: Did you mean email?

  {% image src="/images/posts/api-developer-experience-2024/spell_check.png" title="spell_check" /%}

- **Test-mode:** As developers build integrations with your platform, they will make a lot of requests, and a good portion of those will have errors as the developers learn your API. To make it easier to get rolling, we famously introduced a test mode that enabled developers to test their integration with Stripe without messing up real data or moving real money.

  Having a test mode is critical, and in this day and age, I consider the evolution of test-mode with multi-instance/environment support to be a table stakes in 2024.

  {% image src="/images/posts/api-developer-experience-2024/test_mode.png" title="test_mode" /%}

- **Request logs:** As developers make requests to your platform, they want to understand what’s happening with those requests. So, we offered Request Logs in our developer dashboard to enable developers to confirm that Stripe actually received requests and what we received.

  Request logs are a very underrated feature and something most developer platforms lack.

  {% image src="/images/posts/api-developer-experience-2024/request_log.png" title="request_log" /%}

- Further, having request logs enables “inspectability” of any API request, an essential educational tool for developers, as they can learn how the platform works by inspecting requests and understated object models and relationships.

  **Example:** Every API request made by the Stripe Dashboard shows up in request logs, enabling anyone to do something in the UI and map it to API requests.

  {% image src="/images/posts/api-developer-experience-2024/inspectability.png" title="inspectability" /%}

- **Integration insights:** Building upon request logs and the concept of inspectability, we built Integration Insights, which would analyze API request errors and provide developers with actionable insights and tips on how to fix their integration.

  Developers would up/down vote insights, which helped our engine.

  {% image src="/images/posts/api-developer-experience-2024/integration_insights.png" title="integration_insights" /%}

- **Integration builders:** It’s common to provide sample projects and code examples to help developers get started, but it’s rare to take a more educational approach.

  We introduced what we called Integration Builders, which takes an interactive approach to explaining concepts while also showing developers tangible sample code that they can download and run.

  The format has been vital in getting developers started even faster on Stripe. In particular, Stripe has scaled from indie hackers building in PHP to enterprise developers building in Java.

  {% image src="/images/posts/api-developer-experience-2024/integration_builder.png" title="integration_builder" /%}

- **Integration with existing tools:** Most developers don’t live inside your platform but in other tools and platforms. So, to meet developers where they are, we built tools like Stripe CLI and Stripe for VS Code, enabling developers to quickly test their webhooks, lint their code, and generate integrations with Stripe.

  {% image src="/images/posts/api-developer-experience-2024/cli.png" title="cli" /%}

- **Thicker SDKs:** As we went from handwritten SDKs to code generated SDKs based upon our OpenAPI spec, we gained the ability to have always up to date SDKs and code examples in our docs, but it also enabled us to provide static types for languages like TypeScript.

  Most importantly, it enables us to focus our investments into thicker SDKs for frameworks like React, where we now could provide more tailored experiences by building upon our code-generated baseline.

  {% image src="/images/posts/api-developer-experience-2024/thick_sdks.png" title="thick_sdks" /%}

- And lastly, while building supporting developer products and processes for our developer platform, nothing would beat the process of **dog fooding** our own products and abstractions through a process we called **friction logging**, where we all would try to use a new thing, and document all the friction along the way.

  Here is @dps sharing insights about friction logging to @lennysan

  {% tweet_embed id="1658293670960066562" /%}

If you made it this far: I hope you enjoyed this little thread, I regularly share thoughts and perspectives on developer experience and developer platforms, so follow me at [@auchenberg](https://twitter.com/auchenberg)
