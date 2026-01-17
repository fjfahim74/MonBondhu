import { filterChw, CHW_DATA } from '@/lib/chw';

describe('CHW directory filtering', () => {
  test('filters by upazila', () => {
    const oneUpazila = CHW_DATA[0].upazila;
    const res = filterChw({ upazila: oneUpazila });
    expect(res.every(r => r.upazila === oneUpazila)).toBe(true);
  });
  test('filters by skills intersection', () => {
    const res = filterChw({ skills: ['mental-health', 'first-aid'] });
    expect(res.length).toBeGreaterThanOrEqual(0);
    if (res.length) {
      expect(res[0].skills).toEqual(expect.arrayContaining(['mental-health', 'first-aid']));
    }
  });
  test('availableOnly reduces set', () => {
    const all = filterChw({});
    const avail = filterChw({ availableOnly: true });
    expect(avail.length).toBeLessThanOrEqual(all.length);
  });
});
