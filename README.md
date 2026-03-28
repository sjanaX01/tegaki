# Padrone Boilerplate

Boilerplate for new CLI projects built with [Padrone](https://github.com/KurtGokhan/padrone), TypeScript, and Bun.

## Features

- **[Padrone](https://github.com/KurtGokhan/padrone)** – CLI framework with Zod schema-based argument parsing
- **[TypeScript](https://www.typescriptlang.org/)** – Type-safe development
- **[Bun](https://bun.sh/)** – Fast JavaScript runtime and package manager
- **[Biome](https://biomejs.dev/)** – Linter and formatter
- **[Husky](https://typicode.github.io/husky/)** – Pre-commit hooks via lint-staged
- **GitHub Actions** – CI workflow

## Getting Started

```bash
# Install dependencies
bun install

# Run the CLI
bun start

# Run the hello command
bun start hello
bun start hello World
```

## Scripts

| Script         | Description                          |
| -------------- | ------------------------------------ |
| `bun start`    | Run the CLI                          |
| `bun dev`      | Run with file watching               |
| `bun check`    | Run Biome checks (lint + format)     |
| `bun lint`     | Lint source files                    |
| `bun format`   | Format source files                  |
| `bun test`     | Run tests                            |

## Project Structure

```
src/
  index.ts    # Entry point with CLI commands
```
