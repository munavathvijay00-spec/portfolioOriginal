import type { Portfolio } from "./validation";
export const seed: Portfolio = {
  "profile": {
    "name": "Munavath Vijay",
    "role": "Full Stack Developer",
    "bio": "Passionate student and developer focused on building clean, accessible, and high-performance web applications.",
    "photo": null,
    "resumeLink": "",
    "socials": {
      "github": "https://github.com/munavathvijay00-spec",
      "linkedin": "",
      "twitter": ""
    },
    "headline": "I build secure tokenization engines & dynamic dashboards."
  },
  "projects": [
    {
      "id": "1",
      "title": "WorldMoniter",
      "description": "The World Moniter project is a web-based monitoring system designed to collect, display, and track information from different sources in one place.",
      "techStack": [
        "React",
        "D3.js",
        "Tailwind",
        "Vite"
      ],
      "githubLink": "",
      "image": "/projects/world_monitor.png",
      "problem": "Monitoring global data in real-time is complex and often requires multiple disconnected tools.",
      "solution": "Created a unified dashboard that aggregates diverse data streams into a single, intuitive geographical interface.",
      "challenges": "Synchronizing high-frequency data updates without impacting browser performance.",
      "visible": true
    },
    {
      "id": "2",
      "title": "NFT-MARKETPLACE",
      "description": "NFTs are unique digital assets stored on a blockchain that represent ownership of a specific item or piece of content.",
      "techStack": [
        "React",
        "Solidity",
        "Web3.js"
      ],
      "githubLink": "",
      "image": "/projects/nft_marketplace.png",
      "problem": "Digital artists lack secure, decentralized ways to monetize their creative work.",
      "solution": "Developed a secure marketplace using smart contracts to facilitate trustless art trading and ownership verification.",
      "challenges": "Implementing a seamless wallet connection experience for non-technical users.",
      "visible": true
    },
    {
      "id": "3",
      "title": "TOKENIZATION",
      "description": "Tokenization is the process of converting real-world assets, data, or rights into digital tokens on a blockchain.",
      "techStack": [
        "Vite",
        "Ether.js",
        "TypeScript"
      ],
      "githubLink": "",
      "image": "/projects/tokenization.png",
      "problem": "Illiquid assets like real estate or gold are difficult to trade in smaller increments.",
      "solution": "Built a fractional ownership platform that breaks down physical assets into tradable digital tokens.",
      "challenges": "Ensuring regulatory compliance and secure off-chain asset verification.",
      "visible": true
    }
  ],
  "education": [
    {
      "id": "1",
      "institution": "State University",
      "year": "2021 - Present",
      "marks": "3.8 CGPA",
      "visible": false
    }
  ],
  "achievements": [
    {
      "id": "1",
      "title": "Google Cloud Certified",
      "image": null,
      "visible": false
    }
  ],
  "contactInfo": {
    "email": "munavathvijay00@gmail.com",
    "location": "Hyderabad, Telangana",
    "phone": "7013906794"
  },
  "skills": [
    {
      "id": "1",
      "name": "React",
      "category": "Frontend",
      "visible": true
    },
    {
      "id": "2",
      "name": "Node.js",
      "category": "Backend",
      "visible": true
    },
    {
      "id": "3",
      "name": "Tailwind CSS",
      "category": "Design",
      "visible": true
    }
  ],
  "experience": [
    {
      "id": "1",
      "role": "Junior Developer",
      "company": "Tech Solutions Inc.",
      "duration": "2023 - Present",
      "description": "Working on building modern web applications using React and Node.js.",
      "visible": false
    }
  ],
  "devLog": [
    {
      "id": "1",
      "date": "May 10, 2026",
      "title": "Started Portfolio Upgrade",
      "content": "Today I began a major overhaul of my portfolio, implementing a new Bento Grid layout and a premium color palette.",
      "visible": true
    }
  ]
};
