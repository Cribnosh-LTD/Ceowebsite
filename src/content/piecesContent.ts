export type PieceCategory = "By Me" | "About Me";

type PieceSection = {
  heading: string;
  paragraphs: string[];
};

export type PieceArticle = {
  slug: string;
  title: string;
  source: string;
  date: string;
  category: PieceCategory;
  description: string;
  intro: string;
  sections: PieceSection[];
  closing: string;
};

export const pieceArticles: PieceArticle[] = [
  {
    slug: "social-sustainability-as-operating-strategy",
    title: "Social Sustainability Is an Operating Strategy, Not a CSR Add-On",
    source: "By Doyle Omachonu",
    date: "Mar 2026",
    category: "By Me",
    description:
      "Why fair labour, local trust, and resilient systems are execution advantages for modern food businesses.",
    intro:
      "Many leaders still treat social sustainability as branding. That is a costly mistake. In real operating environments, the social layer is where resilience is either built or broken.",
    sections: [
      {
        heading: "Operations Reveal the Truth",
        paragraphs: [
          "When a business has weak labour standards or opaque supplier practices, those problems eventually show up as service instability, high turnover, and reputational drag.",
          "Social sustainability is not a side project. It is a practical way to reduce operational friction and improve reliability over time.",
        ],
      },
      {
        heading: "Trust Is a Performance Multiplier",
        paragraphs: [
          "Customers, partners, and teams commit more deeply when they trust the system behind the brand.",
          "Trust compounds in the same way quality compounds. It lowers enforcement costs, improves decision speed, and creates room for long-term planning.",
        ],
      },
      {
        heading: "Leadership Implication",
        paragraphs: [
          "If your growth model depends on hidden harm, it is not a growth model. It is a temporary extraction model.",
          "The leaders who will win the next decade are those who can connect ethical standards to execution excellence.",
        ],
      },
    ],
    closing:
      "The question is no longer whether social sustainability matters. The question is whether your operating system is designed to deliver it.",
  },
  {
    slug: "food-security-is-economic-security",
    title: "Food Security Is Economic Security: A Founder’s View",
    source: "By Doyle Omachonu",
    date: "Mar 2026",
    category: "By Me",
    description:
      "How local food systems, surplus redistribution, and creator-led supply chains strengthen communities and markets.",
    intro:
      "Food insecurity is often discussed as a social issue, but founders should also see it as an economic systems issue. Fragile food access weakens households, neighborhoods, and local business ecosystems.",
    sections: [
      {
        heading: "Local Systems Build Resilience",
        paragraphs: [
          "When supply chains are too centralized, communities become exposed to disruption. Local creator networks and neighborhood logistics can absorb shocks faster.",
          "Diverse local supply is not inefficiency. It is strategic redundancy that protects continuity.",
        ],
      },
      {
        heading: "Surplus Is a Design Problem",
        paragraphs: [
          "Waste at scale is rarely accidental. It is usually a mismatch between production, demand signals, and distribution pathways.",
          "Better systems can redirect edible surplus toward affordability and access while preserving business viability.",
        ],
      },
      {
        heading: "A Better Economic Lens",
        paragraphs: [
          "Strong food systems improve workforce stability, household confidence, and local spending power.",
          "Founders should treat food infrastructure as part of economic infrastructure, not as a narrow category play.",
        ],
      },
    ],
    closing:
      "The future belongs to leaders who can treat food access, economic dignity, and operating performance as one connected design challenge.",
  },
  {
    slug: "leadership-playbook-clarity-standards-trust",
    title: "The Leadership Playbook I Use: Clarity, Standards, and Trust",
    source: "By Doyle Omachonu",
    date: "Apr 2026",
    category: "By Me",
    description:
      "The operating principles behind my decisions across teams, partnerships, and growth environments.",
    intro:
      "Every leader eventually chooses between noise and clarity. I anchor decisions using three principles: clarity of direction, standards of execution, and trust as infrastructure.",
    sections: [
      {
        heading: "Clarity Before Activity",
        paragraphs: [
          "Teams move faster when priorities are explicit. Ambiguity creates busywork, not momentum.",
          "I spend disproportionate time defining what matters now, what can wait, and what we will not do.",
        ],
      },
      {
        heading: "Standards Protect the Mission",
        paragraphs: [
          "Standards are not bureaucracy. They are safeguards for quality, safety, and consistency.",
          "When standards are clear, teams can move independently without sacrificing reliability.",
        ],
      },
      {
        heading: "Trust Reduces Transaction Cost",
        paragraphs: [
          "High-trust teams escalate earlier, recover faster, and collaborate better under pressure.",
          "Trust is built through transparency, accountability, and repeated follow-through on commitments.",
        ],
      },
    ],
    closing:
      "My playbook is simple: align people around clarity, execute with discipline, and treat trust as a core operating asset.",
  },
  {
    slug: "from-manufacturing-to-food-systems",
    title: "From Manufacturing Floors to Food Systems Thinking",
    source: "By Doyle Omachonu",
    date: "Apr 2026",
    category: "By Me",
    description:
      "Lessons from process optimization that now shape how I build in FoodTech.",
    intro:
      "I learned leadership in environments where process discipline was non-negotiable. That experience still shapes how I approach modern food systems and platform design.",
    sections: [
      {
        heading: "Process Is Culture in Action",
        paragraphs: [
          "On plant floors, weak process discipline becomes visible immediately through defects, delays, and waste.",
          "The same pattern appears in digital businesses. Process quality and culture quality are deeply connected.",
        ],
      },
      {
        heading: "Measurement Enables Improvement",
        paragraphs: [
          "You cannot improve what you do not observe. Reliable metrics turn assumptions into actionable decisions.",
          "Across operations, the right indicators create faster feedback loops and better resource allocation.",
        ],
      },
      {
        heading: "System Thinking Scales Better",
        paragraphs: [
          "Point fixes help temporarily, but systemic design changes create durable gains.",
          "That is why I focus on end-to-end flows: sourcing, quality, logistics, and stakeholder trust.",
        ],
      },
    ],
    closing:
      "Manufacturing taught me that excellence is engineered. Food innovation deserves the same rigor.",
  },
  {
    slug: "inclusive-workforce-design",
    title: "Inclusive Workforce Design Beats Short-Term Efficiency",
    source: "By Doyle Omachonu",
    date: "May 2026",
    category: "By Me",
    description:
      "Why dignified work models outperform extractive labor models over the long run.",
    intro:
      "Short-term efficiency often looks impressive on dashboards while quietly degrading the workforce beneath it. Inclusive workforce design is a stronger long-term strategy.",
    sections: [
      {
        heading: "Hidden Costs of Extractive Models",
        paragraphs: [
          "Low-trust labor systems create churn, inconsistency, and repeated retraining costs.",
          "These costs rarely appear in simple efficiency reporting, but they erode performance over time.",
        ],
      },
      {
        heading: "Dignity Drives Reliability",
        paragraphs: [
          "People perform better when compensation, expectations, and growth pathways are fair and explicit.",
          "Inclusive design builds ownership and reduces fragility in service delivery.",
        ],
      },
      {
        heading: "Design for Long Cycles",
        paragraphs: [
          "Leadership should optimize for three-year outcomes, not three-week optics.",
          "Workforce systems built on fairness, training, and trust produce better resilience during stress events.",
        ],
      },
    ],
    closing:
      "The strongest teams are not extracted from. They are built with intention.",
  },
  {
    slug: "building-durable-food-infrastructure-interview",
    title: "Interview: Building Durable Food Infrastructure in the UK",
    source: "CEO Interview",
    date: "May 2026",
    category: "About Me",
    description:
      "Conversation on leadership, systems thinking, and the future of local food economies.",
    intro:
      "In this interview, I discussed why the future of food businesses depends on operational discipline, institutional trust, and practical inclusion.",
    sections: [
      {
        heading: "On Leadership",
        paragraphs: [
          "Leadership is not motivational language. It is the repeated act of making clear decisions under uncertainty.",
          "The quality of those decisions depends on how well leaders understand systems, not just strategy decks.",
        ],
      },
      {
        heading: "On Market Direction",
        paragraphs: [
          "Consumers are rewarding businesses that align convenience with quality and values.",
          "The long-term winners will be operators who can deliver this balance consistently.",
        ],
      },
      {
        heading: "On the Next Decade",
        paragraphs: [
          "I expect stronger alignment between policy, sustainability standards, and market expectations.",
          "Businesses that prepare early for this convergence will be more durable and investable.",
        ],
      },
    ],
    closing:
      "The opportunity in UK food systems is significant, but it will reward disciplined builders more than short-term opportunists.",
  },
  {
    slug: "founder-spotlight-trust-led-scale",
    title: "Founder Spotlight: Doyle Omachonu on Trust-Led Scale",
    source: "Industry Feature",
    date: "Jun 2026",
    category: "About Me",
    description:
      "Profile on leadership style, operational discipline, and long-term market vision.",
    intro:
      "This spotlight focused on my approach to trust-led scale and why governance quality matters early in company building.",
    sections: [
      {
        heading: "Style of Leadership",
        paragraphs: [
          "I prefer direct communication, strong operating standards, and accountable collaboration.",
          "Clarity and consistency create confidence across teams and partners.",
        ],
      },
      {
        heading: "Approach to Scale",
        paragraphs: [
          "Scale without trust creates unstable growth. Trust without execution creates stagnation.",
          "The objective is to pair disciplined systems with principled leadership.",
        ],
      },
      {
        heading: "Vision",
        paragraphs: [
          "I see food as an ecosystem challenge across economics, workforce design, and community outcomes.",
          "The most meaningful companies will improve all three, not just transaction volume.",
        ],
      },
    ],
    closing:
      "Trust-led scale is slower to fake and harder to copy, which is exactly why it matters.",
  },
  {
    slug: "ethics-supply-chains-next-food-economy",
    title: "Panel Feature: Ethics, Supply Chains, and the Next Food Economy",
    source: "Conference Session",
    date: "Jun 2026",
    category: "About Me",
    description:
      "Highlights from a panel discussion on responsible growth in food and logistics.",
    intro:
      "This panel examined how founders can build commercially strong businesses while raising standards on labor, sourcing, and environmental impact.",
    sections: [
      {
        heading: "Ethics as Strategy",
        paragraphs: [
          "Ethical practices are often seen as constraints, but they can be strategic advantages when designed into operations early.",
          "Late-stage compliance retrofits are usually more expensive than early-stage principled design.",
        ],
      },
      {
        heading: "Supply Chain Responsibility",
        paragraphs: [
          "Responsible supply chains require visibility, practical standards, and regular verification.",
          "Leaders should focus on building supplier relationships that reward quality and long-term trust.",
        ],
      },
      {
        heading: "Responsible Growth",
        paragraphs: [
          "Growth quality matters more than growth speed. Strong governance determines whether growth is durable.",
          "The next food economy will be defined by companies that can balance margin, dignity, and resilience.",
        ],
      },
    ],
    closing:
      "Responsible growth is not the opposite of ambition. It is ambition with foresight.",
  },
];

export const featuredPieces = pieceArticles.map((piece) => ({
  title: piece.title,
  source: piece.source,
  date: piece.date,
  url: `/pieces/${piece.slug}`,
  category: piece.category,
  description: piece.description,
}));

export function getPieceBySlug(slug: string) {
  return pieceArticles.find((piece) => piece.slug === slug);
}
