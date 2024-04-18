---
layout: post
title: 'The rise of AI-first Developer Experience (DX 2.0)'
date: 2024-04-18 09:00
published: false
comments: true
draft: true
categories:
description:
---

In this blog post, I will outline a few of my thoughts as I've been talking to founders, investors, and builders in the world of developer experience. I want to outline a few hypotheses and assumptions I have for the future and describe how I see the impact of AI on DX, which I've started to call the rise of AI-first Developer Experience.

{% image src="/images/posts/ai-first-dx/splash.png" title="spell_check" /%}

Since 2022, we have seen a wave of [developer experience infrastructure companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) emerge, helping companies improve the baseline for their developer experiences.

But we have also started to see a paradigm shift for developer tools with the arrival of AI and LLMs, particularly GPT-4-like quality models, which have enabled new categories of tools to exist. With the arrival of AI, a new frontier is emerging for DX, and that frontier is AI-first.

## DX 1.0: The era of generalized DX

Today, we are in the “DX 1.0" world, where we have typically built developer experiences around generalized personas, like a specific set of languages, runtimes, or frameworks. Typically, a company builds a generalized baseline for its DX and goes deeper into particular verticals like front-end developers and NextJS by building specific product experiences and content for relevant languages and frameworks.

The challenge of building these specialized experiences has traditionally been resources, as each has been meticulously crafted by individuals (or teams) who possess a deep understanding of the intricate details required to build a superior experience for a specific framework or language.

In other words, targeting a new framework/language or runtime has been very expensive, so most companies have been focused on providing a good enough baseline. At the same time, only a few have had the resources to invest in specific verticals.

## What’s changing?

