---
layout: post
title: 'Integrations and the service-provider side of AI and agentic systems'
date: 2025-01-21 09:00
published: true
comments: true
categories:
description:
---

As we move into an agentic world where AI systems will take action on our behalf, there’s a significant part of the ecosystem that’s currently underserved in terms of infrastructure and protocols, and that's the **integrations and service-provider side for AI and agentic systems**

Looking back at 2024, we saw a range of new frameworks and runtimes focused on building AI systems a(nd agents), but far fewer companies focused on the service provider side of AI and agentic systems — which, in my opinion, is the most important aspect.

In the not-so-distant future, we will all have agents working on our behalf. Some agents will be built into our phones and laptops ([Apple Intelligence](https://www.apple.com/apple-intelligence/) and [Gemini](https://blog.google/products/android/android-gemini-google-ai/)), while others will address more vertical-specific needs, like writing code ([Devin](https://www.cognition.ai/), Cursor), managing customer service (Hello [Lorikeet](https://www.lorikeetcx.ai/) and [Intercom Fin](https://www.intercom.com/fin)) or doing research ([Perplexity](https://www.perplexity.ai/)).

The common thread for all of these agents is that they need to interact with the existing world of services and software to **retrieve production data, and take actions on user’s behalf**. Today, this behavior has emerged as `tools for LLMs`, where every major model provider now supports a way to pass on a set of pre-defined tools for LLMs to call when they need to go beyond their pre-trained knowledge, and when they need to take actions.

It’s January 2025, and tools for LLMs are the Wild West.

Each service provider must figure out how to make their services available to a given LLM or agent. This varies across every AI provider, every LLM, and every AI agent framework. In many ways, this feels similar to the early days of Web 2.0, where building mashups was painful — until a standard like OAuth emerged to solve authentication challenges and introduce a well-defined workflow for interacting with third-party APIs.

## Using tools with AI Agents today is like the early days of Web 2.0

Today, if you are building an agent, you are probably first choosing what framework you want to use. Then, you select a model provider. If you want your agent to interact with tools and services, you have two options:

1. **Write your own small tools:** These are usually bits of glue code that invoke APIs or shell out to bash to automate things locally.

2. **Use pre-made packages:** For example, Stripe’s [agent toolkit](https://stripe.dev/blog/adding-payments-to-your-agentic-workflows) provides a prebuilt adapter between the agent framework and the regular Stripe API SDK.

   ```typescript {% source="https://stripe.dev/blog/adding-payments-to-your-agentic-workflows" %}
   import {StripeAgentToolkit} from '@stripe/agent-toolkit/ai-sdk';
   import {openai} from '@ai-sdk/openai';
   import {generateText} from 'ai';

   const toolkit = new StripeAgentToolkit({
     secretKey: 'sk_test_123',
     configuration: {
       actions: {
         // ... enable specific Stripe functionality
       },
     },
   });

   await generateText({
     model: openai('gpt-4o'),
     tools: {
       ...toolkit.getTools(),
     },
     maxSteps: 5,
     prompt: 'Send <<email address>> an invoice for $100',
   });
   ```

When peeking under the surface of the Stripe agent toolkit, we find something interesting: the toolkit essentially consists of a set of prompts that describe each API operation to the LLM and outline the input parameters for how the AI should use this “tool”, which is an API request to Stripe.

```typescript {% source="https://github.com/stripe/agent-toolkit/blob/main/typescript/src/shared/prompts.ts" %}
export const createCustomerPrompt = `
This tool will create a customer in Stripe.

It takes two arguments:
- name (str): The name of the customer.
- email (str, optional): The email of the customer.
`;

export const listCustomersPrompt = `
This tool will fetch a list of Customers from Stripe.

It takes no input.
`;

export const createProductPrompt = `
This tool will create a product in Stripe.

It takes two arguments:
- name (str): The name of the product.
- description (str, optional): The description of the product.
`;
```

This approach is, first of all, incredibly smart and lightweight. However, when thinking about it, it made me wonder whether this is truly the end destination for how service providers will publish their tools and actions to AIs.

I’m reminded of Bret Victor’s classic talk, “The Future of Programming,” from 13:21 to 16:22, where he shares this provocative idea about dynamic service discovery and loose coupling between systems:

{% youtube src="https://www.youtube.com/embed/8pTEmbeENF4?si=ZxRYbfhIMIms6GRS&amp;start=801"  width="600" height="300" /%}

Building on this perspective, we can draw many parallels to what’s happening in the market today and what might be coming in the future. AI models now have the opportunity to evolve from static and centralized solution spaces to a more dynamic and decentralized solution space for service discovery.

## The integrations and service-provider landscape today

When I look at the landscape for AI tools today, I see a young market with emerging players reacting to current demands. The focus is on making it easier to **build AI agents**, with solutions centered around productivity, centralization, and aggregation.

This approach will be great in the short term to boost the supply side of AI agents. However, as I consider the mid-to-long-term stage and the potential endgame for the ecosystem of AI tools, I believe what we are seeing today represents a form of local maxima of the current state of the market. Looking into the future, I think we will see more parallels to how APIs and services are integrated and consumed today.

Today, APIs and services are characterized by the following:

1. **Discovery**: While discovery may not be as dynamic as Bret Victor envisioned, developers discover APIs and services in decentralized ways.
2. **Tightly coupled, but well-defined**: Integrations between systems are often hard-coded, but many API providers offer specifications like OpenAPI, which describe their APIs in a standardized and well-defined format.
3. **No gatekeepers**: Services are inherently decentralized, with no central app-store-like gatekeeper controlling access to services.
4. **Aggregation**: Unified API providers like Merge exist, but they are the exception rather than the norm. The majority of service providers publish their APIs individually, maintaining control over the experiences they offer and how they do so.

## AI Tools and integrations market map

So in typical VC fashion, I’ve created a new market map of what I call the `AI tools and integrations landscape`, that captures startups and companies that are enabling AIs and agentic systems to interact with the world around then.

The landscape is dvided into several layers spanning from the most high-level integration layer to the most low-level model provider layer, and features the startup and companeis that I think are most interesting in this space, but naturally, this is not a comprehensive list.

{% image src="https://raw.githubusercontent.com/auchenberg/ai-tools-integrations-market-map/refs/heads/main/output/market-map.png" /%}

So if you think I missed something, I've made the market map fully [open-source and updatable via Github](https://github.com/auchenberg/ai-tools-integrations-market-map/), so feel free to contribute on GitHub by [opening a PR](https://github.com/auchenberg/ai-tools-integrations-market-map/?tab=readme-ov-file#how-to-contribute) to either add a company, or update an existing one.

## Opportunities and what might be next

When making parallels to how APIs and service providers are providing their services today, I do think a more clear picture of what might be next for AI Tools is emerging, where few interesting things stands out:

1.  **More AI toolkit SDKs for popular AI Agent frameworks**  
    In the short term, we will see more AI agent toolkits, like the one provided by Stripe. Every popular service provider will likely build their own toolkits to make it easier to integrate their services with AI agents.

    Furthermore, I wouldn’t be surprised if DXI providers like [StainlessAPI](https://www.stainlessapi.com/) and [Speakeasy](https://www.speakeasy.com/) step in to make it easier for such companies to create and offer these toolkits.

2.  **Short term App-store-like aggregators**  
    To address the short-termdiscovery problem, I believe we will see more short-term aggregators that will act as a centralized registry for AI tools, but as a general outlook I think these aggregators will be superseeded by decentralized discovery.

    {% tweet_embed id="1869451032666747341" /%}

3.  **Decentralized discovery will emerge**

    Back in 2023 we saw OpenAI launch [ChatGPT Plugins](https://openai.com/index/chatgpt-plugins/), which was a way for developers to create a new way to interact with ChatGPT, and they took a decentralized approach to discovery, where developers could create and self-host plugin manifests, which were dynamically discoverable by ChatGPT.

    In 2024, we saw the [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) emerge from Anthropic as a new standard on how applications provide context to LLMs, which has already seen good adoption among service providers.

    Building on these two examples, I believe a similar protocol, standard, or convention will emerge for decentralized tool discovery. It will likely resemble something more like [llms.txt](https://llmstxt.org/) than a centralized npm-style registry. I don’t think it’s too far-fetched to envision something like `/.well-known/agent_tools.txt`, which could describe details such as:

    ```markdown {% source="/.well-known/agent_tools.txt" %}
    # agent_tools.txt

    This file describes the tools offered by Stripe for AIs and agentic systems.

    Base API: https://api.stripe.com
    MCP endpoint: mcp://api.stripe.com/mcp
    OpenAPI spec: https://github.com/stripe/openapi/blob/master/openapi/spec3.json

    ## Tools

    - Create Customer

      POST /v1/customers
      This tool will create a customer in Stripe.
      It takes two arguments: - name (str): The name of the customer. - email (str, optional): The email of the customer.

    - List Customers

      GET /v1/customers
      This tool will fetch a list of Customers from Stripe.
      It takes no input.

    - Contact Support

      https://support.stripe.com/contact
      This tool will contact Stripe support.
      Fill out the form and submit.
    ```

    We have already seen some of this thinking being incorporated into the MCP roadmap.

    {% tweet_embed id="1874853921543553147" /%}

4.  **Emergence of Agent-first interfaces**

    When looking at the tooling interface itself and how future integrations between AI agents and services will work, I think a good question to ask is whether we will see a new generation of interfaces emerge that are more efficient and better suited for AI agents.

    Today, agents primarily use two interfaces:

    1.  **Agents making API requests**
        Today most agents make API requests to integrate with modern systems, where the model usually ingests an OpenAPI spec and generates an HTTP client on the fly to make the request. This approach requires a computing environment to be available for the AI agent, and mimics how traditional systems interact with APIs today.

    2.  **Agents using browser automation to emulate human interaction**
        Another common interface is browser automation, where the AI agent automates a headless browser running locally or in the cloud through services like [Browserbase](https://www.browserbase.com/).

        Browser automation is a great solution for services that don’t offer APIs and emulates how humans interact with the internet today. I think browser automation is a requirement for the long tail, as the reality is that few services offer APIs, and even fewer will offer new agent-first interfaces.

        In some ways I think of browser automation as the interface to the legacy world that was built in a human-first world.

    However, when zooming out neither of these two interfaces feels truly great or efficient: As a service provider, you don’t want AI agents to go wild with code generation and inadvertently DDoS your API. On the browser automation side, you don’t want agents emulating real humans through browsers either, as you can't control the behavior of the browser.

    So, instead I think we will the emergece of agent-first service interface, that allows agents to interact with services in more efficient ways, that are optimized for the interaction patterns and edge-cases for when AI agents are treated as a new client for your service.

5.  **Treating agents as a new client type for service providers**

    Service providers will fundamentally want to assert more control over what AI agents are doing with their services.

    In many ways, parallels can be drawn to the desktop-to-mobile transition: the first generation of infrastructure treated mobile as just another desktop client, while later generations treated mobile as a new and distinct interface.

    This happened due to desires about control, and I think a similar thing will happen for agents.

6.  **New service-provider-focused AI Agent infrastructure**

    Treating agents as a new client type for service providers, and when combined with the potentiel emergence of agent-first interfaces, will likely lead to a new generation of infrastructure focused on access control, usage patterns, billing, and monetization as AI agents become more widely deployed.

    I think we will see a new generation of **service-provider-focused AI agent infrastructure**, that will make it easier to **retrofit an agentic interface to existing services**.

If you’re working on something in this space, I want to talk with you. I’d love to riff about the future, and if you’re looking for funding, I’m actively funding early-stage AI agent tools companies — so reach out!

That’s it for now.

Best,  
Kenneth

### Relevant reading

{% references %}

- [https://www.letta.com/blog/ai-agents-stack](https://www.letta.com/blog/ai-agents-stack)
- [https://llmstxt.org/](https://llmstxt.org/)
- [https://www.answer.ai/posts/2024-09-03-llmstxt.html](https://www.answer.ai/posts/2024-09-03-llmstxt.html)
- [https://stripe.dev/blog/adding-payments-to-your-agentic-workflows](https://stripe.dev/blog/adding-payments-to-your-agentic-workflows)
- [https://x.com/AtomSilverman/status/1860098409778282842](https://x.com/AtomSilverman/status/1860098409778282842)
- [https://www.anthropic.com/research/building-effective-agents](https://www.anthropic.com/research/building-effective-agents)
- [https://x.com/ianlivingstone/status/1869451032666747341](https://x.com/ianlivingstone/status/1869451032666747341)
- [https://x.com/alexalbert\_\_/status/1874853921543553147](https://x.com/alexalbert__/status/1874853921543553147)

{% /references %}
