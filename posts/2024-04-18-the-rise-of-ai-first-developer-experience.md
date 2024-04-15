---
layout: post
title: 'The rise of AI-first Developer Experience and DX 2.0'
date: 2024-04-18 09:00
published: false
comments: true
draft: true
categories:
description:
---

Back in 2022 I wrote a blog post about what I call [developer experience infrastructure](https://kenneth.io/post/developer-experience-infrastructure-dxi), which outlines a thesis around the “servicification” of Developer Experience, that had started to emerge as new set of infrastructure services, like SDK-as-a-service, to make it easier to provide a great (API) DX without building large in-house DX teams.

{% image src="/images/posts/ai-first-dx/splash.png" title="spell_check" /%}

Since 2022, we have seen a wave of [DXI companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) emerge, but we have also started to see a paradigm shift for developer tools with the arrival of LLMs and and in particular GPT-4-like quality models, which have enabled a new generation of AI-enabled tools like GitHub Copilot to take developer tools and developer experience to new levels.

In this blog post, I want to outline a few of my thoughts as I've been talking to founders, investors, and builders in the world of developer experience. I want to outline a few hypotheses, and assumptions I have for the future, and try to describe how I see the impact of AI on DX, which I’ve started to call the rise of AI-first Developer Experience and DX 2.0.

{% tweet_embed id="1735406634241773972" /%}

## DX 1.0: The era of generalized DX

Today we are in the world of “DX 1.0’ where we have typically been building developer experiences around generalized personas, like a specific set of languages, runtimes or frameworks. Typically a company builds out a generalized baseline for their DX, and go deeper on specific verticals like front-end developers and NextJS by building specific product experiences and content for relevant language and framework.

The limiting factor for building these specialized experiences has typically been resources, as each of these experiences have been handcrafted by individuals (or teams) who deeply understand the intricate details of what it takes to build a great experience for said framework or language.

In other words, it's been very expensive to target a new framework/language or runtime, so most companies have been focused on providing a good enough baseline, while only a few have had the resources to invest into specific verticals.

Today most [DXI companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) focus on helping companies with the general baseline, while some startups are carving our niches by targeting their niches, but with the arrival of AI, I think there’s a new frontier emerging and the key unlock here is the capabilities enabled by AI.

## What’s changing?

With the arrival of AI, we have started to see the realized impact of the rise of [Software 3.0](https://medium.com/@itamar_f/software-3-0-the-era-of-intelligent-software-development-acd3cafe6cd7) and AI/LLM powered Developer Tools, where we are going through one of the few fundamental paradigm/platform shifts in our industry, as we are transitioning from a world where 80% of all code is written by humans to a reality where the majority of code will be authored by LLMs/Agents.

So, what’s changing with our developer tools and developer workflows?

A few observations:

- **The cost of writing code is going to zero**
  Many years ago I gave the closing keynote at a conference where I spoke about what the future might hold for developer tools, and one of the things I spoke about back then was the potential consequences of automation within our industry.

  Back in 2017 we would see WEF headlines about this, and the framing would always be around the industrial factory worker getting automated by the machines, like this:

  {% image src="/images/posts/ai-first-dx/wef.png" title="wef" /%}

  Now in 2024, it has become clear that the white-collar programmer getting paid $1M a year at Google is about to experience radical change to software engineering and their jobs, as we are seeing AIs making their impact on what it means to write code.

  Today most code in the world is still written by hand, but in just a few years my prediction is that we will live in a world where the vast majority of code will have been written, in one shape or form touched by an AI.

  We will look back at the pre-AI days and think about the days of bespoke “artisanal hand-crafted code” that was written by these incredible humans, much similar to how we are thinking about handwritten machines or assembly code. It’s the natural evolution of the never stopping quest to move to higher abstractions, and thanks to LLMs, human languages are now programming languages.

  This, however, also means that the nature of “writing code” is changing, and the role of Developer Experience and abstractions is going to change in a world where code will be authored by systems.

  A few thoughts:

  - In a world of code going to zero, what does this mean for personalization?
  - Can traditionally expensive and bespoke code examples and demos now be generated by AIs?
  - In a world where it's almost free to generate code examples, what more does this enable?
  - Will it be possible to provide hyper-personalized documentation and demos to every unique developer?
  - What does hyper personalization mean to every tool and component provided by developers?
  - What does this mean to education and coding bootcamps?

- **Writing perfect syntax is getting offloaded to AIs**

  With the raise of AIs we have seen Copilot-like experiences become the new-normal for software engineers, where developers now can express their intents in human language through prompts and offload the cognitive effort of writing perfect syntax to an LLM, that now does the heavy lifting of writing syntax that fits perfectly into the codebase. You could say that with the arrival of Copilot, developers now finally have a super-powered spell check for code.

  Copilots are natural extensions to code-auto completion (or IntelliSense as I would say at Microsoft), and for the first time we are seeing AIs acting as true extensions to software engineers, give them something much closes to Steve Jobs “bicycle of the mind” than what we have seen in the past.

  A few thoughts:

  - If perfect syntax is off-loaded to AIs, what does this mean for code-examples, documentation and integration guides?
  - Does code examples matter to the same degree if an AI can just write one?

- **The cost of personalization and localization is going to zero**

  With Generative AI we are seeing the cost of producing content like [text](https://chatgpt.com), [video](https://www.synthesia.io/), audio and even [music](http://suno.com/) coming down, and getting closer to zero. This means entire new ways of providing localized content is opening, as it's suddenly now possible to translate content on-the-fly to new languages and markets without having to invest heavily into staffing new content teams.

  Extrapolating from localization is personalization, and here I mean hyper-personalization, as with both cost-of-content and cost-of-code coming down, entire new ways to provide hyper-personalized developer experiences are starting to become possible, covering everything from traditional content like text, but also audio/video and even more interactive educational formats.

  A few thoughts:

  - What does this mean for products like docs and API references?
  - What does this mean for youtube streamers, if AIs can generate content?
  - What does it mean for traditional DevRel teams and their strategies?

- **AI provides the ultimate wisdom of the crowds**

  An interesting thing with LLMs is that they don’t per say reason about things, instead they are great at mimicking patterns, and this means AIs able to provide the _“ultimate wisdom of the crowds”_ as [Alex Komoroske](https://www.komoroske.com/) would say.

  This is very interesting in the context of developer experience, as it’s not crazy to imagine a future where we have virtual “React experts” that are powered by AI and Agents to provide insights on what it takes to build great experiences for a given framework/runtime, or maybe they can even write the abstractions themselves?

  A few thoughts:

  - What does this mean to the typical industry experts, if models can be trained to provide even more comprehensive insights, learnings and perspectives than even the best humans?
  - What does this mean for our traditional feedback loops to provide development?

- **Majority of new (glue) code will be drafted and/or written by AIs**

  Today many companies focused on providing great Developer Experience is the business of making the experience of integrating their APIs into a product as smooth as possible. At Stripe we called this* integration experience, and we meticulously measured our time-to-integration and satisfaction across developer segments, cohorts and products to the degree that we would know how long it *should\* take a JavaScript developer to make their first payments API request in production.

  I call the code you write to integrate two systems for glue code, and integration experience is essentially about reducing the amount of glue code needed to “glue” two systems together.

  AI is changing the nature of integration experience, as it’s no longer the software engineer who will be writing this glue code, but the AI. This forces us to _fundamentally rethink_ what it means to be providing a “great developer experience”, as the experience will no longer be just for the human, but for both the AI and the human orchestrating, editing and directing the integration.

  A few thoughts:

  - What does great mean in this new context?
  - How do we ensure that Copilots are generating the correct integration code for your API and platform?
  - What does this mean for traditionally code-generated API SDKs, if AIs can generate these directly inside code-bases?
  - Will it be more important to have machine/LLM/agent-readable systems than human? \* What might “AI/Agent focused“ abstractions and error messages look like?

- **Software development is becoming AI-first**

  At the most recent quarterly earnings Microsoft stated that there’s now 1.3 million paid GitHub Copilot users and noted that 50,000 different companies are now using Copilot [1].

  This is an incredible adoption for a relatively new developer tool, but this also means software development is becoming AI-first, and it’s happening right in front of our eyes.

  AI-enabled tools are already being adopted by software engineers at a massive scale, where developers now are using Copilot-like coding assistants within their editors, using tools like [Vercel v0](https://v0.dev/) to bootstrap front-end UI, or using ChatGPT to write SQL queries.

  A few thoughts:

  - What does it mean to provide a great developer experience for users of Copilots and other AI-enabled tools?
  - How many of your developers are getting on boarded to your platform or API via a Copilot?
  - How do you ensure that your UI abstractions work with Vercel V0?
  - How do you educate ChatGPT and Copilots to explain your core concepts correctly?
  - Will it be more important to optimize your documentation and references for AI systems than humans?
  - What does this mean for your traditional education and localization strategy, if AIs can translate things on the fly?
  - How do you SEO optimize your content for ChatGPT and Perplexity AI?

- **We are seeing the edge of an agentic world**

  For the past year or so, everyone in the AI community has been talking about agents and the future of an agentic world where agents will do everything for us. Until recently it was very abstract for many software engineers, until we saw Cognition Labs releasing a demo of Devin, their “first AI software engineer”.

  {% tweet_embed id="1767548763134964000" /%}

  Regardless of how much of Devin is real at [this point in time](https://twitter.com/GergelyOrosz/status/1779035184978866332), the demo showed us the edge of what a potential future agentic world will look like for software engineering, and this prompts us to start to ask questions about what Developer Experience means in an agentic world.

  A few thoughts:

  - In a world where AI agents are writing integrations and consuming your platform, how do you provide a great developer experience for such systems?
  - Will it be more important to optimize your platform and developer experience for an agentic world than a human world? Why? Why not?
  - How can we all leverage AI agents to provide a great developer experience for regular software engineers?
  - Let’s say an AI agent tries to consume your platform/API, and wants to write some code using your abstractions, but it gets an error. How do you provide a great DX for the agent?
  - Will it be more important to help Copilot than the human supervising the Agent?
  - Will there be different API abstractions for humans and AIs?
  - What are things that will make DX better for AIs, but worse for humans? What are examples of the opposite?

## DX 2.0: The rise of AI-first developer experience

Now that I’ve outlined some of my observations and shared a few thoughts it’s always helpful to make things more specific and tangible, so in this section I want to outline what I think it’s next for developer experience.

First and foremost, with the arrival of AI we are entering a world where most experiences are going to be hyper-personalized based on how well a company or product knows you. Folks like [Scott Belsky](https://twitter.com/scottbelsky?lang=en) agree with this view and call for this in his [8 Forecasts & Implications for the Years Ahead :: 2024+](https://www.implications.com/p/8-forecasts-and-implications-for) post.

When it comes to developer experience it will be no different. In the near future developer services and infrastructure you are using to build with, will be able to provide a hyper-personalized experience that is much much more context aware than the generalized experiences provided in the world of DX 1.0, and the reason for this is the unlock enabled by the capabilities provided by AI.

Secondly, we will live in a world where our developer tools increasingly become AI-first, where role of the software engineering shifts from authoring to more of a role of a “code director” similar to art directors in design, where the software engineer is orchestrating tools and agents to build software experiences, and makes sure that the shape of the experiences move in the right direction.

Guillermo Rauch from Vercel shares this view as well:

{% tweet_embed id="1733582809074393571" /%}

## What could some of the DX 2.0 pieces look like?

So, let's dream a little, and imagine what a DX 2.0 lens would mean the typical aspects of DX:

{% table %}

- **Aspect**
- **DX 1.0**
- **DX 2.0**

---

- Boilerplating and Scaffolding
- - Hard-coded templates on a per framework/language with variable substitution offered via CLIs and other tools.
- - Code-generated projects tailored to specific requirements based on baseline templates and fine-tuning, allowing for hyper-personalization.
    {% tweet_embed id="1734604588282794237" /%}
  - AI-powered Agents who are trained on your platform and can provide generate code projects on demand, and can provide instant guidance and support to developers.

---

- Docs
- - Hand-written content by technical writers, mainly in English.
- - AI-generated content based on embeddings from baseline content, making it possible to tailor content to specific reading styles, tones, technical understanding levels and languages.
  - Content is now instantly translated into 150+ languages.
  - Audio guides are instantly generated
  - Automatic content generation based upon user-feedback, trafific patterns and product usage.

---

- Tutorials, Integration guides, and samples
- - Bespoke hand-written content by mainly technical writers and developer advocates.
  - Integration guides and samples are hand crafted and built as bespoke experiences.
- - AI-generated content based on embeddings from baseline content, making it possible to tailor content to specific reading styles, tones, technical understanding levels and languages.
  - Code examples are generated on demand based and can be tailored to coding standards, conventions and other practices, by the individual developer.

---

- Developer support
- - Front-line developer support on GitHub and Discord staffed by developer relations and solution architects.
- - AI-powered AI-teammates, like [https://dosu.dev/](https://dosu.dev/) who are trained on your platform and can provide instant support and guidance to developers, and can escalate to human beings when nedeed.

---

- Solution architects
- - Human solution architects who are trained on your platform and can provide guidance and support to developers.
  - Bespoke demos and integrations are built by solution architects on a customer
- - AI-powered Agents who are trained on your platform and can provide instant guidance and support to developers
  - Self-service demos that are code-generated and tailored to specific requirements.

---

- API References
- - OpenAPI-spec powered API references that are generated into static formats.
- - New API-first definition format, that help AIs and Agents to better reason about your APIs.
  - On-demand generated and hyper-personalized API references.

---

- API SDKs
- - Bespoke hand-written SDKs wrapping APIs in neatly convenient abstractions to make API requests easier in a given language.
  - Code-generated SDKs based upon OpenAPI-specs and templates to provide generalized SDKs for a given language.
- - AI-generated and copy-pasteable API SDKs like @shadcn UI Components, but for APIs.
    {% tweet_embed id="1746973054352150775" /%}
  - AI-generated SDKs that are tailored to the specific code-base and requirements of the developer.

---

- Developer Advocacy content
- - Bespoke video productions for YouTube and relatated platforms, mainly produced in English, and potentially localized to other languages.
  - Bespoke podcast recordings and blog posts.
  - Hand-crafted conferences talks.
- - AI-generated video content powered by tools like [synthesia.io/](https://www.synthesia.io/) that can be instantly translated into 150+ languages.
  - DevRel Avatars available in every demographic, age range, and language, that can provide instant guidance and support to developers.
  - AI-clones of developer community influencers who now can speak in any language, and scale themselves infinitely.
    {% tweet_embed id="1732077613127237819" /%}

{% /table %}

## A gradual transition from generalized to AI-first DX

Developer Experience is like a layer cake, where the baseline powering is the generalized DX layer, and the AI-first DX is the top layer. This means that we are going to see a gradual transition from generalized DX to AI-first DX, where the new capabilities provided by AI will be layered on top of the existing DX infrastructure.

We will see the companies with the best DX 1.0 experiences, be the ones who are best positioned to leverage the new capabilities provided by AI, but I expect to see a new generation of [DXI companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) emerge that are focused on providing AI-first DX experiences, and take a leap head of the competition, who are still focused on the DX 1.0 world.

{% image src="/images/posts/ai-first-dx/triangle.png" title="triangle" /%}

We are on the edge of a new era for developer experience, and I’m incredibly excited to see what we all will be building in our industry. AI is a once-a-generation capability unlock that now makes it possible to completely rethink and transform how we think developer experience, as the consumer of DX for the first time might not be a human — but an AI.

As always if you are working on something in this space, I want to talk with you. Whether you want to chat or seek funding this little thing that I call [developers.vc](http://developers.vc/).

I regularly share thoughts and perspectives on developer experience and developer platforms, so follow me at [@auchenberg](https://twitter.com/auchenberg).

Best,
Kenneth

## Related reading

- [[1]https://www.wired.com/story/fast-forward-ai-rewiring-coders-brains-github-copilot/](https://www.wired.com/story/fast-forward-ai-rewiring-coders-brains-github-copilot/)
- [https://www.alessiofanelli.com/posts/syntax-to-semantics](https://www.alessiofanelli.com/posts/syntax-to-semantics)
- [https://davistreybig.substack.com/p/software-systems-in-a-world-of-llms](https://davistreybig.substack.com/p/software-systems-in-a-world-of-llms)
- [https://www.scalevp.com/insights/beyond-autocomplete-ai-enabled-tools-are-changing-what-it-means-to-be-a-developer/](https://www.scalevp.com/insights/beyond-autocomplete-ai-enabled-tools-are-changing-what-it-means-to-be-a-developer/)
