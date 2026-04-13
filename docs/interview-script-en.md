# English Interview Script — Shayne Nguyen (Nguyễn Trọng Thăng)

> Kịch bản chuẩn bị phỏng vấn tiếng Anh cho vị trí Full Stack Developer.
> Gồm: self-introduction, project walkthroughs, technical Q&A (backend / frontend / devops / AI / system design), behavioral, closing questions.
> Mẹo: nói chậm, rõ; nếu chưa rõ câu hỏi → "Could you please rephrase that?" / "Just to make sure I understand correctly, you're asking about…?"

---

## 1. Self-Introduction (1–2 minutes)

**Q: Could you introduce yourself?**

> Hi, my name is Thang, but you can call me Shayne. I'm a Full Stack Developer based in Hanoi, Vietnam, with around four years of professional experience. I started my career in 2022, and since then I've been working across the full stack — mainly on the backend with **Ruby on Rails** and **Golang**, and on the frontend with **Vue.js** and **React**. I also build cross-platform mobile apps with **Flutter**.
>
> Over the years, I've delivered projects in several domains — e-commerce, construction management, billiards tournaments, marine IoT safety, electronic invoicing, and most recently AI-powered trading automation. I enjoy working on **microservices architecture**, **GraphQL and gRPC APIs**, and integrating **LLMs** like OpenAI and Claude into real products.
>
> What I like most about this job is solving real business problems end-to-end — from designing the database, building the API, to shipping the UI that users actually touch. I'm now looking for a role where I can keep growing, especially around scalable architecture and AI integration.

**Shortened version (30s):**
> I'm Shayne, a Full Stack Developer with 4+ years of experience. My main stack is Ruby on Rails and Golang on the backend, Vue and React on the frontend, and Flutter for mobile. I've worked on microservices, GraphQL, gRPC, and AI integration projects for clients in Japan and Vietnam.

---

## 2. Experience & Projects

### Q: Tell me about a project you're most proud of.

> The project I'm most proud of is **Yobimori** — a marine safety mutual-aid platform that protects fishermen and their families from accidents at sea. It's a real mission-critical system because people's lives depend on it.
>
> On the technical side, it uses a **microservices architecture**. The backend is written in **Golang**, exposing a **GraphQL API**, and deployed as **AWS Lambda functions** for serverless scalability. The mobile app is built with **Flutter**, and the system integrates with **IoT devices** on fishing boats to track location and emergency signals.
>
> My role was on the backend and cloud side — I worked on the GraphQL schema, the Lambda handlers, and integration with the IoT data stream. The biggest challenge was handling unstable network conditions at sea; we had to design the sync logic to be idempotent and resilient to retries.

### Q: Tell me about another project — something different.

> Sure — **AI FinanceHub** is quite different. It's an intelligent trading automation platform. The goal is to unify symbol mapping across many brokers and automate trading workflows.
>
> The backend is **Python**, using **Pydantic** for data validation, **Celery** for async tasks, and **Scrapy / Playwright / Selenium** for scraping broker data. We use **Apache Airflow** to orchestrate pipelines and **Apache Spark** for heavy data processing. The frontend is **React / Next.js**, and the actual trading logic runs on **MetaTrader 5** through custom **MQL5 Expert Advisors**.
>
> What I liked about this project was combining three worlds: web development, data engineering, and algorithmic trading. I had to learn MQL5 from scratch — it's a C-like language — which was a fun challenge.

### Q: Vibico — tell me more.

> Vibico is a complete billiards ecosystem for the Vietnamese market. It has three parts: a **tournament platform**, an **online academy**, and a **mobile app**. The backend is Golang with both **GraphQL and gRPC** — gRPC for internal service-to-service calls, GraphQL for the client-facing API. Frontend is Vue 3, mobile is Flutter, and we integrated **VNPay** for payments.
>
> The interesting part was designing the tournament bracket engine — supporting single elimination, double elimination, and round robin formats, with real-time score updates over WebSocket.

### Q: What about "All In One"?

> All In One is our company's internal project-management platform — think of it as a lightweight Jira. I've been working on it since August 2023. Backend is Ruby on Rails with GraphQL, frontend is Vue 3, and it integrates with **Slack** and **GitHub APIs** for notifications and PR tracking. I also wrote a migration tool to **crawl data out of Jira** into our new system.

---

## 3. Technical Questions

### 3.1 Backend / Architecture

