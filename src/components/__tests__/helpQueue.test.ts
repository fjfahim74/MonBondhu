import { enqueueHelpRequest, getHelpQueue, flushHelpQueue } from '@/lib/help';

describe('help queue', () => {
  test('enqueue stores a queued request and flush sends it', async () => {
    // Enqueue
    enqueueHelpRequest({ category: 'stress', note: 'test', consentConfirmed: true });
    const q1 = getHelpQueue();
    expect(q1.length).toBeGreaterThan(0);
    expect(q1[q1.length - 1].status).toBe('queued');

    // Mock fetch for flush
    const originalFetch = global.fetch as any;
    global.fetch = jest.fn().mockResolvedValue({ ok: true, json: async () => ({ ok: true, ref: 'HR-xyz' }) });
    const res = await flushHelpQueue();
    expect(res.sent).toBeGreaterThanOrEqual(1);
    const q2 = getHelpQueue();
    expect(q2[q2.length - 1].status).toBe('sent');
    expect(q2[q2.length - 1].ref).toBeDefined();
    global.fetch = originalFetch;
  });
});
