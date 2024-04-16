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

Back in 2022, I wrote a blog post about what I call [developer experience infrastructure](https://kenneth.io/post/developer-experience-infrastructure-dxi), which outlines a thesis around the "servicification" of Developer Experience that had started to emerge as a new set of infrastructure services, like SDK-as-a-service, to make it easier to provide a great (API) DX without building large in-house DX teams.

{% image src="/images/posts/ai-first-dx/splash.png" title="spell_check" /%}

Since 2022, we have seen a wave of [DXI companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) emerge. However, we have also started to see a paradigm shift for developer tools with the arrival of LLMs and, in particular, GPT-4-like quality models. These have enabled a new generation of AI-enabled tools like GitHub Copilot to take developer tools and developer experience to new levels.

In this blog post, I will outline a few of my thoughts as I've been talking to founders, investors, and builders in the world of developer experience. I want to outline a few hypotheses and assumptions I have for the future and describe how I see the impact of AI on DX, which I've started to call the rise of AI-first Developer Experience and DX 2.0.

{% tweet_embed id="1735406634241773972" /%}

## DX 1.0: The era of generalized DX

Today, we are in the “DX 1.0" world, where we have typically been building developer experiences around generalized personas, like a specific set of languages, runtimes, or frameworks. Typically, a company builds out a generalized baseline for its DX and goes deeper into specific verticals like front-end developers and NextJS by building specific product experiences and content for relevant languages and frameworks.

The challenge of building these specialized experiences has traditionally been resources, as each of these experiences has been meticulously crafted by individuals (or teams) who possess a deep understanding of the intricate details required to build a superior experience for a specific framework or language.

In other words, targeting a new framework/language or runtime has been very expensive, so most companies have been focused on providing a good enough baseline. At the same time, only a few have had the resources to invest into specific verticals.

Today most [DXI companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) focus on helping companies with the general baseline, while a few startups are carving out niches by targeting specific their niches, but with the arrival of AI, I think there’s a new frontier emerging and the key unlock here is the capabilities enabled by AI.

## What’s changing?

With the arrival of AI, we have started to see the realized impact of the rise of [Software 3.0](https://medium.com/@itamar_f/software-3-0-the-era-of-intelligent-software-development-acd3cafe6cd7) and AI/LLM powered Developer Tools, where we are going through one of the few fundamental paradigm/platform shifts in our industry, as we are transitioning from a world where 80% of all code is written by humans to a reality where the majority of code will be authored by LLMs/Agents.

So, what’s changing with our developer tools and developer workflows?

A few observations:

- **The cost of writing code is going to zero**
  Many years ago, I gave the closing keynote at a conference, where I spoke about the future of developer tools. One of the things I spoke about was the potential consequences of automation within our industry.

  Back in 2017, we would see WEF headlines about this, and the framing would always be around the industrial factory worker getting automated by the machines, like this:

  {% image src="/images/posts/ai-first-dx/wef.png" title="wef" /%}

  Now, in 2024, it has become clear that the white-collar programmer getting paid $1M a year at Google is about to experience radical change to software engineering and their jobs as we see AIs impacting what it means to write code.

  Today, most code is still written by hand, but in just a few years, my prediction is that we will live in a world where the vast majority of code has been written, in one form or another, by an AI.

  We will look back at the pre-AI days and think about the bespoke "artisanal hand-crafted code" written by these incredible humans, much like how we feel about handwritten machines or assembly code. It's the natural evolution of the never-ending quest to move to higher abstractions, and thanks to LLMs, human languages are now programming languages.

  However, this also means that the nature of "writing code" is changing, and the role of Developer Experience and abstractions will change in a world where systems will author code.

  A few thoughts:

  - Can traditionally expensive and bespoke code examples and demos now be generated by AIs?
  - In a world where it's almost free to generate code examples, what more does this enable?
  - Will it be possible to provide hyper-personalized documentation and demos to every unique developer?
  - What does hyper-personalization mean to every tool and component provided for developers?
  - What does this mean for education and coding boot camps?

- **Writing perfect syntax is getting offloaded to AIs**

  With the rise of AIs, we have seen Copilot-like experiences become the new normal for software engineers. Developers can now express their intents in human language through prompts and offload the cognitive effort of writing perfect syntax to an LLM, which now does the heavy lifting of writing syntax that fits perfectly into the codebase.

  Copilots are natural extensions to code-auto completion (or IntelliSense, as I would say at Microsoft), and you could say that with the arrival of Copilot, developers finally have a super-powered spell check for code.

  For the first time, we see tools acting as actual extensions to software engineers, giving them something much closer to Steve Jobs' "bicycle of the mind" than we have seen in the past.

  A few thoughts:

  - If the perfect syntax is offloaded to AIs, what does this mean for software engineering and the day to day tasks?
  - Do code examples matter to the same degree if an AI can write them on demand?

- **The cost of personalization and localization is going to zero**

  With Generative AI, we are seeing the cost of producing content like [text](https://chatgpt.com), [video](https://www.synthesia.io/), audio, and even [music](http://suno.com/) coming down and getting closer to zero. This means entirely new ways of providing localized content are opening, as it's suddenly now possible to translate content on the fly to new languages and markets without investing heavily into staffing new content teams.

  Extrapolating from localization is personalization, and here I mean hyper-personalization, as with both cost-of-content and cost-of-code coming down, entirely new ways to provide hyper-personalized developer experiences are starting to become possible, covering everything from traditional content like text to audio/video and even more interactive educational formats.

  A few thoughts:

  - What does this mean for products like docs and API references?
  - What does this mean for YouTube streamers if AIs can generate content?
  - What does it mean for traditional DevRel teams and their strategies?

- **AI provides the ultimate wisdom of the crowds**

  An interesting thing about LLMs is that they don’t per se reason about things. Instead, they are great at mimicking patterns, which means AIs can provide the _“ultimate wisdom of the crowds,”_ as [Alex Komoroske](https://www.komoroske.com/) would say.

  This is very interesting in the context of developer experience, as it’s not crazy to imagine a future where we have virtual “React experts” that are powered by AI and Agents to provide insights on what it takes to build great experiences for a given framework/runtime, or maybe they can even write the abstractions themselves?

  A few thoughts:

  - What does it mean for typical industry experts if AI models can be trained to provide even more comprehensive insights and perspectives than even the best humans?

  - What does this mean for our traditional feedback loops to provide development?

- **Majority of new (glue) code will be drafted and/or written by AIs**

  Today, many companies focus on providing great developer experience, are in the business by making the integration of their APIs into a product as smooth as possible.

  At Stripe, we called this _integration experience_, and we meticulously measured our time-to-integration and satisfaction across developer segments, cohorts, and products to the degree that we would know how long it _should_ take a JavaScript developer to make their first payments API request in production.

  I call the code you write to integrate two systems for _glue code_, and integration experience is essentially about reducing the amount of glue code needed to “glue” two systems together.

  AI is changing the nature of the integration experience, as it’s no longer the software engineer who will write this glue code but also the AI. This forces us to _fundamentally rethink_ what it means to provide a “great developer experience,” as the experience will no longer be just for humans but for both the AI and the humans orchestrating, editing, and directing the integration.

  A few thoughts:

  - What does great mean in this new context?
  - How do we ensure Copilots generate the correct integration code for your API and platform? Do you even know?
  - What does this mean for traditionally code-generated API SDKs if AIs can generate these directly inside code bases?
  - Will it be more important to have machine/LLM/agent-readable systems than human?
  - What might “AI/Agent-first" abstractions, protocol error messages look like?

- **Software development is becoming AI-first**

  In its most recent quarterly earnings, Microsoft stated that there are now 1.3 million paid GitHub Copilot users and that 50,000 companies are using it [1].

  This is an incredible adoption for a relatively new developer tool, but this also means software development is becoming AI-first and happening right in front of our eyes.

  AI-enabled tools are already being adopted by software engineers at a massive scale, where developers now are using Copilot-like coding assistants within their editors, using tools like [Vercel v0](https://v0.dev/) to bootstrap front-end UI, or using ChatGPT to write SQL queries.

  A few thoughts:

  - What does it mean to provide a great developer experience for users of Copilots and other AI-enabled tools?
  - How many developers are getting onboarded to your platform or API via a Copilot?
  - How do you ensure that your UI abstractions work with Vercel v0 and other GenAI UI tools?
  - How do you train ChatGPT and Copilots to explain your core concepts correctly?
  - Will optimizing your documentation and references for AI systems be more important than optimizing humans?
  - What does this mean for your traditional education and localization strategy if AIs can translate things on the fly?
  - How do you SEO optimize your content for ChatGPT and Perplexity AI?

- **We are seeing the edge of an agentic world**

  For the past year or so, the AI community has discussed agents and the future of an agentic world where agents will do everything for us. Until recently, this was very abstract for many software engineers until Cognition Labs released a demo of Devin, their “first AI software engineer.”

  {% tweet_embed id="1767548763134964000" /%}

  Regardless of how much of Devin is real at [this point in time](https://twitter.com/GergelyOrosz/status/1779035184978866332), the demo showed us the edge of what a potential future agentic world will look like for software engineering, and this prompts us to start to ask questions about what Developer Experience means in an agentic world.

  A few thoughts:

  - In a world where AI agents write integrations and consume your platform, how do you provide a great developer experience for such systems?
  - Will optimizing your platform and developer experience for an agentic world be more important than a human world? Why? Why not?
  - How can we all leverage AI agents to provide a great developer experience for regular software engineers?
  - Let’s say an AI agent tries to consume your platform/API and wants to write some code using your abstractions, but it gets an error. How do you provide a great DX for the Agent?
  - Will it be more critical to help the Copilot than the human supervising the Agent?
  - Will there be different API abstractions for humans and AIs?
  - What will make DX better for AIs but worse for humans? What are examples of the opposite?

## DX 2.0: The rise of AI-first developer experience

Now that I’ve outlined some of my observations and shared a few thoughts, it’s always helpful to make things more specific and tangible, so in this section, I want to outline what I think is next for developer experience.

First and foremost, with the arrival of AI, we are entering a world where most experiences will be hyper-personalized based on how well a company or product knows you. Folks like [Scott Belsky](https://twitter.com/scottbelsky?lang=en) agree with this view and call for it in his [8 Forecasts & Implications for the Years Ahead:: 2024+](https://www.implications.com/p/8-forecasts-and-implications-for) post.

When it comes to developer experience, it will be no different. In the near future, the developer services and infrastructure you are using to build with will be able to provide a hyper-personalized experience that is much, much more context-aware than the generalized experiences provided in the world of DX 1.0. The reason for this is the unlock enabled by the capabilities provided by AI.

Secondly, we will live in a world where our developer tools increasingly become AI-first, where the role of software engineering shifts from authoring to more of a “code director” role similar to art directors in design, where the software engineer orchestrates tools and agents to build software experiences and makes sure that the shape of the experiences moves in the right direction.

Guillermo Rauch from Vercel shares this view as well:

{% tweet_embed id="1733582809074393571" /%}

## What could some of the DX 2.0 pieces look like?

So, let's dream a little, and imagine what a DX 2.0 lens would mean the typical aspects of DX:

{% table %}

- **Aspect**
- **DX 1.0**
- **DX 2.0**

---

- Boilerplate and Scaffolding
- - Hard-coded templates on a per framework/language with variable substitution offered via CLIs and other tools.
- - Code-generated projects tailored to specific requirements based on baseline templates and fine-tuning, allowing for hyper-personalization.
    {% tweet_embed id="1734604588282794237" /%}
  - AI-powered agents trained on your platform can generate code projects on demand and provide instant guidance and support to developers.

---

- Docs
- - Technical writers hand-write content, mainly in English.
- - AI-generated content based on embeddings from baseline content, making it possible to tailor content to specific reading styles, tones, technical understanding levels, and languages.
  - Content is now instantly translated into 150+ languages.
  - Audio guides are instantly generated
  - Automatic content generation based on user feedback, traffic patterns, and product usage.

---

- Tutorials, Integration guides, and samples
- - Bespoke hand-written content is mainly written by technical writers and developer advocates.
  - Integration guides and samples are hand-crafted and built as bespoke experiences.
- - AI-generated content based on embeddings from baseline content, making it possible to tailor content to specific reading styles, tones, technical understanding levels, and languages.
    Code examples are generated on demand and can be tailored by the individual developer to coding standards, conventions, and other practices.

---

- Developer support
- - Front-line developer support on GitHub and Discord staffed by developer relations and solution architects.
- - AI-powered AI teammates, like [https://dosu.dev/](https://dosu.dev/), who are trained on your platform and can provide instant support and guidance to developers and escalate to human beings when needed.

---

- Solution architects
- - Human solution architects trained on your platform and can provide guidance and support to developers.
  - Bespoke demos and integrations are built by solution architects on a customer
- - AI-powered Agents who are trained on your platform and can provide instant guidance and support to developers
  - Self-service demos that are code-generated and tailored to specific requirements.

---

- API References
- - OpenAPI-spec powered API references that are generated into static formats.
- - New API-first definition format that helps AIs and Agents to better reason about your APIs.
  - On-demand generated and hyper-personalized API references.

---

- API SDKs
- - Bespoke hand-written SDKs wrapping APIs in neatly convenient abstractions to make API requests easier in a given language.
  - Code-generated SDKs based upon OpenAPI specs and templates to provide generalized SDKs for a given language.
- - AI-generated and copy-pasteable API SDKs like @shadcn UI Components, but for APIs.
    {% tweet_embed id="1746973054352150775" /%}
  - AI-generated SDKs tailored to the developer's specific code base and requirements.

---

- Developer Advocacy content
- - Bespoke video productions for YouTube and related platforms, mainly produced in English and potentially localized to other languages.
  - Bespoke podcast recordings and blog posts.
  - Hand-crafted conference talks.
- - AI-generated video content powered by tools like [synthesia.io/](https://www.synthesia.io/) that can be instantly translated into 150+ languages.
  - DevRel Avatars are available in every demographic, age range, and language and can provide developers instant guidance and support.
  - AI clones of developer community influencers who can now speak any language and scale themselves infinitely.
    {% tweet_embed id="1732077613127237819" /%}

{% /table %}

## A gradual transition from generalized to AI-first DX

Developer Experience is like a layer cake; the foundation powering is the generalized DX layer, and the new emerging AI-first DX starting to appear at the top. This means that we will see a gradual transition from generalized DX to AI-first DX, where the new capabilities provided by AI will be layered on top of the existing DX infrastructure.

We will see the companies with the best DX 1.0 experiences be the ones best positioned to leverage the new capabilities provided by AI, but I expect to see a new generation of [DXI companies](https://kenneth.io/post/developer-experience-infrastructure-dxi) emerge that are focused on providing AI-first DX experiences and taking a leap ahead of the competition, who are still stuck in the legacy DX 1.0 world.

{% image src="/images/posts/ai-first-dx/triangle.png" title="triangle" /%}

We are on the edge of a new era for developer experience, and I’m incredibly excited to see what we will be building in our industry. AI is a once-in-a-generation capability unlock that now makes it possible to completely rethink and transform how we think about developer experience, as the consumer of DX for the first time might not just be a human but also an AI.

I regularly share thoughts and perspectives on developer experience and developer platforms, so follow me at [@auchenberg](https://twitter.com/auchenberg).

Best, Kenneth

## Related reading

- [[1]https://www.wired.com/story/fast-forward-ai-rewiring-coders-brains-github-copilot/](https://www.wired.com/story/fast-forward-ai-rewiring-coders-brains-github-copilot/)
- [https://www.alessiofanelli.com/posts/syntax-to-semantics](https://www.alessiofanelli.com/posts/syntax-to-semantics)
- [https://davistreybig.substack.com/p/software-systems-in-a-world-of-llms](https://davistreybig.substack.com/p/software-systems-in-a-world-of-llms)
- [https://www.scalevp.com/insights/beyond-autocomplete-ai-enabled-tools-are-changing-what-it-means-to-be-a-developer/](https://www.scalevp.com/insights/beyond-autocomplete-ai-enabled-tools-are-changing-what-it-means-to-be-a-developer/)
