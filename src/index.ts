import { createPadrone } from 'padrone';
import { generateCommand } from './commands/generate.ts';

export const program = createPadrone('tegaki')
  .configure({
    description: 'Generate glyph data for handwriting animation',
  })
  .command('generate', generateCommand);

if (import.meta.main) await program.cli().drain();
