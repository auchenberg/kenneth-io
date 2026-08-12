---
layout: post
date: 2026-08-02
published: true
comments: true
categories: [agent-experience, infrastructure]
title: "Dashboard UIs are a tragedy of the commons"
description: "Dashboard UIs become cluttered because shared product surfaces are both the lowest common denominator and a tragedy of the commons."
---

I have a theory about why every dashboard UI sucks. The AWS console, Google Cloud, Microsoft Azure, and even Stripe's dashboard — they all started simple and have become a cluttered mess. It's not a talent problem. These companies employ some of the best designers in the industry. It's a structural problem, and I think it's because the dashboard is both the lowest common denominator and the tragedy of the commons within the organization.

The classic version goes like this: a village shares a pasture. Every herder captures the full benefit of adding one more cow, while the cost of overgrazing is spread across everyone. Each decision is individually rational. The field dies anyway.

Now look at the AWS console. The shared pasture is the navigation, the homepage, the search bar, the design system — the finite surface every service team has to graze on. AWS has more than 200 services, and every team rationally wants their nav item, their onboarding banner, their exception to the pattern. Each addition makes sense in isolation. Collectively you get a console where finding anything feels like archaeology.

But overgrazing only explains the clutter. The deeper problem is the opposite failure: underinvestment. A coherent, polished console is a public good — every team benefits, no team is rewarded for building it. Your promotion packet is about your service, not about the shared shell. So the commons gets grazed to death and nobody waters the plants in the lobby.

And then there's a second force: the lowest common denominator. Because the dashboard has to be a generic frame around everything, a database, a queue, and an ML training service all get forced into the same interaction model. The ideal interface for S3 looks nothing like the ideal interface for SageMaker, but both have to feel like "AWS." The shared frame caps every service's experience at whatever the generic abstraction supports.

The best metaphor I've found for this is the food court. Every cuisine — sushi, barbecue, pho — has to be served from the same-sized stall, on the same tray, paid at the same register. Nobody gets to build the restaurant the food deserves. The mall owns the corridors, the tenants own their stalls, and the experience in between belongs to no one.

**The curse and the blessing of the dashboard UI is the same thing: it's the lowest common denominator of the platform, and the tragedy of the commons.**

And now with the rise of agents, maybe we don't even need dashboard UIs anymore?

/k
