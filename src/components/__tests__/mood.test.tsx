import { render, screen, fireEvent } from '@testing-library/react';
import MoodCheckInForm from '@/components/MoodCheckInForm';
import { getMoodLogs } from '@/lib/mood';

describe('MoodCheckInForm', () => {
  test('saves mood entry', () => {
    render(<MoodCheckInForm />);
    const saveBtn = screen.getByRole('button', { name: 'সংরক্ষণ' });
    fireEvent.click(saveBtn);
    const logs = getMoodLogs();
    expect(logs.length).toBeGreaterThan(0);
    expect(logs[logs.length - 1].moodLevel).toBeGreaterThanOrEqual(1);
  });
});
