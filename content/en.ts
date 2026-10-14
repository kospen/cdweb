import type { LocaleContent } from "./types";

export const en: LocaleContent = {
  locale: "en",
  meta: {
    siteTitle: "Creative Destruction — AI, Software, Research & Innovation",
    siteDescription: "Creative Destruction turns research, artificial intelligence and software engineering into deployable digital products and systems."
  },
  nav: { home: "Home", products: "Products", work: "Work", projects: "Projects", research: "R&D", capabilities: "Capabilities", news: "News", about: "About", contact: "Contact" },
  common: {
    explore: "Explore", details: "Details", read: "Read", viewAll: "View all", index: "Index",
    language: "Language", menuOpen: "Open navigation", menuClose: "Close navigation",
    skip: "Skip to content", copy: "Copy address", copied: "Copied"
  },
  hero: {
    eyebrow: "AI SYSTEMS / DIGITAL PRODUCTS / R&D",
    headline: ["Challenge.", "Destroy.", "Create."],
    copy: "We turn research, AI and software engineering into deployable digital products and systems.",
    primary: "Explore our work",
    secondary: "View capabilities",
    labels: ["FRAGMENT / LEGACY", "TRANSITION / 01", "STRUCTURE / EMERGENCE"]
  },
  philosophy: {
    eyebrow: "Operating idea / 01",
    title: "Innovation begins where\nexisting systems reach\ntheir limits.",
    copy: "CREATIVE DESTRUCTION describes how innovation displaces established structures and creates new products, processes, capabilities and forms of value.",
    note: "For us, it is an operating principle: investigate what no longer works, engineer the transition, and build what comes next."
  },
  framework: {
    eyebrow: "Operating model / 02",
    title: "We challenge those limits\nto create what comes next.",
    intro: "CREATIVE DESTRUCTION applies this principle through a practical operating sequence across AI, software, products, R&D and innovation.",
    axisLabel: "Legacy to emergence transformation sequence",
    axis: ["LEGACY", "RETHINK", "REPLACE", "REIMAGINE", "EMERGENCE"],
    steps: [
      { id: "01", name: "RETHINK.", lead: "Challenge the way things work today.", description: "Identify which assumptions, processes and technologies still create value — and which now stand in the way of progress.", signal: "ASSUMPTION → QUESTION" },
      { id: "02", name: "REPLACE.", lead: "Build the better system.", description: "Replace what no longer works with technologies, software and AI designed for what comes next.", signal: "OBSOLETE → CAPABLE" },
      { id: "03", name: "REIMAGINE.", lead: "Create what could not exist before.", description: "Develop new products, capabilities and services that open new opportunities and generate new forms of value.", signal: "LIMIT → POSSIBILITY" }
    ]
  },
  projects: {
    eyebrow: "Projects & Products / 03",
    // PLACEHOLDER — awaiting the approved statement. Must work for any number of records.
    title: "Systems in development\nand in production.",
    intro: "",
    records: [
      {
        id: "01",
        name: "PDGA",
        expansion: "Predictive Dendritic Gathering Adapter",
        kind: "Research initiative / Machine learning",
        status: "In development",
        description: "Adaptive fine-tuning for small language models. Standard methods overwrite what a model already knows, so each new domain costs a large part of the accuracy on the last one. PDGA predicts the effect of an update before it is applied and routes it so prior knowledge is protected while new learning still lands.",
        detail: "Every routing decision is logged in machine-readable form, which makes an adapted model auditable rather than opaque, and the method runs with under 3% latency overhead on consumer hardware."
      },
      {
        id: "02",
        name: "Klardex",
        kind: "Product / Regulatory technology",
        status: "In production",
        description: "A platform that automates EU AI Act compliance for mid-market organisations. It builds a structured inventory of the AI systems in use, classifies them by risk tier, drafts the risk and conformity assessments, and generates the technical documentation the Act requires.",
        detail: "Compliance status is then tracked continuously, so a change to a system or new regulatory guidance arrives as an alert rather than as a rediscovery exercise months later.",
        link: { label: "klardex.com", href: "https://klardex.com" }
      }
    ],
    note: ""
  },
  research: {
    eyebrow: "Research & development / 05",
    title: "Research becomes valuable when it can be tested, transferred and deployed.",
    intro: "CREATIVE DESTRUCTION works across applied research, experimental development, AI, prototyping, validation and research-to-product transfer.",
    stages: [
      { id: "01", name: "Investigate", description: "Frame the technical problem and identify the research path." },
      { id: "02", name: "Prototype", description: "Turn hypotheses into inspectable software and system behaviour." },
      { id: "03", name: "Validate", description: "Test performance, constraints, governance and operational fit." },
      { id: "04", name: "Transfer", description: "Move validated knowledge into a deployable product or system." }
    ],
    environments: ["Applied AI research", "Experimental software development", "Emerging technologies", "Research-to-product transfer"]
  },
  capabilities: {
    eyebrow: "Capability system / 04",
    title: "Connected capabilities\nbuilt around the problem.",
    intro: "Capabilities combine around the technology problem, product stage and research context.",
    records: [
      { id: "01", name: "Artificial Intelligence", description: "AI system design, evaluation and integration around a defined operational purpose.", signal: "MODEL → SYSTEM" },
      { id: "02", name: "Software Engineering", description: "Robust software architecture and implementation for digital products and research prototypes.", signal: "CODE → PRODUCT" },
      { id: "03", name: "AI-powered SaaS", description: "Product architecture for focused, extensible software services enhanced by AI.", signal: "SERVICE → SCALE" },
      { id: "04", name: "Digital Transformation", description: "Redesign of inherited processes and systems around measurable technical change.", signal: "LEGACY → NEW" },
      { id: "05", name: "Data & Analytics", description: "Data structures, analytical workflows and evidence for better system decisions.", signal: "DATA → SIGNAL" },
      { id: "06", name: "Research & Development", description: "Applied research, experimental development, prototyping and validation.", signal: "HYPOTHESIS → PROOF" },
      { id: "07", name: "AI Governance", description: "Risk classification, assessment, documentation and lifecycle governance for AI systems.", signal: "RISK → CONTROL" },
      { id: "08", name: "Technology Integration", description: "Connecting software, data and emerging technology within existing environments.", signal: "PARTS → SYSTEM" }
    ]
  },
  news: {
    eyebrow: "Latest news",
    title: "Signals from products, projects and research.",
    intro: "Company updates cover product development, project activity, collaborations, events and technology releases.",
    records: [
      {
        "slug": "the-ai-act-file-practical-eu-ai-act-guide",
        "date": "2026-10-14",
        "category": "Publication",
        "title": "The AI Act File: A Practical Guide to the EU AI Act Is Coming Soon",
        "summary": "A new practical handbook will help small businesses, solo entrepreneurs, online sellers, influencers, and digital content creators understand how the European Union's AI regulations apply to their everyday work.",
        "paragraphs": [],
        "blocks": [
          {
            "type": "p",
            "text": "Artificial intelligence is no longer a technology used exclusively by large corporations."
          },
          {
            "type": "p",
            "text": "Today, a single person running an online store can use AI to write product descriptions, generate marketing images, respond to customer inquiries, and automate administrative tasks."
          },
          {
            "type": "p",
            "text": "Influencers and content creators increasingly rely on AI-generated visuals, synthetic voices, video editing tools, and automated content production."
          },
          {
            "type": "p",
            "text": "Freelancers use AI assistants for research, communication, and business operations."
          },
          {
            "type": "p",
            "text": "But as AI becomes part of everyday business, an important question emerges:"
          },
          {
            "type": "p",
            "text": "**What does the EU AI Act actually require from people who work alone?**"
          },
          {
            "type": "p",
            "text": "A forthcoming English-language book, **The AI Act File**, published by Slow Humans Press, aims to make this question easier to answer."
          },
          {
            "type": "p",
            "text": "Rather than presenting the regulation as a purely legal document, the book takes a practical approach to understanding AI systems, identifying relevant obligations, and organizing the evidence and documentation that may be required."
          },
          {
            "type": "h2",
            "text": "AI Regulation Is Not Just for Large Technology Companies"
          },
          {
            "type": "p",
            "text": "One common misconception is that the EU AI Act concerns only major AI developers and technology corporations."
          },
          {
            "type": "p",
            "text": "In reality, certain obligations may also apply to smaller businesses and individual professionals, depending on how AI systems are used and what role the business plays."
          },
          {
            "type": "p",
            "text": "However, not every use of ChatGPT or another AI tool creates the same legal obligations."
          },
          {
            "type": "p",
            "text": "The EU AI Act — [Regulation (EU) 2024/1689](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng) — distinguishes between different roles, types of AI systems, risk categories, and specific applications."
          },
          {
            "type": "p",
            "text": "Understanding those distinctions is essential."
          },
          {
            "type": "p",
            "text": "**The AI Act File focuses on helping readers identify what matters for their actual activities rather than overwhelming them with requirements that may not apply.**"
          },
          {
            "type": "h2",
            "text": "Why Influencers and Content Creators Should Pay Attention"
          },
          {
            "type": "p",
            "text": "Artificial intelligence is transforming the creator economy."
          },
          {
            "type": "p",
            "text": "An influencer can now produce realistic images, generate video sequences, create synthetic voiceovers, or develop entire advertising campaigns using AI tools."
          },
          {
            "type": "p",
            "text": "These capabilities also raise important transparency questions."
          },
          {
            "type": "p",
            "text": "When should audiences be informed that content has been artificially generated or manipulated?"
          },
          {
            "type": "p",
            "text": "What is the difference between AI-assisted writing and realistic synthetic media?"
          },
          {
            "type": "p",
            "text": "How do the EU AI Act's transparency provisions apply to different types of published content?"
          },
          {
            "type": "p",
            "text": "The book examines transparency obligations, including those addressed in [Article 50 of the EU AI Act](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng), and explains why the nature of the content and the way it is presented matter."
          },
          {
            "type": "p",
            "text": "Importantly, **the EU AI Act does not impose an identical disclosure requirement on every piece of AI-assisted content**."
          },
          {
            "type": "p",
            "text": "For influencers, marketers, and digital creators, understanding these distinctions can help avoid unnecessary confusion while supporting responsible communication with audiences."
          },
          {
            "type": "h2",
            "text": "A Practical Resource for One-Person Online Businesses"
          },
          {
            "type": "p",
            "text": "Consider a small online store operated by a single entrepreneur."
          },
          {
            "type": "p",
            "text": "The owner manages the website, handles orders, communicates with customers, creates advertisements, and maintains social media accounts."
          },
          {
            "type": "p",
            "text": "AI tools can make all these tasks easier."
          },
          {
            "type": "p",
            "text": "But the owner may have no legal department, compliance officer, or dedicated IT team."
          },
          {
            "type": "p",
            "text": "This is precisely where an accessible practical guide can be valuable."
          },
          {
            "type": "p",
            "text": "The AI Act File encourages business owners to start with a straightforward assessment of their existing AI tools."
          },
          {
            "type": "p",
            "text": "For example:"
          },
          {
            "type": "ul",
            "items": [
              "Which AI tools am I actually using?",
              "Do any of them communicate directly with my customers?",
              "Am I publishing synthetic images, audio, or videos?",
              "What personal or confidential information do I enter into AI systems?",
              "Which activities are automated, and which decisions remain under human control?",
              "What information or records should I maintain, where applicable?"
            ]
          },
          {
            "type": "p",
            "text": "These questions provide a starting point for understanding the relationship between everyday AI use and regulatory responsibilities."
          },
          {
            "type": "p",
            "text": "The objective is not to create unnecessary paperwork."
          },
          {
            "type": "p",
            "text": "It is to help entrepreneurs distinguish relevant obligations from requirements that do not apply to their activities."
          },
          {
            "type": "h2",
            "text": "What Will Readers Learn?"
          },
          {
            "type": "p",
            "text": "The AI Act File covers practical aspects of AI governance and compliance, including:"
          },
          {
            "type": "ul",
            "items": [
              "Identifying AI systems used within a business.",
              "Understanding the distinction between AI providers and deployers.",
              "Recognizing potentially high-risk AI applications.",
              "Understanding transparency and disclosure requirements.",
              "Organizing meaningful human oversight.",
              "Identifying relevant documentation and record-keeping obligations.",
              "Understanding responsibilities relating to data and AI outputs.",
              "Responding to changes in AI systems and potential incidents.",
              "Keeping compliance information accurate as technology evolves."
            ]
          },
          {
            "type": "p",
            "text": "The book emphasizes a fundamental principle:"
          },
          {
            "type": "p",
            "text": "**Effective AI governance begins with understanding what your AI systems actually do.**"
          },
          {
            "type": "h2",
            "text": "Designed for People Without a Compliance Department"
          },
          {
            "type": "p",
            "text": "For large organizations, regulatory compliance may involve legal specialists, risk managers, technical teams, and external consultants."
          },
          {
            "type": "p",
            "text": "For a freelancer, influencer, or sole trader, those resources may not be available."
          },
          {
            "type": "p",
            "text": "The AI Act File approaches AI governance from a practical business perspective."
          },
          {
            "type": "p",
            "text": "It helps readers organize an initial assessment, understand which questions to ask, and identify situations where specialist advice may be necessary."
          },
          {
            "type": "p",
            "text": "The book does not replace professional legal advice or guarantee regulatory compliance."
          },
          {
            "type": "p",
            "text": "Instead, it aims to make the EU AI Act more understandable and manageable for people who need to make informed decisions themselves."
          },
          {
            "type": "p",
            "text": "This makes the publication relevant not only to compliance professionals but also to:"
          },
          {
            "type": "ul",
            "items": [
              "Influencers and social media content creators.",
              "Freelancers and independent consultants.",
              "One-person e-commerce businesses.",
              "Small online retailers.",
              "Digital marketers and advertising professionals.",
              "Microenterprises and small business owners.",
              "Entrepreneurs introducing AI into everyday business operations."
            ]
          },
          {
            "type": "h2",
            "text": "Coming Soon: The AI Act File"
          },
          {
            "type": "p",
            "text": "**The AI Act File** is being prepared as an English-language practical handbook for businesses and professionals navigating the European Union's AI regulatory framework."
          },
          {
            "type": "p",
            "text": "Its focus is straightforward: translating complex regulatory concepts into practical questions, decisions, and actions."
          },
          {
            "type": "p",
            "text": "For entrepreneurs working independently, the ability to understand what applies — and what does not — can be just as important as understanding the regulation itself."
          },
          {
            "type": "p",
            "text": "Further information about the publication, availability, and purchasing options will be announced in due course."
          },
          {
            "type": "p",
            "text": "**Follow Creative Destruction for updates on the upcoming release of The AI Act File.**"
          },
          {
            "type": "p",
            "text": "Related: [AI Governance at CREATIVE DESTRUCTION](/capabilities/) · [Official text of Regulation (EU) 2024/1689 on EUR-Lex](https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng)"
          }
        ],
        "related": "AI Governance",
        "seoTitle": "The AI Act File – Practical EU AI Act Guide Coming Soon",
        "seoDescription": "Discover The AI Act File, an upcoming practical EU AI Act guide for influencers, freelancers, online sellers, solo entrepreneurs and small businesses."
      }
    ],
    empty: "Verified news records will appear here."
  },
  about: {
    eyebrow: "About / 06",
    title: "A research-led technology\ncompany built for collaboration.",
    intro: "CREATIVE DESTRUCTION develops digital products and systems through research, engineering and innovation work across company, project and institutional environments.",
    facts: [
      { label: "Registered name", value: "\"CREATIVE DESTRUCTION\"DPK" },
      { label: "Company Registration Number (UIC)", value: "208581552" },
      { label: "EU Participant Identification Code (PIC)", value: "867994219" },
      { label: "Based in", value: "Bulgaria" },
      { label: "Phone", value: "+359 898 686 808", href: "tel:+359898686808" }
    ],
    principles: [
      { id: "01", name: "Research-led", description: "Technical work begins with a clear problem, evidence and an inspectable hypothesis." },
      { id: "02", name: "Product-oriented", description: "Research and engineering are directed toward usable systems and sustainable product structures." },
      { id: "03", name: "Collaborative", description: "The company is designed to work with businesses, universities, research organisations and innovation partners." },
      { id: "04", name: "European", description: "The operating context includes European research, technology and regulatory environments." }
    ]
  },
  contact: {
    eyebrow: "Contact / 07",
    title: "Start with the technology question.",
    intro: "Contact CREATIVE DESTRUCTION about products, research collaboration, project partnerships or technology development.",
    emailLabel: "Direct contact", email: "contact@creative-destruction.eu", phone: "+359 898 686 808",
    routes: [
      { id: "01", name: "Product enquiry", description: "Discuss an AI, SaaS or digital product direction.", subject: "Product enquiry" },
      { id: "02", name: "Research collaboration", description: "Explore applied research, experimentation or validation work.", subject: "Research collaboration" },
      { id: "03", name: "Project partnership", description: "Discuss collaborative innovation and technology projects.", subject: "Project partnership" },
      { id: "04", name: "Technology collaboration", description: "Explore software, data, AI or system integration work.", subject: "Technology collaboration" }
    ],
    note: ""
  },
  footer: { statement: "Research, AI and software engineering shaped into deployable digital products and systems.", contactLabel: "Direct contact", rights: "Creative Destruction. All rights reserved." },
  // Fill in from the Commercial Register record. Empty strings are hidden on the site.
  legal: {
    label: "Company details",
    entityName: "\"CREATIVE DESTRUCTION\"DPK",
    uic: "208581552",
    // Not VAT-registered (Commercial Register, 13.10.2026). Add "BG…" here if that changes.
    vatNumber: "",
    pic: "867994219",
    registeredAddress: "7 Odrinska Epopeya St., entr. A, fl. 5, apt. 33, 6000 Stara Zagora, Bulgaria"
  }
};
