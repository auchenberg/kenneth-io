---
layout: post
date: 2026-08-02
published: true
comments: true
categories: [agent-experience, infrastructure]
title: 'Dashboard UIs are a tragedy of the commons'
description: 'Dashboard UIs become cluttered because shared product surfaces are both the lowest common denominator and a tragedy of the commons.'
---

I have a theory about why every platform dashboard UI sucks. The AWS console, Google Cloud, Microsoft Azure, and even Stripe's dashboard, they all started simple and over time they have all become a cluttered mess. It's not a talent problem, as these companies employ some of the best people in our industry, instead I think it’s a structural incentive problem.

Imagine a village shares a pasture. Every herder captures the full benefit of adding one more cow, while the cost of overgrazing is spread across everyone. Each decision is individually rational, but over the long run, the field dies anyway.

Now look at the AWS Console. The shared pasture is the navigation, the homepage, the search bar and the design system. It’s the finite surface every service team has to graze on. AWS has more than 200 services, and every team rationally wants their nav item, their onboarding banner, their exception to the pattern. Each addition makes sense in isolation, but collectively you get a console where finding anything feels like archaeology.

But overgrazing only explains the clutter. The deeper problem is the opposite failure: underinvestment, and lack of individual incentives. A coherent, polished console is a public good, where every team benefits, but no team is rewarded for building it. The promotion packet is about the team’s own service, not about the shared shell. So the commons gets grazed to death and nobody waters the plants in the lobby, because they aren’t incentivised to do so.

And then there's another force at play: the lowest common denominator. Because the dashboard has to be a generic UI around everything, a database, a queue, and an ML training service all get forced into the same interaction model. The ideal interface for S3 looks nothing like the ideal interface for SageMaker, but both have to feel like AWS. The shared UI caps every service's experience at whatever the generic abstraction supports.

Another metaphor I've found for this is the food court. Every cuisine, sushi, barbecue, pho — has to be served from the same-sized stall, on the same tray, paid at the same register. Nobody gets to build the restaurant the food deserves. The mall owns the corridors, the tenants own their stalls, and the experience in between belongs to no one.

Extrapolating a bit here, these structural problems can be applied to many shared properties within products. Things like Dashboard UIs, mobile apps, platform APIs, developer experience, and even customer onboarding are the usuall victims. They all suffer from the same curse of being the lowest common denominator, **and** the tragedy of the commons.

**So the next time you experience some of these challenges, take a step back and think about the structural incentives, can change them?**

/k
