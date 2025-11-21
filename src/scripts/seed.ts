import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

const PROGRAMS = [
  {
    name: "GIMP",
    description: "A cross-platform image editor available for GNU/Linux, OS X, Windows and more.",
    tags: ["Design", "Image Editor"],
    link: "https://www.gimp.org/",
    image: "/icons/gimp.png",
    alternativesTo: ["Adobe Photoshop", "Photoshop"],
  },
  {
    name: "Blender",
    description: "Free and open source 3D creation suite. It supports the entirety of the 3D pipeline.",
    tags: ["3D", "Animation", "Modeling"],
    link: "https://www.blender.org/",
    image: "/icons/blender.png",
    alternativesTo: ["Maya", "Cinema 4D", "3ds Max"],
  },
  {
    name: "LibreOffice",
    description: "A powerful office suite – its clean interface and feature-rich tools help you unleash your creativity.",
    tags: ["Office", "Productivity"],
    link: "https://www.libreoffice.org/",
    image: "/icons/libreoffice.png",
    alternativesTo: ["Microsoft Word", "Word", "Microsoft Office", "Excel", "PowerPoint"],
  },
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
    name: "Inkscape",
    description: "A professional vector graphics editor for Windows, Mac OS X and Linux.",
    tags: ["Design", "Vector"],
    link: "https://inkscape.org/",
    image: "/icons/inkscape.png",
    alternativesTo: ["Adobe Illustrator", "CorelDRAW"],
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
