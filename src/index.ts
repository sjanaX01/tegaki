import { createPadrone } from 'padrone';
import * as z from 'zod/v4';

export const program = createPadrone('myapp')
  .configure({
    description: 'A CLI built with Padrone',
    version: '0.1.0',
  })
  .action(() => {
    console.log(program.help());
  })
  .command('hello', (c) =>
    c
      .configure({ title: 'Print a greeting message' })
      .options(
        z.object({
          name: z.string().optional().default('World').describe('Name to greet'),
        }),
        { positional: ['name'] },
      )
      .action((options) => {
        console.log(`Hello, ${options.name}!`);
      }),
  );

if (import.meta.main) {
  await program.cli();
}
