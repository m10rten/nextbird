# nextbird

Create an easy healthcheck for your nextjs application, integrate with any self-hosted/automated service.

## Installation

```bash
npm install nextbird
```

## Usage

With NextBird you can use a push model or a pull model. The push model is the easiest to use, but the pull model is more flexible and recommended for production use cases.

```typescript
// app/api/health/[bird]/route.ts
import nextbird from "nextbird";
```