**Q: Why would you choose Golang over Ruby on Rails for a project?**
> It depends on the requirements. **Rails** is great when you want speed of development — lots of conventions, a rich ecosystem, and it's perfect for CRUD-heavy business apps like invoicing or admin panels. **Golang** shines when you need high concurrency, low latency, or low memory footprint — for example, microservices, real-time APIs, or serverless functions where cold-start matters. For Yobimori, Go was the right call because of AWS Lambda; for Smart Invoice, Rails let us ship faster.

**Q: GraphQL vs REST vs gRPC — when do you use each?**
> - **REST**: simple, cacheable, perfect for public APIs or when the clients are unknown.
> - **GraphQL**: when the frontend needs flexibility — multiple clients (web + mobile) asking for different shapes of data. It avoids over-fetching and under-fetching. I use it on almost every full-stack project now.
> - **gRPC**: for internal service-to-service communication. It's binary (Protobuf), fast, strongly typed, and supports streaming. I used it in Vibico between the tournament service and the scoring service.

**Q: How do you design a microservices system?**
> I start from **business domains**, not technical layers — following **Domain-Driven Design**. Each service owns its own database to avoid tight coupling. For communication, I prefer **async messaging** (Kafka, SQS, or Pub/Sub) for events, and **gRPC** for synchronous calls. Every service should be independently deployable, observable (logs, metrics, traces), and have its own CI/CD pipeline. Cross-cutting concerns like auth go through an **API gateway**.

**Q: How do you handle database migrations safely in production?**
> I follow the **expand-and-contract** pattern: first add the new column/table (backwards compatible), deploy the code that writes to both, backfill data, switch reads to the new column, and only then drop the old one. Never combine a schema change and a destructive change in one deploy. For large tables I use batched background jobs instead of a single long-running migration.

**Q: How do you scale a Rails app?**
> Layer by layer: caching (Redis / fragment caching), background jobs (Sidekiq), database indexing, read replicas, and eager loading to fix N+1 queries. Then horizontal scaling behind a load balancer. For really hot endpoints I sometimes extract them to a Go microservice.

**Q: How do you fix an N+1 query?**
> Detect with the **bullet** gem or logs, then fix with `includes`, `preload`, or `eager_load` in Rails. In GraphQL specifically, I use **DataLoader / batch-loader** so each field resolves in batches instead of firing queries per item.

### 3.2 Frontend

**Q: Vue vs React — which do you prefer?**
> I'm comfortable with both. **Vue** has a gentler learning curve and cleaner single-file components — great for teams mixing juniors and seniors. **React** has a bigger ecosystem and more flexibility, especially with Next.js for SSR/SSG. I tend to pick Vue for internal tools and React/Next for public-facing SEO-critical sites.

**Q: How do you manage state in a large frontend app?**
> For Vue I use **Pinia** (or Vuex in older projects), for React I use **Zustand** or **Redux Toolkit** depending on complexity. I try to keep most state **local** and only lift to global when multiple unrelated components need it. Server state goes through **Apollo Client** (GraphQL) or **React Query** — they handle caching, revalidation, and optimistic updates much better than hand-rolled state.

**Q: How do you optimize frontend performance?**
> Code splitting and lazy loading routes, image optimization (WebP, lazy loading), tree-shaking, avoiding unnecessary re-renders (memoization, `v-memo` / `React.memo`), and using SSR/SSG when SEO matters. I also watch the bundle size with tools like webpack-bundle-analyzer.

### 3.3 Mobile (Flutter)

**Q: Why Flutter?**
> One codebase for iOS and Android, great performance because it compiles to native, and the hot-reload cycle is fast. For state management I use **GetX** — it's lightweight and combines state, routing, and dependency injection in one package.

### 3.4 DevOps / Cloud

**Q: Experience with Docker and Kubernetes?**
> Yes. I containerize almost every service with Docker. For orchestration, I've used **Kubernetes** with **Helm charts** to template deployments across environments, and **K9s** as a terminal UI to debug pods. For smaller projects, plain Docker Compose is often enough.

**Q: How do you deploy to AWS Lambda?**
> I package the Go binary, define the function and triggers (API Gateway, SQS, EventBridge), and deploy through Serverless Framework or Terraform. The key things to watch are **cold starts**, **package size**, and **concurrency limits**. Go is excellent here because cold starts are usually under 100ms.

### 3.5 AI / LLM Integration

