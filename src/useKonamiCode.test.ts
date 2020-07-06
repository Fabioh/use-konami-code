import { renderHook, act } from '@testing-library/react-hooks';

import useKonamiCode, { konamiSequence } from './useKonamiCode';

describe('useKonamiCode', () => {
  it('should return the user sequence', () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    });

    expect(result.current.sequence).toStrictEqual(['ArrowUp']);
  });

  it('should reset the sequence if the user types a wrong sequence', () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    });

    expect(result.current.sequence).toStrictEqual([]);
  });

  it('should return true when the user types a right sequence', () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useKonamiCode());

    konamiSequence.forEach((key) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
      });
    });

    expect(result.current.rightSequence).toBe(true);
  });

  it('should return false when the user types a wrong sequence', () => {
    expect.hasAssertions();
    const { result } = renderHook(() => useKonamiCode());

    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k' }));
    });

    expect(result.current.rightSequence).toBe(false);
  });

  it('should allow different sequence and return true if the user types this sequence', () => {
    expect.hasAssertions();
    const newSequence = ['w', 'j'];
    const { result } = renderHook(() => useKonamiCode(newSequence));

    newSequence.forEach((key) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
      });
    });

    expect(result.current.rightSequence).toBe(true);
  });

  it('should run a callback fn if right sequence was typed', () => {
    expect.hasAssertions();
    const newSequence = ['w', 'j'];
    const callback = jest.fn();
    renderHook(() => useKonamiCode(newSequence, callback));

    newSequence.forEach((key) => {
      act(() => {
        window.dispatchEvent(new KeyboardEvent('keydown', { key }));
      });
    });

    expect(callback).toHaveBeenCalledWith();
  });
});
