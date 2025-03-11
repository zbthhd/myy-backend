import { describe, expect, test } from '@jest/globals';

const sum = (a: number, b: number) => a + b;

describe('test sum', () => {
    test('adds 1 + 2 to equal 3', () => {
        expect(sum(1, 2)).toBe(3);
    });
});
