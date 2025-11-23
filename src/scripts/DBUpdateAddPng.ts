import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function updateImages() {
  // Dynamic imports to ensure env vars are loaded first
  const { default: connectDB } = await import('../lib/db');
  const { default: Program } = await import('../models/Program');

  try {
    console.log('Connecting to MongoDB...');
    await connectDB();
    console.log('Connected.');

    console.log('Fetching all programs...');
    const programs = await Program.find({});
    console.log(`Found ${programs.length} programs.`);

    let updatedCount = 0;

    for (const program of programs) {
      if (program.image && !program.image.endsWith('.png')) {
        const oldImage = program.image;
        const newImage = `${oldImage}.png`;
        
        program.image = newImage;
        await program.save();
        
        console.log(`Updated: ${program.name} (${oldImage} -> ${newImage})`);
        updatedCount++;
      }
    }

    console.log(`Update complete. Total programs updated: ${updatedCount}`);
    process.exit(0);
  } catch (error) {
    console.error('Error updating database:', error);
    process.exit(1);
  }
}

updateImages();
