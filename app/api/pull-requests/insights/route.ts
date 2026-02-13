import { NextResponse } from 'next/server';
import { auth } from '@/lib/auth';
import { db } from '@/lib/db';
import { pullRequests } from '@/lib/domain-schema';
import { eq, desc } from 'drizzle-orm';
import { randomUUID } from 'crypto';

export const runtime = 'nodejs';

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const items = await db.select().from(pullRequestsInsights)
    .where(eq(pullRequestsInsights.userId, session.user.id))
    .orderBy(desc(pullRequestsInsights.createdAt))
    .limit(100);

  return NextResponse.json({ items, count: items.length });
}

export async function POST(request: Request) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = await request.json();
  const id = randomUUID();

  const [item] = await db.insert(pullRequestsInsights).values({
    id,
    userId: session.user.id,
    ...body,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();

  return NextResponse.json(item, { status: 201 });
}
