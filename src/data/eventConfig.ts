export interface EventConfig {
  event: {
    name: string;
    fullName: string;
    edition: string;
    tagline: string;
    subLabel: string;
    description: string;
    aboutDescription: string;
    date: string;
    venue: string;
  };
  brand: {
    organizer: string;
    institution: string;
    motto: string;
  };
  navigation: {
    label: string;
    href: string;
  }[];
  experience: {
    id: string;
    number: string;
    title: string;
    tagline: string;
    description: string;
    highlights: string[];
  }[];
  socials: {
    name: string;
    url: string;
    handle: string;
    icon: 'linkedin' | 'instagram' | 'twitter' | 'github';
  }[];
}

export const eventConfig: EventConfig = {
  event: {
    name: "GENESIS 2026",
    fullName: "GENESIS 2026 – AWS Student Builder Group Launch Event",
    edition: "2026",
    tagline: "DISCOVER AWS. UNLOCK THE CLOUD.",
    subLabel: "AWS STUDENT BUILDER GROUP PRESENTS",
    description:
      "Step into the world of cloud computing. Explore AWS technologies, connect with fellow innovators and become part of the next generation of cloud builders.",
    aboutDescription:
      "GENESIS marks the launch of AWS Student Builder Group at KCC ITM, bringing students together to explore cloud computing, develop technical skills and build innovative solutions.",
    date: "25 NOVEMBER 2026",
    venue: "KCC ITM, GREATER NOIDA",
  },
  brand: {
    organizer: "AWS Student Builder Group",
    institution: "KCC Institute of Technology & Management",
    motto: "BUILD. EXPLORE. INNOVATE.",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Create Pass", href: "/create-pass" },
    { label: "Preview", href: "/preview" },
  ],
  experience: [
    {
      id: "cloud-foundations",
      number: "01",
      title: "Cloud Architecture & Foundations",
      tagline: "BUILD ON THE WORLD'S LEADING CLOUD",
      description:
        "Demystify core AWS computing, serverless infrastructure, and storage systems through guided, hands-on architectural deep dives.",
      highlights: ["AWS Core Compute (EC2, Lambda)", "S3 Object Storage Architecture", "Virtual Private Cloud (VPC) Networking"],
    },
    {
      id: "ai-genai",
      number: "02",
      title: "Generative AI & Machine Learning",
      tagline: "HARNESS NEXT-GEN INTELLIGENCE",
      description:
        "Explore enterprise AI development with Amazon Bedrock, Titan, and SageMaker. Learn how modern engineers build intelligent agents.",
      highlights: ["Amazon Bedrock Foundation Models", "Retrieval-Augmented Generation (RAG)", "Autonomous AI Agents"],
    },
    {
      id: "student-community",
      number: "03",
      title: "Student Builder Community",
      tagline: "NETWORK WITH PEER INNOVATORS",
      description:
        "Connect directly with certified cloud architects, industry mentors, and ambitious builders across NCR colleges and universities.",
      highlights: ["Cloud Career Roadmaps & Mentorship", "AWS Certifications Guidance", "Collaborative Hackathon Teams"],
    },
    {
      id: "hands-on-labs",
      number: "04",
      title: "Live Workshops & Deployments",
      tagline: "REAL-TIME CODE TO CLOUD",
      description:
        "Walk away with production deployments under your belt. Experience live cloud deployment pipelines during exclusive event workshops.",
      highlights: ["CI/CD with AWS CodePipeline", "Infrastructure as Code (Terraform / CDK)", "Production Monitoring & Metrics"],
    },
  ],
  socials: [
    {
      name: "LinkedIn",
      url: "https://www.linkedin.com/company/aws-sbg-kccitm",
      handle: "AWS Student Builder Group - KCC ITM",
      icon: "linkedin",
    },
    {
      name: "Instagram",
      url: "https://www.instagram.com/awssbg_kcc",
      handle: "@awssbg_kcc",
      icon: "instagram",
    },
  ],
};
