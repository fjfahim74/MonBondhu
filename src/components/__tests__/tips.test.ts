import { getTipsForMonth } from '@/lib/tips';

describe('seasonal tips', () => {
  test('June includes dengue', () => {
    const tips = getTipsForMonth(6);
    expect(tips.some(t => t.category === 'dengue')).toBe(true);
  });
  test('January includes cold/flu', () => {
    const tips = getTipsForMonth(1);
    expect(tips.some(t => t.category === 'coldflu')).toBe(true);
  });
  test('April includes diarrhea or heat', () => {
    const tips = getTipsForMonth(4);
    expect(tips.some(t => t.category === 'diarrhea' || t.category === 'heat')).toBe(true);
  });
  test('Always includes year-round', () => {
    const tips = getTipsForMonth(11);
    expect(tips.some(t => t.category === 'year-round')).toBe(true);
  });
});
