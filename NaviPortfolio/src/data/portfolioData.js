/**
 * SINGLE SOURCE OF TRUTH — NAVEEN KUMAR
 * Strictly based on verified CV data. No fabricated data.
 */

export const PORTFOLIO_DATA = {
  identity: {
    name: "NAVEEN KUMAR",
    title: "AI Automation Engineer",
    secondaryTitles: [
      "Python Automation Engineer",
      "Semiconductor Automation",
      "Engineering Workflow Automation"
    ],
    contact: {
      phone: "+91 8015989880",
      email: "navikalimuthu1@gmail.com",
      location: "K.R. Puram, Bangalore, Karnataka, India",
      linkedin: "https://www.linkedin.com/in/naveen-kalimuthu-77523037b",
    },
    statement: "Motivated and reliable professional seeking an automation role in the semiconductor industry, with strong skills in Python automation, process improvement, data handling, and engineering workflow support."
  },

  heroProject: {
    title: "Automated IBIS Model Generator",
    role: "AI Automation / Python Engineer",
    rating: 5,
    summary: "Developed a Python-based automation tool to generate industry-standard IBIS (.ibs) models from semiconductor simulation and characterization data. The workflow automates input-file discovery, data extraction, processing, electrical calculations, and model generation. Automated extraction, transformation, processing, and reporting of semiconductor simulation results to reduce repetitive manual engineering activities.",
    fileTypes: [".list", ".txt", ".csv", ".net", ".spec", ".log"],
    pipelineStages: [
      { id: "files", label: "Input Files Discovery", desc: "Automated discovery of .list, .txt, .csv, .net, .spec, and .log files" },
      { id: "regex", label: "Regex Parsing Engine", desc: "Regular-expression based extraction of simulation and metadata" },
      { id: "data", label: "Data Extraction & Model Mapping", desc: "Characterization data organization for IBIS generation" },
      { id: "circuits", label: "Clamp & Curve Processing", desc: "Processed pull-up, pull-down, power-clamp, and ground-clamp data" },
      { id: "calcs", label: "Electrical Calculations", desc: "Pull-up calculations with clamp-current residual correction & ramp-data processing" },
      { id: "corners", label: "Characterization Corners", desc: "Strict verification across Typ, Min, and Max corners" },
      { id: "validation", label: "Validation Engine", desc: "Comprehensive validation for missing, invalid, or inconsistent input data" },
      { id: "output", label: "IBIS Model Generation", desc: "Generated and saved complete verified .ibs models into project output folder" },
      { id: "gui", label: "Engineering GUI", desc: "CustomTkinter / PySide6 GUI to simplify engineering workflows" }
    ],
    tools: ["Python", "Regex", "CustomTkinter", "PySide6", "CSV/Text Processing", "IBIS"]
  },

  experience: [
    {
      role: "AI Automation Engineer",
      company: "Socsang Semiconductors Pvt Ltd",
      location: "Bangalore, Karnataka",
      period: "May 2026 – Present",
      bullets: [
        "Developed and maintained Python automation scripts to streamline semiconductor design and characterization workflows.",
        "Automated data extraction, processing, and report generation from simulation results.",
        "Created tools for converting simulation output data into industry-standard formats, including IBIS model generation and validation support.",
        "Developed GUI-based Python applications to simplify engineering workflows and improve team productivity."
      ],
      tags: ["Python", "Semiconductor Workflow", "Simulation Data", "IBIS", "Automation"]
    },
    {
      role: "Technical Support Engineer – Accounts Operations",
      company: "Hassani Group of Companies",
      location: "Dubai, UAE",
      period: "2023 – 2025",
      bullets: [
        "Provided technical support for accounting and financial software applications.",
        "Managed user accounts, including creation, modification, and deactivation.",
        "Configured and maintained user roles, permissions, and access controls."
      ],
      tags: ["Technical Support", "User Accounts", "Access Controls", "Software Operations"]
    }
  ],

  technicalCompetencies: [
    { name: "Python", category: "Core", exp: "1+ year", lastUsed: "2026", primary: true },
    { name: "Python Automation", category: "Domain", exp: "1+ year", lastUsed: "2026", primary: true },
    { name: "IBIS Model Generation", category: "EDA / Semiconductor", exp: "1+ year", lastUsed: "2026", primary: true },
    { name: "Simulation Data Processing", category: "Data", exp: "1+ year", lastUsed: "2026", primary: true },
    { name: "Regex / File Parsing", category: "Engineering Extraction", exp: "1+ year", lastUsed: "2026", primary: true },
    { name: "GUI Development", category: "Applications", exp: "1+ year", lastUsed: "2026", primary: false },
    { name: "Web Designing", category: "Frontend", exp: "1+ year", lastUsed: "2026", primary: false },
    { name: "MS Office", category: "Productivity", exp: "1+ year", lastUsed: "2026", primary: false }
  ],

  toolsAndFrameworks: [
    "Python",
    "Regex",
    "CustomTkinter",
    "PySide6",
    "CSV / Text Processing",
    "IBIS (.ibs)"
  ],

  education: [
    {
      degree: "Master of Science in Computer Science",
      institution: "Alagappa University",
      period: "2021 – 2023"
    },
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "Alagappa University",
      period: "2018 – 2021"
    }
  ],

  certifications: [
    {
      title: "Automating Real-World Tasks with Python",
      issuer: "Google / Coursera",
      verificationUrl: "https://coursera.org/verify/0DODEFPA04R5"
    }
  ],

  languages: [
    { name: "Tamil", level: "Native / Proficient" },
    { name: "English", level: "Professional Working" },
    { name: "Hindi", level: "Conversational" },
    { name: "Malayalam", level: "Conversational" }
  ]
};
