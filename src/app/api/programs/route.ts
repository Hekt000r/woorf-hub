import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import connectDB from '@/lib/db';
import Program from '@/models/Program';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    await connectDB();
    const body = await req.json();
    
    // Basic validation
    const { name, description, tags, link, image, alternativesTo } = body;

    if (!name || !description || !link || !image) {
       return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Ensure tags and alternativesTo are arrays
    const tagsArray = Array.isArray(tags) ? tags : (tags ? tags.split(',').map((t: string) => t.trim()) : []);
    const alternativesArray = Array.isArray(alternativesTo) ? alternativesTo : (alternativesTo ? alternativesTo.split(',').map((t: string) => t.trim()) : []);

    const program = await Program.create({
      name,
      description,
      tags: tagsArray,
      link,
      image,
      alternativesTo: alternativesArray,
    });

    return NextResponse.json(program, { status: 201 });
  } catch (error) {
    console.error('Error creating program:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