**Q: You mention LLM integration — what have you built?**
> On AI FinanceHub I integrated OpenAI for generating trading insights from market data. I also use **LangGraph** for building multi-step agentic workflows — for example, a research agent that scrapes news, summarizes, and feeds into the decision engine. For structured output I rely on **Pydantic** schemas so the LLM response is always validated before downstream use.

**Q: How do you handle prompt injection or hallucination?**
> Several layers: strict **system prompts**, **input sanitization**, **structured output** (JSON schema / function calling) instead of free text, and **validation** before acting on any LLM output. For critical flows, a human-in-the-loop step. I never let the LLM directly execute irreversible actions without verification.

### 3.6 Databases

**Q: SQL vs NoSQL — when?**
> SQL (Postgres, MySQL) for anything relational with strong consistency — orders, invoices, users. NoSQL when the shape is flexible or the scale is huge: **MongoDB** for document-like data, **Redis** for caching and queues, **DynamoDB** for serverless at scale, **ClickHouse** for analytical workloads and time-series.

**Q: When did you use ClickHouse?**
> For logging and analytics on a high-volume trading data project. ClickHouse is columnar, so aggregate queries over billions of rows are much faster than Postgres.

### 3.7 System Design (short answer pattern)

**Q: Design a seat-booking system like Bottos.**
> - **Requirements**: book a seat, check-in, avoid double booking, LINE LIFF frontend.
> - **Core entities**: User, Seat, Booking, CheckIn.
> - **Concurrency**: use a **database transaction with row-level lock** (`SELECT ... FOR UPDATE`) on the seat row when booking. Or a Redis distributed lock if scale grows.
> - **API**: GraphQL mutation `bookSeat(seatId, timeSlot)`.
> - **Scaling**: cache seat availability in Redis, invalidate on write. Add a queue for check-in events.
> - **Edge cases**: no-show auto-release, overlapping time slots, LINE userId uniqueness.

---

## 4. Behavioral Questions

**Q: Tell me about a difficult bug you fixed.**
> On Yobimori, we had intermittent failures where IoT messages would sometimes be processed twice. The root cause was that Lambda retries on timeout, but the downstream write wasn't idempotent. I fixed it by adding an **idempotency key** based on the device ID + timestamp, and a deduplication table in DynamoDB with a TTL. After that, retries became safe.

**Q: Tell me about a time you disagreed with a teammate.**
> On one project, a teammate wanted to use REST while I suggested GraphQL. Instead of arguing, I built a small proof-of-concept showing how GraphQL reduced round-trips for our mobile client. We then made the decision together based on evidence. I learned that showing trumps telling.

**Q: How do you learn new technologies?**
> I start with the official docs, build a tiny project to feel the shape of it, then read the source code or real-world examples on GitHub. For MQL5, for example, I wrote a simple moving-average EA first before touching the real trading strategy.

**Q: How do you handle tight deadlines?**
> I prioritize ruthlessly — what's **must-have** for launch vs **nice-to-have**. I communicate early if something is at risk. I'd rather ship a smaller scope on time than a big scope late and broken.

**Q: Strengths and weaknesses?**
> **Strength**: I'm versatile — I can move between backend, frontend, mobile, and DevOps, which makes me useful on small teams. **Weakness**: sometimes I go too deep into technical details when I should focus on business value first. I'm improving by always asking "what's the user impact?" before starting.

**Q: Why do you want to leave / join us?**
> I'm looking for a place where I can work on bigger-scale systems and grow specifically in **scalable architecture** and **AI-powered products**. Your company stood out because [tailor to the company — e.g., "you're building AI products at scale" / "your tech stack matches mine"].

---

## 5. Questions to Ask the Interviewer (Closing)

Pick 2–3:
1. Could you tell me more about the team structure and the tech stack I'd be working on?
2. What does the development process look like — code review, CI/CD, testing culture?
3. What are the biggest technical challenges the team is facing right now?
4. How do you measure success for this role in the first 3–6 months?
5. What opportunities are there for learning and growth, especially around AI or system design?
6. Is the team remote, hybrid, or onsite? What's the working style?

---

## 6. Useful Phrases & Recovery Lines

| Situation | Phrase |
|---|---|
| Didn't catch the question | "Sorry, could you please repeat that?" / "Could you rephrase, please?" |
| Need time to think | "That's a good question, let me think for a moment." |
| Clarify understanding | "Just to make sure I understand — you're asking about X, right?" |
| Don't know the answer | "I haven't worked with that specifically, but based on my experience with [similar thing], I'd approach it like this…" |
| Transition | "Let me give you a concrete example…" |
| Finish an answer | "…and that's roughly how I'd approach it." |

