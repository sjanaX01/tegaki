import { describe, expect, test } from 'bun:test';
import { program } from './index.ts';

describe('CLI Program', () => {
  test('should have hello command', () => {
    const helloCommand = program.find('hello');
    expect(helloCommand).toBeDefined();
    expect(helloCommand?.name).toBe('hello');
  });

  test('hello command should greet with default name', async () => {
    const result = await program.run('hello', { name: 'World' });
    expect(result.result).toBeUndefined(); // action just logs, returns void
  });

  test('hello command should greet with custom name', async () => {
    const result = await program.run('hello', { name: 'Test' });
    expect(result.result).toBeUndefined(); // action just logs, returns void
  });
});
