import { loadEnvConfig } from '@next/env';
import mongoose from 'mongoose';

const projectDir = process.cwd();
loadEnvConfig(projectDir);

async function checkIndexes() {
  const { default: connectDB } = await import('../lib/db');
  const { default: Program } = await import('../models/Program');

  await connectDB();
  
  try {
    const indexes = await Program.collection.indexes();
    console.log('Current Indexes:', JSON.stringify(indexes, null, 2));
  } catch (error) {
    console.error('Error listing indexes:', error);
  }
  
  process.exit(0);
}

checkIndexes();