---

## 7. Quick Pronunciation Notes

- **Microservices** → /ˈmaɪ.kroʊˌsɜː.vɪ.sɪz/
- **GraphQL** → "graph-Q-L" (đọc rời từng chữ QL)
- **gRPC** → "G-R-P-C"
- **Kubernetes** → /ˌkuː.bərˈnet.ɪs/ ("koo-ber-NET-ees")
- **PostgreSQL** → "post-gres-Q-L" hoặc "postgres"
- **Idempotent** → /ˌaɪ.dəmˈpoʊ.tənt/

---

## 8. Remote Work & Working Hours (US Partner)

### Q: Are you comfortable working remotely with a US-based team?
> Absolutely. I've been working remotely for most of my career and I'm very self-disciplined. I'm comfortable with async communication through Slack, Linear, or similar tools, and I keep my work transparent — daily standups, clear Linear tickets, and detailed PR descriptions. Working with a US team is actually exciting for me because I'd get exposure to a different engineering culture.

### Q: How do you handle the time zone difference? Vietnam is about 11–14 hours ahead of the US.
> I've thought about this carefully. I'm very flexible with my schedule — I can work in the **evening, early morning, or late at night (Vietnam time)** to overlap with US business hours. For example:
> - **US East Coast (EST)**: 9am–12pm EST = 9pm–12am Vietnam time → easy overlap
> - **US West Coast (PST)**: 9am–12pm PST = 12am–3am Vietnam time → I can handle this for meetings
>
> My preferred setup is: **core overlap hours for meetings and sync work**, then the rest of the day async so both sides can stay productive. I can guarantee at least **3–4 hours of overlap** daily, and I'm flexible to adjust per team needs.

### Q: Do you have a reliable home office setup?
> Yes. I work from a quiet home office in Hanoi with:
> - Stable fiber internet (100+ Mbps, with 4G backup)
> - A good laptop and external monitor
> - Headset with noise cancellation for meetings
> - Backup power for short outages
>
> I've been doing remote work for years so the setup is already battle-tested.

### Q: How's your English communication level?
> I'm comfortable with written English — reading docs, writing PRs, Slack communication, and technical specs. For verbal communication, I'm at a **working professional level**. I may speak slowly sometimes, but I can discuss technical topics clearly. I've been actively improving by doing interviews like this and working on international projects.

---

## 9. Working Process & Collaboration

### Q: What does your ideal workflow look like?
> I like a balance of structure and autonomy:
> 1. **Clear tickets** in Linear/Jira with acceptance criteria
> 2. **Short daily standup** (10–15 min) — even async via Slack works
> 3. **Focused deep work** blocks during the day
> 4. **Code reviews on every PR** — I think of code review as knowledge-sharing, not gatekeeping
> 5. **Weekly demo or planning** to keep the team aligned on priorities
>
> I'm flexible — if your team uses a different process, I'll adapt quickly.

### Q: Are you familiar with Agile / Scrum?
> Yes, I've worked in Scrum-based teams with 1–2 week sprints, daily standups, sprint planning, and retrospectives. I've also worked in more Kanban-style teams where we just pull tickets from a prioritized backlog. Both work — the important thing is clear priorities and good communication.

