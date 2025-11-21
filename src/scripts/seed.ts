import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const PROGRAMS = [
  // Office & Productivity
  {
    name: "LibreOffice",
    description: "A powerful office suite – its clean interface and feature-rich tools help you unleash your creativity.",
    tags: ["Office", "Productivity"],
    link: "https://www.libreoffice.org/",
    image: "/icons/libreoffice.png",
    alternativesTo: ["Microsoft Word", "Word", "Microsoft Office", "Excel", "PowerPoint"],
  },
  {
    name: "Apache OpenOffice",
    description: "The free and open productivity suite with word processor, spreadsheet, and presentation software.",
    tags: ["Office", "Productivity"],
    link: "https://www.openoffice.org/",
    image: "/icons/openoffice.png",
    alternativesTo: ["Microsoft Office", "Word", "Excel"],
  },
  {
    name: "OnlyOffice",
    description: "A comprehensive office suite for document editing and collaboration in the cloud.",
    tags: ["Office", "Productivity", "Collaboration"],
    link: "https://www.onlyoffice.com/",
    image: "/icons/onlyoffice.png",
    alternativesTo: ["Microsoft Office", "Google Workspace"],
  },

  // Graphics & Design
  {
    name: "GIMP",
    description: "A cross-platform image editor available for GNU/Linux, OS X, Windows and more.",
    tags: ["Design", "Image Editor"],
    link: "https://www.gimp.org/",
    image: "/icons/gimp.png",
    alternativesTo: ["Adobe Photoshop", "Photoshop"],
  },
  {
    name: "Inkscape",
    description: "A professional vector graphics editor for Windows, Mac OS X and Linux.",
    tags: ["Design", "Vector"],
    link: "https://inkscape.org/",
    image: "/icons/inkscape.png",
    alternativesTo: ["Adobe Illustrator", "CorelDRAW"],
  },
  {
    name: "Krita",
    description: "A professional free and open source painting program made by artists for artists.",
    tags: ["Design", "Painting", "Art"],
    link: "https://krita.org/",
    image: "/icons/krita.png",
    alternativesTo: ["Adobe Photoshop", "Corel Painter"],
  },

  // 3D & Animation
  {
    name: "Blender",
    description: "Free and open source 3D creation suite. It supports the entirety of the 3D pipeline.",
    tags: ["3D", "Animation", "Modeling"],
    link: "https://www.blender.org/",
    image: "/icons/blender.png",
    alternativesTo: ["Maya", "Cinema 4D", "3ds Max"],
  },

  // Audio & Video
  {
    name: "VLC Media Player",
    description: "A free and open source cross-platform multimedia player and framework that plays most multimedia files.",
    tags: ["Video", "Audio", "Player"],
    link: "https://www.videolan.org/vlc/",
    image: "/icons/vlc.png",
    alternativesTo: ["Windows Media Player", "QuickTime"],
  },
  {
    name: "Audacity",
    description: "Free, open source, cross-platform audio software for multi-track recording and editing.",
    tags: ["Audio", "Editing", "Recording"],
    link: "https://www.audacityteam.org/",
    image: "/icons/audacity.png",
    alternativesTo: ["Adobe Audition", "GarageBand", "Logic Pro"],
  },
  {
    name: "OBS Studio",
    description: "Free and open source software for video recording and live streaming.",
    tags: ["Video", "Streaming", "Recording"],
    link: "https://obsproject.com/",
    image: "/icons/obs.png",
    alternativesTo: ["XSplit", "Streamlabs"],
  },
  {
    name: "Shotcut",
    description: "A free, open source, cross-platform video editor.",
    tags: ["Video", "Editing"],
    link: "https://shotcut.org/",
    image: "/icons/shotcut.png",
    alternativesTo: ["Adobe Premiere Pro", "Final Cut Pro"],
  },
  {
    name: "Kdenlive",
    description: "A powerful free and open source cross-platform video editing program.",
    tags: ["Video", "Editing"],
    link: "https://kdenlive.org/",
    image: "/icons/kdenlive.png",
    alternativesTo: ["Adobe Premiere Pro", "Final Cut Pro"],
  },

  // Communication & Collaboration
  {
    name: "Rocket.Chat",
    description: "Open source team communication platform with real-time chat, video conferencing, and file sharing.",
    tags: ["Communication", "Collaboration", "Chat"],
    link: "https://rocket.chat/",
    image: "/icons/rocketchat.png",
    alternativesTo: ["Slack", "Microsoft Teams"],
  },
  {
    name: "Mattermost",
    description: "Open source platform for secure collaboration across the entire software development lifecycle.",
    tags: ["Communication", "Collaboration"],
    link: "https://mattermost.com/",
    image: "/icons/mattermost.png",
    alternativesTo: ["Slack", "Microsoft Teams"],
  },
  {
    name: "Jitsi Meet",
    description: "Secure, fully featured, and completely free video conferencing software.",
    tags: ["Video", "Communication", "Conferencing"],
    link: "https://jitsi.org/",
    image: "/icons/jitsi.png",
    alternativesTo: ["Zoom", "Google Meet", "Microsoft Teams"],
  },
  {
    name: "Thunderbird",
    description: "A free email application that's easy to set up and customize.",
    tags: ["Email", "Communication"],
    link: "https://www.thunderbird.net/",
    image: "/icons/thunderbird.png",
    alternativesTo: ["Microsoft Outlook", "Apple Mail"],
  },

  // Development Tools
  {
    name: "VS Code",
    description: "A lightweight but powerful source code editor with built-in support for JavaScript, TypeScript and Node.js.",
    tags: ["Development", "IDE", "Editor"],
    link: "https://code.visualstudio.com/",
    image: "/icons/vscode.png",
    alternativesTo: ["Sublime Text", "Atom"],
  },
  {
    name: "GitLab",
    description: "A complete DevOps platform delivered as a single application for version control and CI/CD.",
    tags: ["Development", "DevOps", "Git"],
    link: "https://about.gitlab.com/",
    image: "/icons/gitlab.png",
    alternativesTo: ["GitHub", "Bitbucket"],
  },
  {
    name: "Docker",
    description: "An open platform for developing, shipping, and running applications in containers.",
    tags: ["Development", "DevOps", "Containers"],
    link: "https://www.docker.com/",
    image: "/icons/docker.png",
    alternativesTo: ["Podman"],
  },
  {
    name: "PostgreSQL",
    description: "A powerful, open source object-relational database system.",
    tags: ["Database", "Development"],
    link: "https://www.postgresql.org/",
    image: "/icons/postgresql.png",
    alternativesTo: ["Oracle Database", "Microsoft SQL Server"],
  },
  {
    name: "MariaDB",
    description: "A community-developed, commercially supported fork of the MySQL relational database.",
    tags: ["Database", "Development"],
    link: "https://mariadb.org/",
    image: "/icons/mariadb.png",
    alternativesTo: ["MySQL", "Oracle Database"],
  },

  // Operating Systems
  {
    name: "Ubuntu",
    description: "The leading Linux distribution for desktops, servers, and the cloud.",
    tags: ["Operating System", "Linux"],
    link: "https://ubuntu.com/",
    image: "/icons/ubuntu.png",
    alternativesTo: ["Windows", "macOS"],
  },
  {
    name: "Fedora",
    description: "An innovative, free, and open source platform for hardware, clouds, and containers.",
    tags: ["Operating System", "Linux"],
    link: "https://getfedora.org/",
    image: "/icons/fedora.png",
    alternativesTo: ["Windows", "macOS"],
  },

  // Security & Privacy
  {
    name: "KeePassXC",
    description: "A cross-platform community-driven port of the Windows application Keepass Password Safe.",
    tags: ["Security", "Password Manager"],
    link: "https://keepassxc.org/",
    image: "/icons/keepassxc.png",
    alternativesTo: ["LastPass", "1Password", "Bitwarden"],
  },
  {
    name: "Bitwarden",
    description: "Open source password management solution for individuals, teams, and business organizations.",
    tags: ["Security", "Password Manager"],
    link: "https://bitwarden.com/",
    image: "/icons/bitwarden.png",
    alternativesTo: ["LastPass", "1Password"],
  },

  // Web Browsers
  {
    name: "Firefox",
    description: "A fast, privacy-focused browser from Mozilla.",
    tags: ["Browser", "Privacy"],
    link: "https://www.mozilla.org/firefox/",
    image: "/icons/firefox.png",
    alternativesTo: ["Google Chrome", "Microsoft Edge"],
  },
  {
    name: "Brave",
    description: "A privacy-focused browser that blocks ads and trackers by default.",
    tags: ["Browser", "Privacy"],
    link: "https://brave.com/",
    image: "/icons/brave.png",
    alternativesTo: ["Google Chrome", "Safari"],
  },

  // Analytics & Business
  {
    name: "Plausible",
    description: "Simple, open-source, lightweight analytics alternative to Google Analytics.",
    tags: ["Analytics", "Privacy"],
    link: "https://plausible.io/",
    image: "/icons/plausible.png",
    alternativesTo: ["Google Analytics"],
  },
  {
    name: "GanttProject",
    description: "Free project management application for managing projects and creating schedules.",
    tags: ["Project Management", "Productivity"],
    link: "https://www.ganttproject.biz/",
    image: "/icons/ganttproject.png",
    alternativesTo: ["Microsoft Project"],
  },

  // Game Development
  {
    name: "Godot Engine",
    description: "A feature-packed, cross-platform game engine to create 2D and 3D games.",
    tags: ["Game Development", "3D", "2D"],
    link: "https://godotengine.org/",
    image: "/icons/godot.png",
    alternativesTo: ["Unity", "Unreal Engine"],
  },

  // Note-Taking
  {
    name: "Joplin",
    description: "An open source note-taking and to-do application with synchronization capabilities.",
    tags: ["Notes", "Productivity"],
    link: "https://joplinapp.org/",
    image: "/icons/joplin.png",
    alternativesTo: ["Evernote", "OneNote"],
  },
  {
    name: "Obsidian",
    description: "A powerful knowledge base that works on top of local plain-text Markdown files.",
    tags: ["Notes", "Productivity", "Knowledge Base"],
    link: "https://obsidian.md/",
    image: "/icons/obsidian.png",
    alternativesTo: ["Notion", "Roam Research"],
  },
];

async function seed() {
  // Dynamic imports to ensure env vars are loaded first
  const { default: connectDB } = await import('../lib/db');
  const { default: Program } = await import('../models/Program');

  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected.');

    console.log('Clearing existing data...');
    await Program.deleteMany({});

    console.log('Syncing indexes...');
    await Program.syncIndexes();

    console.log('Seeding data...');
    await Program.insertMany(PROGRAMS);

    console.log('Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
