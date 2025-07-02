# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - 2025-07-02

### Added

- Initial release of @vecrea/oid4vc-core
- **Utils Module**: Error handling and result management utilities
  - `Result<T>` class for monadic error handling
  - `runCatching` and `runAsyncCatching` functions for safe execution
  - `getErrorMessage` and `convertToError` utility functions
- **DynamoDB Module**: Simplified DynamoDB operations
  - `DynamoDB` class with basic CRUD operations (get, put, delete)
  - Cloudflare Workers compatibility
  - TTL (Time To Live) support
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **Modular Design**: Subpath exports for selective imports
  - Main export: `@vecrea/oid4vc-core`
  - Utils: `@vecrea/oid4vc-core/utils`
  - DynamoDB: `@vecrea/oid4vc-core/dynamodb`
- **Build System**: Vite-based build with ES modules and CommonJS support
- **Testing**: Vitest-based test suite

### Technical Details

- ES Module and CommonJS dual package support
- TypeScript declaration files (.d.ts) for all modules
- External dependency on @aws-sdk/lib-dynamodb
- Node.js polyfills for Cloudflare Workers compatibility
