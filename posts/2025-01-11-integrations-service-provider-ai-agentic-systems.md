---
layout: post
title: 'Integrations and the service-provider side of AI and agentic systems'
date: 2025-01-12 09:00
published: false
comments: true
draft: false
categories:
description:
---

As we move into an agentic world where AI systems will take action on our behalf, there’s a significant part of the ecosystem that’s currently underserved in terms of infrastructure and protocols, and that's the **integrations and service-provider side for AI and agentic systems**

Looking back at 2024, we saw a range of new frameworks and runtimes focused on building AI systems a(nd agents), but far fewer companies focused on the service provider side of AI and agentic systems — which, in my opinion, is the most important aspect.

In the not-so-distant future, we will all have agents working on our behalf. Some agents will be built into our phones and laptops ([Apple Intelligence](https://www.apple.com/apple-intelligence/) and [Gemini](https://blog.google/products/android/android-gemini-google-ai/)), while others will address more vertical-specific needs, like writing code ([Devin](https://www.cognition.ai/), Cursor), managing customer service (Hello [Lorikeet](https://www.lorikeetcx.ai/) and [Intercom Fin](https://www.intercom.com/fin)) or doing research ([Perplexity](https://www.perplexity.ai/)).

The common thread for all of these agents is that they need to interact with the existing world of services and software to take action on users’ behalf. This behavior has emerged today as `tools for LLMs`, where every major model provider now supports a way to pass on a set of pre-defined tools for LLMs to call when they need to take action or go beyond their pre-trained knowledge.

It’s January 2025, and tools for LLMs are the Wild West.

Each service provider must figure out how to make their services available to a given LLM or agent. This varies across every AI provider, every LLM, and every AI agent framework. In many ways, this feels similar to the early days of Web 2.0, where building mashups was painful — until a standard like OAuth emerged to solve authentication challenges and introduce a well-defined workflow for interacting with third-party APIs.

**Using tools with AI Agents today is like the early days of Web 2.0**  
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

\<market map visualization with  
[https://composio.dev/](https://composio.dev/)  
[https://exa.ai/](https://exa.ai/)  
[https://www.browserbase.com/](https://www.browserbase.com/)  
[https://toolhouse.ai/](https://toolhouse.ai/)  
[https://python.langchain.com/docs/integrations/tools/](https://python.langchain.com/docs/integrations/tools/)  
[https://funct.me/](https://funct.me/)  
[https://platform.openai.com/docs/actions/actions-library](https://platform.openai.com/docs/actions/actions-library)  
[https://huggingface.co/docs/transformers/en/agents](https://huggingface.co/docs/transformers/en/agents)  
https://www.anon.com/

![][image2]  
\>

This approach will be great in the short term to boost the supply side of AI agents. However, as I consider the mid-to-long-term stage and the potential endgame for the ecosystem of AI tools, I believe what we are seeing today represents a form of local maxima. Looking into the future, I think we will see more parallels to how APIs and services are integrated and consumed today.

Today, APIs and services are characterized by the following:

1. **Discovery**: While discovery may not be as dynamic as Bret Victor envisioned, developers discover APIs and services in decentralized ways.
2. **Tightly coupled, but well-defined**: Integrations between systems are often hard-coded, but many API providers offer specifications like OpenAPI, which describe their APIs in a standardized and well-defined format.
3. **No gatekeepers**: Services are inherently decentralized, with no central app-store-like gatekeeper controlling access to services.
4. **Aggregation**: Unified API providers like Merge exist, but they are the exception rather than the norm. The majority of service providers publish their APIs individually, maintaining control over the experiences they offer and how they do so.

## Opportunities and what might be next

When making parallels to how APIs and service providers are providing their services today, I do think a more clear picture of what might be next for AI Tools is emerging, where few interesting things stands out:

1.  **More AI toolkit SDKs for popular AI Agent frameworks**  
    In the short term, we will see more AI agent toolkits, like the one provided by Stripe. Every popular service provider will likely build their own toolkits to make it easier to integrate their services with AI agents.

    Furthermore, I wouldn’t be surprised if DXI providers like StainlessAPI and Speakeasy step in to make it easier for such companies to create and offer these toolkits.

2.  **Short term App-store-like aggregators**  
    [https://x.com/ianlivingstone/status/1869451032666747341](https://x.com/ianlivingstone/status/1869451032666747341)

3.  **Decentralized discovery will emerge**  
    In 2024, we saw the [Model Context Protocol (MCP)](https://www.anthropic.com/news/model-context-protocol) emerge from Anthropic as a new standard on how applications provide context to LLMs, which has already seen good adoption among service providers.

    Building on this, I believe a similar protocol, standard, or convention will emerge for decentralized tool discovery. It will likely resemble something more like [/llms.txt](https://llmstxt.org/) than a centralized npm-style registry. I don’t think it’s too far-fetched to envision something like `/.well-known/agent_tools.txt`, which could describe details such as:

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

4.  **Emergence of Agent-first interfaces**  
    Another aspect to consider is the tooling interface itself and how future integrations between AI agents and services will work. Today, agents primarily use two interfaces:

        1\. **API requests to integrate with modern systems**

    With API requests, the model usually ingests an OpenAPI spec and generates an HTTP client on the fly to make the request. This approach requires a computing environment to be available for the AI agent.

        **2\. Browser automation as key interface to the legacy world**

    Another common interface is browser automation, where the AI agent automates a headless browser running locally or in the cloud through services like Browserbase (disclaimer: I’m an investor). This kind of interface is a great workaround for services that don’t offer APIs and emulates how humans interact with the internet today.

    However, neither of these two interfaces feels truly great or efficient. As a service provider, you don’t want AI agents to go wild with code generation and inadvertently DDoS your API. On the browser automation side, you don’t want agents emulating real humans through browsers either.

    Instead, as a service provider, you likely want a more efficient interface—one that allows you to better understand and manage how agents interact with your services.

5.  **Service-provider AI Agent infrastructure**  
    Building on the previous point about agent-first interfaces, I believe we will see more service-provider-focused AI agent infrastructure. Service providers will fundamentally want to assert more control over what AI agents are doing with their services.

    I imagine we’ll see a new generation of infrastructure focused on access control, usage patterns, billing, and monetization as AI agents become more widely deployed. In many ways, parallels can be drawn to the desktop-to-mobile transition: the first generation of infrastructure treated mobile as just another desktop client, while later generations treated mobile as a new and distinct interface. Through this lens, we will also see infrastructure designed to make it easy to “retrofit” or bolt on an agentic interface to existing services.

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
