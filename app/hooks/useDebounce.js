import { useState, useEffect } from 'react';

/**
 * Custom hook that debounces a value
 * @param {any} value - The value to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {any} - The debounced value
 * 
 * How it works:
 * 1. User types rapidly → value changes quickly
 * 2. useEffect cancels previous timeout and sets new one
 * 3. Only when user STOPS typing for 'delay' ms, debouncedValue updates
 * 4. This triggers our search function only once, not on every keystroke
 */
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    // Set a timeout to update debounced value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup: cancel timeout if value changes before delay completes
    // This is the KEY to debouncing - we cancel previous timeouts
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // Re-run effect when value or delay changes

  return debouncedValue;
} 