With the arrival of AI, we have started to see the realized impact of the rise of [Software 3.0](https://medium.com/@itamar_f/software-3-0-the-era-of-intelligent-software-development-acd3cafe6cd7), where we are going through one of the few fundamental paradigm/platform shifts in our industry, as we are transitioning from a world where 80% of all code is written by humans to a reality where the majority of code will be authored by AIs and Agents.

So, what’s changing with our developer tools and developer workflows?

- **The cost of syntax is going to zero**

  We are transitioning software engineering from [syntax to semantics](https://www.alessiofanelli.com/posts/syntax-to-semantics), which is the natural evolution of the never-ending quest to move to higher abstractions. Thanks to LLMs, human languages are now programming languages.

  Software builders can now express their intents in human language through prompts and offload the cognitive effort of writing perfect syntax to an LLM, which now does the heavy lifting of writing syntax that fits perfectly into the codebase.

  For the first time, tools are acting as actual extensions to software builders, giving them something much closer to Steve Jobs' "bicycle of the mind" than we have seen in the past.

- **The cost of personalization is going to zero**

  With AI, in addition to code syntax, we are also seeing the cost of producing content like [text](https://chatgpt.com), [video](https://www.synthesia.io/), audio, and even [music](http://suno.com/) coming down and getting closer to zero. This means entirely new ways of providing localized content are opening, as it's suddenly now possible to translate content on the fly to new languages and markets without investing heavily into staffing new content teams.

  Extrapolating from localization is personalization, and here, I mean hyper-personalization. As the cost of content and syntax comes down, new ways to provide hyper-personalized developer experiences are becoming possible.

- **Domain expertise becomes even more valuable**

  An exciting thing about LLMs is that they don’t per se reason about things; instead, they are great at mimicking patterns. This means AIs are the _“ultimate wisdom of the crowds,”_, and this collective wisdom is now available to everyone.

  The effect of this is that domain expertise on _what and how to build things_ becomes even more valuable, as the practical implementations can be outsourced to AIs and agents.

- **Integrations will increasingly be written by AIs**

  Today, many companies focus on providing great developer experience and are in the business by making the integration of their APIs into a product as smooth as possible.

  At Stripe, we called this _integration experience_, and we meticulously measured our time-to-integration and satisfaction across developer segments, cohorts, and products to the degree that we would know how long it _should_ take a JavaScript developer to make their first payments API request in production.

  When you integrate two systems, you glue them together, and this _glue code_ is the essence of the integration experience.

  AI is changing the nature of the integration experience, as it’s no longer just the software engineer who will write this glue code but also the AI.

- **Software development is becoming AI-first**

  In its most recent quarterly earnings, Microsoft stated that there are now 1.3 million paid GitHub Copilot users and that 50,000 companies are using it.

  This is an incredible adoption for a relatively new developer tool, but this also means software development is becoming AI-first and happening right before our eyes.

  AI-enabled tools are already being adopted by software engineers at a massive scale. Developers now use Copilot-like coding assistants within their editors, tools like [Vercel v0](https://v0.dev/) to bootstrap front-end UI, or ChatGPT to write SQL queries, and this is just the beginning.

  {% tweet_embed id="1735400174888042682" /%}

- **Copilots are graduating to agents**

  For the past year or so, the AI community has discussed agents and the future of an agentic world where agents will do everything for us. Until recently, this was very abstract for many software engineers until Cognition Labs released a demo of [Devin](https://www.cognition-labs.com/introducing-devin), their “first AI software engineer.”

  {% tweet_embed id="1767548763134964000" /%}

  Regardless of how much of Devin is real at [this point in time](https://twitter.com/GergelyOrosz/status/1779035184978866332), the demo showed us the edge of what a potential future agentic world will look like for software engineering, and this prompts us to start to ask questions about what Developer Experience means in an agentic world.

## DX 2.0: The rise of AI-first developer experience

With the arrival of AI, we are entering a world where most experiences will be [hyper-personalized](https://www.implications.com/p/8-forecasts-and-implications-for) based on how well a company or product knows you, and when it comes to developer experience, it will be no different.

In the future, the developer services and infrastructure you are using to build with will be able to provide a hyper-personalized experience that is bespoke to what you are trying to build, presented in your preferred format and language, and tailored to your specific tech stack and preferences.

> Imagine a company with an API that never expects you to write code to integrate with it. Instead, you tell the AI what you want it to do, and it will generate a custom SDK with all the features you want, a stable facade, and a tailored codebase so you can add features later without needing to rewrite things.

> If you have a question about the service, you can ask your in-editor copilot or have a short 10-minute video generated with your favorite DevRel in Spanish. However, if you are in a hurry that day, you can ask your workspace agent to draft the integration and send you a voice note with the TL;DR once it is done.

While this may seem futuristic today, we can envision a near future where it becomes feasible—even perfectly reasonable.

### What will be important aspects of DX 2.0?

- **DX 1.0 and machine/agent-readable systems will be critical**

  With the rise of AI and agents, it will be increasingly important to have a robust API foundation based on predictable and consistent patterns that are easily digestible for systems. This may be more important than everything else. Time will tell.

  The AI-first layer for Developer Experience will create downward pressure on the foundations of platforms. In a world where AIs are great at mimicking patterns, they will quickly highlight divergences and edge cases that you previously could sugarcoat away in your bespoke abstractions.

  This applies to the design of APIs, how they are described and published to the world (OpenAPI specification), and how core concepts are explained in the documentation.

  This foundational information provides the baseline for any model and generative layer, and it will be critical for any platform to provide this strong foundation.

  Because of this downward pressure, I expect that we will identify _new shortcomings in our existing formats and tools_, and we, as an industry, will need to _invent and build new formats/standards/tools_ that are built for an _ai-first world_ instead of _human-first_ one.

- **The transition from generalized to AI-first DX will be gradual**

  Because a strong foundation is needed, we will see a gradual transition from generalized DX to AI-first DX, where the new capabilities provided by AI will be layered on top of the existing DX infrastructure.

  We will see the companies with the best DX 1.0 experiences be the ones best positioned to leverage AI's new capabilities, but I expect to see a new generation of [DXI companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) emerge that are focused on providing AI-first DX experiences and leaping ahead of the competition, which is still stuck in the mindset of the DX 1.0 world.

## What could some of the DX 2.0 pieces look like?

Let's dream a little and imagine what a DX 2.0 lens would mean for the typical aspects of DX:

{% table %}

- **Aspect**
- **DX 1.0**
- **DX 2.0**

---

- Boilerplate and Scaffolding
- - Hard-coded templates per framework/language with variable substitution offered via CLIs and other tools.
- - Code-generated projects tailored to specific requirements based on baseline templates and fine-tuning, allowing for hyper-personalization.
    {% tweet_embed id="1734604588282794237" /%}
  - AI-powered agents trained on your platform can generate code projects on demand and provide instant guidance and support to developers.

---

- Authoring
- - Code-completion based on static analyzers and language servers
- - AI-powered code-completion powered by AIs trained on LLMs + authoring specific data sets like LSP, DAP, and in-editor buffers.

---

- Debugging
- - Manual inner-loop debugging inside editors

- - Agent-based debugging based on user feedback, traffic patterns, and product usage.

---

- Docs, tutorials, integration guides, and samples
- - Bespoke hand-written content is mainly written by technical writers and developer advocates.
  - Integration guides and samples are hand-crafted and built as bespoke experiences.
- - AI-generated content based on embeddings from baseline content, making it possible to tailor content to specific reading styles, tones, technical understanding levels, and languages.
  - Content is now instantly translated into 150+ languages.
  - Audio guides are instantly generated
  - Automatic content generation based on user feedback, traffic patterns, and product usage.
  - Code examples are generated on demand and can be tailored to coding standards, conventions, and other practices by the individual developer.

--

- Developer support
- - Front-line developer support on GitHub and Discord staffed by developer relations and solution architects.
- - AI-powered AI teammates, like [https://dosu.dev/](https://dosu.dev/) or [https://www.duckie.ai/](https://www.duckie.ai/), who are trained on your platform and can provide instant support and guidance to developers and escalate to human beings when needed.

---

- Solution architects
- - Human solution architects trained on your platform and can provide guidance and support to developers.
  - Bespoke demos and integrations are built by solution architects on a customer
- - AI-powered Agents who are trained on your platform and can provide instant guidance and support to developers
  - Self-service demos that are code-generated and tailored to specific requirements.

---

- API References
- - OpenAPI-spec powered API references that are generated into static formats.
- - A new AI-first definition format for APIs that helps AIs and agents better reason about your APIs.
  - On-demand generated and hyper-personalized API references.

---

- API SDKs
- - Bespoke hand-written SDKs wrapping APIs in neatly convenient abstractions to make API requests easier in a given language.
  - Code-generated SDKs based upon OpenAPI specs and templates to provide generalized SDKs for a given language.
  - Bespoke higher-level SDKs for frameworks
- - AI-generated and copy-pasteable API SDKs like @shadcn UI Components, but for APIs.
    {% tweet_embed id="1746973054352150775" /%}
  - AI-generated SDKs tailored to the developer's specific code base and requirements.

---

- Developer Advocacy content
- - Bespoke video productions for YouTube and related platforms, mainly produced in English and potentially localized to other languages.
  - Bespoke podcast recordings and blog posts.
  - Hand-crafted conference talks.
- - AI-generated video content powered by tools like [synthesia.io](https://www.synthesia.io) that can be instantly translated into 150+ languages.
  - DevRel Avatars are available in every demographic, age range, and language and can provide developers instant guidance and support.
  - AI clones of developer community influencers who can now speak any language and scale themselves infinitely.
    {% tweet_embed id="1732077613127237819" /%}

{% /table %}

## It's early, but the shift is happening

We are on the edge of a new era for developer experience, and I’m incredibly excited to see what we will be building in our industry. AI is a once-in-a-generation capability unlock that now makes it possible to completely rethink and transform how we think about developer experience, as the consumer of DX for the first time might not just be a human but also an AI.

It looks like I'm not alone:

{% tweet_embed id="1733582809074393571" /%}

I regularly share thoughts and perspectives on developer experience and developer platforms, so follow me at [@auchenberg](https://twitter.com/auchenberg).

If you are working on something in this space, I want to talk with you. I'd love to riff about the future, and if you are lookling for funding; I'm actively to fund early AI-first DX companies via [developers.vc](http://developers.vc).

Best, Kenneth

## Questions I've started to ask myself

(in no particular order)

- Can traditionally expensive and bespoke code examples and demos now be generated by AIs?
- In a world where it's almost free to generate code examples, what more does this enable?
- What does it mean for typical industry experts if AI models can be trained to provide even more comprehensive insights and perspectives than even the best humans?
- In a world where AI agents write integrations and consume your platform, how do you provide a great developer experience for such systems?
- Will optimizing your platform and developer experience for an agentic world be more important than optimizing for a human world? Why? Why not?
- How can we all leverage AI agents to provide a great developer experience for regular software engineers?
- Let’s say an AI agent tries to consume your platform/API and wants to write some code using your abstractions, but it gets an error. How do you provide a great DX for the Agent?
- Will it be more critical to help the system than the human supervising the Agent?
- Will there be different API abstractions for humans and AIs?
- What will make DX better for AIs but worse for humans? What are examples of the opposite?
- How many developers are getting onboarded to your platform via AIs and copilots today? Do you even know?
- How do you ensure your UI abstractions work with Vercel v0 and other GenAI UI tools?
- How do you ensure ChatGPT and Copilots explain your core concepts correctly?
- How do you SEO optimize your content for ChatGPT and Perplexity AI?
- What does this mean for your traditional education and localization strategy if AIs can translate things on the fly?
- How do we ensure Copilots generate the correct integration code for your API and platform? Do you even know?
- What does this mean for traditionally code-generated API SDKs if AIs can generate these directly inside code bases?
- What might “AI/Agent-first" abstractions, protocols, and error messages look like?
- What does this mean for video content if AIs can generate it on demand?
- What does it mean for traditional DevRel teams and their strategies?
- How will developers test/understand the degree to which copilot-type systems can understand their APIs/etc.?
  - Will a new form of automated testing be built to assist with this?
- Will copilot-style products become a form of discovery/marketplace for developer products?
  - A natural extension of suggesting which code to write is suggesting which vendor to use and helping you set them up. Imagine this becoming more like a developer platform - where I can adequately “publish” my API to GitHub CoPilot instead of just learning about it during model training.
- Will we end up with specifications with two variations - one for machines and one for humans? (Eg, robots.txt for documentation that tells a model to look at X instead)
  - You can imagine a similar principle for APIs, error messages, console logs, etc
- If we have infinite intern-level AI agents today, when will we have senior-level AI agents? Staff? What's the timeline?
- What does it mean for Developer Experience if all engineers instantly are senior due to AI?
- How do companies prevent exploit and security issues in a world where AIs and Agents are writing integrations?

## Related reading

- [AI Is Rewiring Coders’ Brains. Yours May Be Next](https://www.wired.com/story/fast-forward-ai-rewiring-coders-brains-github-copilot/)
- [From Syntax to Semantics](https://www.alessiofanelli.com/posts/syntax-to-semantics)
- [Software Systems in a World of LLMs](https://davistreybig.substack.com/p/software-systems-in-a-world-of-llms)
- [Insights from building @stripe's developer platform & API developer experience: Part 1](https://kenneth.io/post/insights-from-building-stripes-developer-platform-and-api-developer-experience-part-1)
- [Developer Experience Infrastructure (DXI)](https://kenneth.io/post/developer-experience-infrastructure-dxi)

_Thanks to [@fanahova](https://twitter.com/fanahova), [@nickBruun](https://twitter.com/nickBruun), [@treybigDavis](https://twitter.com/TreybigDavis), [@nkohari](https://twitter.com/nkohari), [@ianmst](https://twitter.com/ianmst), [@indexzero](https://twitter.com/indexzero), [@mortenjust](https://twitter.com/mortenjust), [@terkelg](https://twitter.com/terkelg) for providing feedback on early drafts of this post._
