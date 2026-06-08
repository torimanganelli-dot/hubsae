import { createClientFromRequest } from 'npm:@base44/sdk@0.8.20';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Use service role so all users can see all participants and submissions
    // Use a high limit to ensure all users are returned
    const [users, subs] = await Promise.all([
      base44.asServiceRole.entities.User.list(null, 500),
      base44.asServiceRole.entities.Submission.list(null, 1000),
    ]);

    return Response.json({ users, subs });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});