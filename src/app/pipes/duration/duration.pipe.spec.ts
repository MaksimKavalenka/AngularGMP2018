import { DurationPipe } from './duration.pipe';

describe('DurationPipe', () => {
  const pipe = new DurationPipe();

  it('transforms duration', () => {
    expect(pipe.transform(38)).toBe('38min');
    expect(pipe.transform(60)).toBe('1h');
    expect(pipe.transform(74)).toBe('1h 14min');
  });

});