### Q: How do you handle code reviews?
> As an author: I keep PRs small (ideally under 400 lines), write a clear description of the "why" and testing steps, and respond to feedback quickly.
> As a reviewer: I focus on correctness, readability, and edge cases — not style nitpicks (that's what linters are for). I leave comments as suggestions, not commands, and I try to explain my reasoning so the author learns something.

### Q: How do you handle disagreement in async remote teams?
> Disagreements are best handled with **data and examples**, not opinions. If text isn't resolving it in 2–3 rounds, I escalate to a quick video call. I believe in "disagree and commit" — once the team decides, I support the decision fully even if I preferred something else.

### Q: How do you document your work?
> I document as I go: inline comments for non-obvious code, README updates for setup changes, and ADRs (Architecture Decision Records) for bigger decisions. For APIs, I keep OpenAPI specs or GraphQL schemas up to date. My rule: **if the next person needs to ask me a question, I should have documented that already.**

### Q: How do you handle unclear requirements?
> I write down my understanding and share it back — "here's what I think you're asking for, is this correct?" This surfaces misunderstandings early. If the requirement is still fuzzy, I build a small prototype or wireframe to drive the conversation. Clarifying up front is much cheaper than building the wrong thing.

---

## 10. Salary Negotiation

> **Anchor**: open $2000/month, minimum acceptable $1700/month (USD, net).

### Q: What are your salary expectations?
**(Preferred — open anchor)**
> Based on my 4+ years of experience, my full-stack skill range, and market rates for remote developers working with US companies, **I'm looking for around $2,000 USD per month**. That said, I'm open to discussion depending on the full package — things like long-term stability, growth opportunities, and how the evaluation process works all matter to me.

**(If they push back)**
> I understand. Could you share the range you had in mind for this role? I want to make sure we're in the same ballpark before going deeper. I'm flexible, but I do have a floor I need to stay above to make this sustainable long-term.

**(Minimum fallback)**
> I can consider starting at a lower rate if there's a clear path for review — for example, a performance review after **3 months** with a salary adjustment. My minimum sustainable rate is **$1,700 USD per month**.

### Q: Why that number?
> A few reasons:
> 1. My experience covers backend, frontend, mobile, DevOps, and AI integration — that versatility is valuable on small remote teams.
> 2. I've delivered production systems across multiple industries — invoicing, trading, IoT, e-commerce.
> 3. I'm committing to overlapping US hours, which means working outside Vietnam's normal schedule.
> 4. Market rates for mid-level remote devs from Vietnam working with US companies typically sit in the $1,500–$3,000 range depending on stack and seniority.

### Q: Is that negotiable?
> Yes, the final number is negotiable. What matters to me is the **total package**: base rate, payment stability, review cycles, and working conditions. I'd rather take slightly less from a company I trust and grow with, than maximize the short-term number.

### Q: Hourly or monthly — which do you prefer?
> I'm open to either:
> - **Monthly (fixed)**: simpler for both sides, predictable, good for long-term relationships.
> - **Hourly**: fair if the workload varies. If hourly, I'd expect around **$12–$15/hour** depending on scope, with time tracking through something like Toggl, Hubstaff, or a shared timesheet.
>
> For ongoing full-time engagement, I prefer **monthly fixed** — it aligns incentives and reduces admin overhead.

### Useful salary phrases
- "Could you share the budgeted range for this role?"
- "What does the full compensation package look like?"
- "Is there a performance review cycle?"
- "I'd like to understand the payment terms before committing to a number."
- "That works for me as a starting point, with a review after 3 months."

---

## 11. Payment Terms & Contract

### Q: How would you like to be paid?
> I'm flexible with payment methods. The most common options I've used or am comfortable with:
> 1. **Wise (TransferWise)** — low fees, fast, USD → VND conversion at good rates. My preferred option.
> 2. **Payoneer** — standard for remote contractors, works well with US companies.
> 3. **Direct bank transfer (SWIFT)** — works but slower and higher fees.
> 4. **Deel / Remote.com / Remofirst** — if your company uses a contractor platform, I'm happy to sign up.
> 5. **Crypto (USDT/USDC)** — only if both sides are comfortable; not my first choice.

### Q: What payment cycle do you prefer?
> **Bi-weekly** or **monthly** works best. I'd suggest:
> - **Monthly**: paid on the 1st–5th of the following month for the previous month's work.
> - **Bi-weekly**: every 2 weeks, paid within 5 business days.
>
> For the first month, some companies do a **milestone payment** or **50/50 split** to build trust — I'm open to that.

### Q: Are you comfortable working as an independent contractor?
> Yes. I'd operate as an independent contractor (1099 equivalent from the US side). I handle my own taxes in Vietnam. I'll need a simple contract covering:
> - Scope and rate
> - Payment terms and method
> - IP ownership (work-for-hire)
> - NDA / confidentiality
> - Termination notice (typically 2 weeks on either side)

### Q: Are you open to signing an NDA?
> Absolutely. I understand confidentiality is important for US companies. I'm happy to sign an NDA before any technical discussion involving proprietary code or business information.

---

## 12. Work Evaluation & Quality Control

### Q: How should your work be evaluated?
> I suggest a combination of:
> 1. **Ticket completion** — what was committed vs delivered per sprint.
> 2. **Code quality** — PR review feedback, test coverage, bugs found post-merge.
> 3. **Communication** — responsiveness, clarity, proactiveness in flagging risks.
> 4. **Team impact** — helping others, documentation, knowledge sharing.
>
> I'm a fan of a **30/60/90 day review** at the start of any new role. Clear expectations at each checkpoint reduce misunderstandings.

### Q: How do you ensure code quality?
> Multiple layers:
> 1. **Linters and formatters** — RuboCop, golangci-lint, ESLint, Prettier — enforced in CI.
> 2. **Unit tests** — for business logic and pure functions.
> 3. **Integration tests** — for API endpoints and critical flows.
> 4. **Code review** — every PR reviewed by at least one other dev.
> 5. **CI/CD** — tests must pass before merge; staging deploys before production.
> 6. **Monitoring** — Sentry for errors, logs and metrics for anomalies.

### Q: How do you write tests?
> I try to follow the **test pyramid**: lots of fast unit tests, fewer integration tests, very few end-to-end tests. In Rails I use **RSpec** or **Minitest**, in Go I use the standard **testing** package with **testify**, and in JS/TS I use **Vitest** or **Jest**. I write tests alongside the code, not after, because it's easier to cover edge cases when the logic is fresh.

### Q: What's your take on test coverage numbers?
> Coverage is a signal, not a goal. I aim for **80%+ on business-critical code**, less on boilerplate. 100% coverage with bad assertions is worse than 70% coverage with meaningful tests. I care more about **which** lines are covered than the percentage.

### Q: How do you handle production bugs?
> 1. **Reproduce** — get the exact steps or data that triggered it.
> 2. **Contain** — if it's urgent, a quick hotfix or feature flag to stop the bleeding.
> 3. **Root-cause** — not just the symptom; ask "why" at least 5 times.
> 4. **Fix with a test** — write a test that fails before the fix, then make it pass.
> 5. **Post-mortem** — for significant incidents, a blameless doc on what happened and how to prevent it.

### Q: How do you track progress on tasks?
> I use the ticket system (Linear/Jira) as the source of truth. I update status daily, flag blockers immediately, and give realistic estimates. If I realize an estimate was wrong, I update it and communicate — surprise delays are the worst thing in remote work.

---

## 13. Extended Technical Deep Dive

### Backend: Ruby on Rails

**Q: ActiveRecord N+1 — all the ways to fix it.**
> `includes` for eager loading, `preload` to force separate queries, `eager_load` to force a LEFT JOIN, `joins` when you only need to filter. For GraphQL, use batch-loader or graphql-batch to group lookups. Detect with the `bullet` gem in development.

**Q: Sidekiq vs Resque vs GoodJob?**
> **Sidekiq** is the standard — multi-threaded, fast, Redis-backed. **Resque** is older, process-based, simpler but slower. **GoodJob** uses Postgres instead of Redis, which is great if you don't want another infra piece. I pick Sidekiq for most Rails projects.

**Q: How do you handle long-running background jobs?**
> Break them into smaller chunks, make them **idempotent** (safe to retry), add progress tracking in the database, and use **batch processing** (Sidekiq Pro / sidekiq-batch) for coordination. Always add dead-letter handling for jobs that fail repeatedly.

**Q: Rails security — what do you watch for?**
> Mass assignment (use strong params), SQL injection (never interpolate raw SQL), CSRF (enabled by default but verify for API mode), XSS (Rails escapes by default but watch `html_safe`), and secret management (use Rails credentials or env vars, never commit secrets).

### Backend: Golang

**Q: Goroutines vs OS threads?**
> Goroutines are lightweight — thousands of them cost almost nothing. The Go runtime schedules them onto a smaller pool of OS threads (M:N scheduler). The takeaway: you can spawn them freely, but coordinate with channels or sync primitives.

**Q: How do you handle errors in Go?**
> Explicit `if err != nil` returns. I wrap errors with `fmt.Errorf("context: %w", err)` so callers can `errors.Is` / `errors.As`. For expected errors I use sentinel errors; for unexpected I return as-is and let the top layer log.

**Q: How do you test Go code?**
> Standard `testing` package with table-driven tests. `testify` for nicer assertions. `httptest` for HTTP handlers. Interfaces make mocking straightforward — I use `gomock` or hand-written stubs depending on complexity.

**Q: Concurrency primitives in Go?**
> Channels for communication between goroutines (share by communicating, not by sharing memory). `sync.Mutex` / `sync.RWMutex` for protecting shared state. `sync.WaitGroup` for waiting on groups of goroutines. `context.Context` for cancellation and deadlines.

### Backend: Python

**Q: Celery vs RQ vs Dramatiq?**
> Celery is the most mature and feature-rich but has heavier configuration. RQ is simpler and Redis-only. Dramatiq is a nice middle ground. For AI FinanceHub I used Celery because I needed complex routing and periodic tasks via Celery Beat.

**Q: FastAPI vs Flask vs Django?**
> **FastAPI**: modern, async-first, automatic OpenAPI docs, Pydantic validation — my default for new Python APIs. **Flask**: minimal and flexible but needs more plumbing. **Django**: batteries-included, great for traditional web apps.

### Frontend

**Q: How do you handle authentication on the frontend?**
> Store JWT in **httpOnly cookies** if possible (safer from XSS). If you must use localStorage, at least use short-lived access tokens plus refresh tokens, and sanitize everything. Never store refresh tokens in localStorage.

**Q: How do you optimize React re-renders?**
> `React.memo` for pure components, `useMemo` for expensive computations, `useCallback` for stable function references passed to memoized children. Move state as low in the tree as possible. Use React DevTools Profiler to find the actual bottleneck before optimizing — premature optimization wastes time.

**Q: SSR vs SSG vs CSR — when?**
> **SSG** (static site generation): marketing pages, blogs, docs — fastest, cheapest, best SEO. **SSR**: dynamic but SEO-critical pages like product pages with live data. **CSR**: authenticated dashboards where SEO doesn't matter. Next.js lets you mix all three per route.

**Q: How do you handle form validation?**
> Schema-based with **Zod** or **Yup** so the same schema works on frontend and can be shared with backend. Libraries like **react-hook-form** (React) or **VeeValidate** (Vue) integrate cleanly.

### System Design (bigger questions)

**Q: Design a notification system (email + push + in-app).**
> - **Producer**: any service can publish an event to a message queue (SQS/Kafka/NATS).
> - **Notification service** consumes events, looks up user preferences, and fans out to channel-specific workers (email, push, in-app).
> - **Template service** for rendering with localization.
> - **Delivery workers** use **idempotency keys** to prevent duplicates on retries.
> - **Audit log** of what was sent, when, and whether it was delivered.
> - **Rate limiting** per user to avoid spam.

**Q: Design a URL shortener.**
> - **Write path**: generate a short ID (base62 encoding of an auto-incrementing counter, or a random 7-char string with collision check). Store `short_id → long_url` in a KV store.
> - **Read path**: high-cache hit rate — put Redis in front of the DB.
> - **Scale**: writes are cheap, reads are massive. CDN for the redirect response.
> - **Analytics**: async write to ClickHouse on each redirect.

**Q: How would you handle a database migration on a table with 500 million rows?**
> 1. **Never** run a blocking `ALTER TABLE`.
> 2. Use online schema change tools — `pt-online-schema-change` (Percona) or `gh-ost` (GitHub).
> 3. For Postgres, add column as nullable first, backfill in batches with a background job, then add the NOT NULL constraint.
> 4. Monitor replication lag and DB CPU throughout.
> 5. Roll out behind a feature flag.

### DevOps & Reliability

**Q: What's your deployment strategy?**
> For critical services: **blue-green** or **canary** deployments with gradual traffic shift. For less critical: rolling update. Always have a **fast rollback** path — ideally one command or one click. Feature flags decouple deploy from release.

**Q: How do you monitor a production service?**
> Four golden signals: **latency, traffic, errors, saturation**. Logs (structured JSON), metrics (Prometheus/Datadog), traces (OpenTelemetry), alerts (PagerDuty) — but only alert on things that need immediate action. Noisy alerts lead to alert fatigue.

**Q: How do you handle secrets in production?**
> Never in Git. Use AWS Secrets Manager, GCP Secret Manager, HashiCorp Vault, or at minimum environment variables injected at runtime. Rotate regularly.

### AI / LLM

**Q: How do you keep LLM costs under control?**
> Cache responses for identical inputs, use smaller/cheaper models where possible, truncate context aggressively, stream responses to fail fast, set hard token budgets per request, and log token usage per feature so you can spot regressions.

**Q: Vector databases — which and when?**
> Pinecone, Weaviate, Qdrant, or pgvector (Postgres extension). For small-to-medium scale I'd just use **pgvector** — one fewer system to manage. For very large scale or specialized search, dedicated vector DBs win.

---

## 14. Additional Common Interview Topics

### Q: Notice period / start date?
> I'm available to start **within 1–2 weeks** of signing. I'd like a small overlap to finish handing off my current commitments.

### Q: Are you available full-time?
> Yes, I'm looking for a full-time remote role. I'm not planning to take on side contracts that would conflict with this commitment.

### Q: How do you stay updated with new technology?
> I read the official docs when new versions drop, follow a few engineering blogs (GitHub blog, Vercel, HashiCorp), watch conference talks, and most importantly **build small projects**. The best way to learn a tool is to use it on something real. I also use **Claude Code** daily — it's a great way to explore new libraries and patterns.

### Q: Are you open to a take-home coding test?
> Yes. My only ask: please keep it **scoped to around 4–6 hours** of work. Anything much larger starts to feel unfair for candidates. I'm happy to do a live coding session afterward to walk through my solution and discuss trade-offs.

### Q: Are you open to a live coding / pair programming round?
> Yes. I'm comfortable doing algorithm problems, debugging existing code, or designing a small feature live. Please tell me the format in advance so I can prepare my environment.

### Q: What kind of team/company do you prefer?
> Small to mid-sized teams where I can have real ownership and see my work ship to users. I like companies with a clear product vision, a healthy engineering culture (code review, testing, no blame), and room to grow.

### Q: How would you rate yourself: junior, mid, senior?
> I'd honestly call myself **solid mid-level** — I've shipped many production systems end-to-end, I can own features independently, and I'm comfortable making architecture decisions. I'm not claiming senior yet because I haven't led a large team or owned a full platform's long-term roadmap — that's what I'd like to grow into.

### Q: What's a technology you want to learn next?
> I want to go deeper into **distributed systems** — things like event sourcing, CQRS, and streaming with Kafka or NATS. Also more serious **MLOps** work around deploying and monitoring LLM-powered features in production.

### Q: Can you work independently without much supervision?
> Yes — that's actually how I work best. Given clear goals and acceptance criteria, I can plan my own work, break it down, and ship it. I proactively flag blockers and ask questions early, but I don't need hand-holding on day-to-day tasks.

### Q: How do you handle burnout when working odd hours?
> I set firm boundaries: I don't work 24/7. If I take a late-night shift for a meeting, I adjust the next morning. I prioritize sleep and exercise — sustainable output beats heroic bursts. I've been doing this for 4 years and haven't burned out yet because I manage it deliberately.

### Q: Do you contribute to open source?
> I've contributed small fixes here and there. Most of my GitHub activity is personal projects and work repositories. I'd like to contribute more to open source — it's on my goals list.

### Q: Any questions about benefits?
> Yes, a few things I'd like to understand:
> - Paid time off / vacation policy for contractors?
> - Any learning budget (courses, books, conferences)?
> - Equipment reimbursement or provided laptop?
> - Health insurance or stipend (for contractors this is often N/A, but worth asking)?
> - Performance bonus structure, if any?

---

## 15. Red-Flag Questions to Watch For (and your responses)

| They ask / say | What it might mean | Your response |
|---|---|---|
| "We need you online 9–5 US time, no exceptions." | Inflexible — could mean 24/7 Vietnam time | "I can commit to 3–4 hours of overlap daily. Full US business hours long-term isn't sustainable for me. Could we find a middle ground?" |
| "Rate seems high, but we'll make it up in equity / future raises." | Vague promises | "I'd love to hear about the equity / raise structure in writing. My base rate still needs to work from day one." |
| "We don't do contracts, just trust." | Big red flag | "I understand, but a simple written agreement protects both sides. I'm happy to keep it short." |
| "Can you start unpaid trial for 2 weeks?" | Unfair | "I'm open to a paid trial week or a small paid test task instead — that way both sides can evaluate fit." |
| No clear PM / no tickets / no process | Chaotic team | Ask: "How do you currently track work and priorities?" — their answer tells you a lot. |
| "We pay after project completes in 3 months." | Cash flow risk | "I'd prefer bi-weekly or monthly payments. Would a milestone-based structure work?" |

---

## 16. Closing Statement Template

> Thank you so much for your time today. I really enjoyed learning about [company / product / team]. Based on what we discussed, I'm very interested in this role because [specific reason]. I'd love to be part of the team. Could you tell me what the next steps look like and when I can expect to hear back?

---

## 17. Pre-Interview Checklist

- [ ] Test mic, camera, internet 30 minutes before
- [ ] Have profile.md / CV open in another tab
- [ ] Water + notepad ready
- [ ] Smile at the start — first impression matters
- [ ] Speak slowly and clearly; it's okay to pause
- [ ] End with a thank-you and a follow-up question

Good luck! 🚀
