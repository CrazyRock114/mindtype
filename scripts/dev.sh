#!/bin/bash
set -Eeuo pipefail

PORT=5000

echo "Starting development server on port ${PORT}..."
PORT=$PORT pnpm tsx watch src/server.ts
