import { createMaternalProfile, createChildProfile, listMaternalProfiles, listChildProfiles, toggleAncVisit, toggleVaccineDose } from '@/lib/tracker';

describe('tracker library', () => {
  test('maternal profile creation and toggle', () => {
    const p = createMaternalProfile('2025-12-30');
    let all = listMaternalProfiles();
    expect(all.some(x => x.id === p.id)).toBe(true);
    expect(p.visits.length).toBeGreaterThan(3);
    const firstVisit = p.visits[0];
    toggleAncVisit(p.id, firstVisit.id);
    all = listMaternalProfiles();
    const updated = all.find(x => x.id === p.id)!;
    expect(updated.visits.find(v => v.id === firstVisit.id)!.completed).toBe(true);
  });

  test('child profile creation and dose toggle', () => {
    const c = createChildProfile('2025-11-01');
    let all = listChildProfiles();
    expect(all.some(x => x.id === c.id)).toBe(true);
    expect(c.doses.length).toBeGreaterThan(3);
    const firstDose = c.doses[0];
    toggleVaccineDose(c.id, firstDose.id);
    all = listChildProfiles();
    const updated = all.find(x => x.id === c.id)!;
    expect(updated.doses.find(d => d.id === firstDose.id)!.completed).toBe(true);
  });
});
