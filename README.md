# @vecrea/oid4vc-core

A TypeScript library providing core utilities and modules for OID4VC (OpenID for Verifiable Credentials) implementations.

## Features

- **Utility Functions**: Error handling and result management utilities
- **DynamoDB Integration**: Simplified DynamoDB operations with Cloudflare Workers compatibility
- **TypeScript Support**: Full TypeScript support with comprehensive type definitions
- **Modular Design**: Import only what you need with subpath exports

## Installation

```bash
npm install @vecrea/oid4vc-core
```

## Usage

### Utils Module

Error handling and result management utilities.

```typescript
import {
  Result,
  runCatching,
  getErrorMessage,
  convertToError,
} from '@vecrea/oid4vc-core/utils';

// Using Result for safe operations
const result = runCatching(() => {
  // Your potentially throwing code here
  return 'success';
});

if (result.isSuccess()) {
  console.log(result.value); // 'success'
} else {
  console.error(result.error.message);
}

// Error utilities
const message = getErrorMessage(new Error('Test error')); // 'Test error'
const error = convertToError('Something went wrong');
```

### DynamoDB Module

Simplified DynamoDB operations with Cloudflare Workers compatibility.

```typescript
import { DynamoDB } from '@vecrea/oid4vc-core/dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Initialize
const client = new DynamoDBDocumentClient({ region: 'us-east-1' });
const dynamodb = new DynamoDB(client, 'your-table-name');

// Basic operations
await dynamodb.put('user:123', JSON.stringify({ name: 'John', age: 30 }));
const userData = await dynamodb.get('user:123');
await dynamodb.delete('user:123');
```

## API Reference

### Result<T>

A monadic Result type for handling operations that can succeed or fail.

#### Static Methods

- `Result.success<T>(value: T): Result<T>` - Creates a successful result
- `Result.failure<T>(error: Error): Result<T>` - Creates a failure result

#### Instance Methods

- `isSuccess(): this is { value: T }` - Checks if the result is successful
- `isFailure(): this is { error: Error }` - Checks if the result is a failure
- `getOrThrow(): T` - Returns the value or throws the error
- `getOrDefault(defaultValue: T): T` - Returns the value or a default
- `getOrElse(transfer: (error: Error) => T): T` - Returns the value or a computed default
- `onSuccess(f: (value: T) => void): Result<T>` - Executes a function on success
- `onFailure(f: (error: Error) => void): Result<T>` - Executes a function on failure
- `recover(transform: (error: Error) => T): Result<T>` - Recovers from failure
- `recoverAsync(transform: (error: Error) => Promise<T>): Promise<Result<T>>` - Async recovery

### Utility Functions

- `runCatching<T, A>(f: (...args: A) => T, ...args: A): Result<T>` - Safely executes a function
- `runAsyncCatching<T, A>(f: (...args: A) => Promise<T>, ...args: A): Promise<Result<T>>` - Safely executes an async function
- `getErrorMessage(e: unknown): string` - Converts any value to an error message
- `convertToError(e: unknown): Error` - Converts any value to an Error object

### DynamoDB

A class for simplified DynamoDB operations.

#### Constructor

```typescript
constructor(client: DynamoDBDocumentClient, tableName: string)
```

#### Methods

- `get(key: string): Promise<string | null>` - Retrieves a value by key
- `put(key: string, value: string, options?: PutOptions): Promise<void>` - Stores a value
- `delete(key: string): Promise<void>` - Deletes an item by key

#### Types

- `DynamoDBItem` - Interface for DynamoDB items
- `PutOptions` - Options for put operations, extending KVNamespacePutOptions

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

```bash
git clone <repository-url>
cd oid4vc-core
npm install
```

### Scripts

- `npm run build` - Build the library
- `npm test` - Run tests

### Testing

The library uses Vitest for testing. Test files are located in `__tests__` directories alongside the source files.

```bash
npm test
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Run the test suite
6. Submit a pull request

## Support

For issues and questions, please use the GitHub issue tracker.
