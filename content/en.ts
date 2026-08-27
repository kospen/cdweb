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
      { slug: "research-ai-software", date: "2026-08-25", category: "Company update", title: "A broader architecture for research, AI and software", summary: "CREATIVE DESTRUCTION now presents products, projects, research and engineering as one connected technology system.", paragraphs: ["CREATIVE DESTRUCTION operates at the intersection of research, artificial intelligence, software engineering and product development.", "The updated company architecture gives each initiative its own place while keeping a shared path from investigation to deployable systems.", "Verified product, project and partnership records will be expanded as publication-ready information becomes available."], related: "Company" },
      { slug: "ai-governance-initiative", date: "2026-08-25", category: "Initiative update", title: "AI Governance positioned within the wider technology portfolio", summary: "AI Governance remains a focused initiative and capability alongside software, products and R&D.", paragraphs: ["The AI Governance direction covers assessment, risk classification, documentation, governance evidence and lifecycle controls for AI systems.", "It is presented as one initiative within a broader technology portfolio rather than as the umbrella identity of CREATIVE DESTRUCTION.", "This structure allows governance expertise to connect with engineering and research when a technology initiative requires it."], related: "AI Governance" }
    ],
    empty: "Verified news records will appear here."
  },
  about: {
    eyebrow: "About / 06",
    title: "A research-led technology\ncompany built for collaboration.",
    intro: "CREATIVE DESTRUCTION develops digital products and systems through research, engineering and innovation work across company, project and institutional environments.",
    facts: [
      { label: "Registered name", value: "CREATIVE DESTRUCTION VCC" },
      { label: "Based in", value: "Bulgaria" },
      { label: "Operating context", value: "European research and technology" },
      { label: "Active systems", value: "PDGA · Klardex" }
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
    emailLabel: "Direct contact", email: "",
    routes: [
      { id: "01", name: "Product enquiry", description: "Discuss an AI, SaaS or digital product direction.", subject: "Product enquiry" },
      { id: "02", name: "Research collaboration", description: "Explore applied research, experimentation or validation work.", subject: "Research collaboration" },
      { id: "03", name: "Project partnership", description: "Discuss collaborative innovation and technology projects.", subject: "Project partnership" },
      { id: "04", name: "Technology collaboration", description: "Explore software, data, AI or system integration work.", subject: "Technology collaboration" }
    ],
    note: ""
  },
  footer: { statement: "Research, AI and software engineering shaped into deployable digital products and systems.", contactLabel: "Direct contact", rights: "Creative Destruction. All rights reserved." }
};
