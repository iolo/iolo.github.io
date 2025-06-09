---
layout: post
title: Vite Typescript Library Setup
date: 2025-06-09T03:26:55.201Z
tags: [vite, typescript]
---
# Vite TypeScript Library Setup

A complete setup for creating TypeScript libraries that work in Node.js (CommonJS/ESM), browsers (UMD), and bundlers (ESM) with proper type declarations.

## Key Requirements

- Support `require()` in Node.js CommonJS
- Support `import` in Node.js ESM  
- Support `<script src="...">` in browsers
- Support `import` in browser `<script type="module">`
- Support `import` with bundlers (Vite, Webpack, etc.)
- **Proper TypeScript declarations** for all environments

## Essential Files

### 1. package.json

```json
{
  "name": "my-library",
  "version": "1.0.0",
  "type": "module",
  "files": ["dist"],
  "main": "./dist/my-library.cjs",
  "module": "./dist/my-library.js", 
  "browser": "./dist/my-library.umd.cjs",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "import": {
        "types": "./dist/index.d.ts",
        "default": "./dist/my-library.js"
      },
      "require": {
        "types": "./dist/index.d.ts", 
        "default": "./dist/my-library.cjs"
      },
      "browser": {
        "types": "./dist/index.d.ts",
        "default": "./dist/my-library.umd.cjs"
      }
    }
  },
  "scripts": {
    "build": "vite build",
    "dev": "vite build --watch"
  },
  "devDependencies": {
    "@types/node": "^22.15.30",
    "typescript": "^5.8.3",
    "vite": "^6.0.0",
    "vite-plugin-dts": "^4.3.0"
  }
}
```

### 2. vite.config.ts

```typescript
import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [
    dts({
      include: 'src/**/*',
      exclude: 'src/**/*.(spec|test).(js|ts)',
      rollupTypes: true,  // 🔑 KEY: Bundle all types into single file
      outDir: 'dist',
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MyLibrary',  // Global variable name for UMD
      fileName: 'my-library',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: [],  // Add external deps here if needed
      output: {
        exports: 'named',
      },
    },
  },
});
```

### 3. tsconfig.json

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext", 
    "moduleResolution": "node",
    "declaration": true,
    "outDir": "dist",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules", "dist", "**/*.spec.ts", "**/*.test.ts"]
}
```

## Critical Configuration Points

### 🔑 `rollupTypes: true`

**THE KEY SETTING** - Without this:
- ❌ Generates separate `.d.ts` files maintaining directory structure
- ❌ Need complex package.json exports like `"./types": "./dist/types/index.d.ts"`  
- ❌ Users import with `import type { Type } from 'my-library/types'`

**With `rollupTypes: true`:**
- ✅ All types bundled into single `dist/index.d.ts`
- ✅ Simple package.json with just `"types": "./dist/index.d.ts"`
- ✅ Clean imports: `import type { Type } from 'my-library'`

### Export Order in package.json

```json
"exports": {
  ".": {
    "import": { ... },    // Modern ESM first
    "require": { ... },   // CommonJS second  
    "browser": { ... },   // Most specific last
  }
}
```

### File Extensions

- ESM: `.js` (because `"type": "module"`)
- CommonJS: `.cjs` 
- UMD: `.umd.cjs`

## Build Output

```
dist/
├── index.d.ts           # 🎯 All TypeScript declarations
├── my-library.js        # ESM format
├── my-library.cjs       # CommonJS format
└── my-library.umd.cjs   # UMD format for browsers
```

## Usage Examples

**Node.js CommonJS:**
```javascript
const { myFunction } = require('my-library');
```

**Node.js ESM:**
```javascript  
import { myFunction } from 'my-library';
```

**Browser Script Tag:**
```html
<script src="./dist/my-library.umd.cjs"></script>
<script>
  console.log(MyLibrary.myFunction());
</script>
```

**Browser ESM:**
```html
<script type="module">
  import { myFunction } from './dist/my-library.js';
  console.log(myFunction());
</script>
```

**TypeScript (any environment):**
```typescript
import type { MyType } from 'my-library';
import { myFunction } from 'my-library';
```

## Common Pitfalls

1. **Missing `vite-plugin-dts`** → No TypeScript declarations
2. **Missing `rollupTypes: true`** → Complex directory-based type exports  
3. **Wrong export order** → Module resolution issues
4. **Missing `"type": "module"`** → Import/export confusion
5. **Wrong file extensions** → Runtime errors

## Commands

```bash
# Build once
npm run build

# Watch mode for development
npm run dev

# Install in another project
npm install /path/to/your/library
```

This setup provides a **simple, clean library** that "just works" everywhere without complex configuration! 🎉
