import { describe, it, expect } from 'vitest';
import { standardCrypto } from './standardCrypto';

describe('standardCryptoc', () => {
  describe('getRandomBytes', () => {
    it('should generate random bytes of specified size', () => {
      const size = 16;
      const randomBytes = standardCrypto.getRandomBytes(size);

      expect(randomBytes).toBeInstanceOf(Uint8Array);
      expect(randomBytes.length).toBe(size);
    });

    it('should generate different random bytes on each call', () => {
      const size = 16;
      const randomBytes1 = standardCrypto.getRandomBytes(size);
      const randomBytes2 = standardCrypto.getRandomBytes(size);

      expect(Buffer.from(randomBytes1).toString('hex')).not.toBe(
        Buffer.from(randomBytes2).toString('hex')
      );
    });
  });

  describe('sha256Async', () => {
    it('should generate correct SHA-256 hash for input bytes', async () => {
      const input = new TextEncoder().encode('test');
      const hash = await standardCrypto.sha256Async(input);

      // SHA-256 hash of 'test' is '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
      expect(hash).toBe(
        '9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08'
      );
    });

    it('should generate different hashes for different inputs', async () => {
      const input1 = new TextEncoder().encode('test1');
      const input2 = new TextEncoder().encode('test2');

      const hash1 = await standardCrypto.sha256Async(input1);
      const hash2 = await standardCrypto.sha256Async(input2);

      expect(hash1).not.toBe(hash2);
    });

    it('should generate same hash for same input', async () => {
      const input = new TextEncoder().encode('test');

      const hash1 = await standardCrypto.sha256Async(input);
      const hash2 = await standardCrypto.sha256Async(input);

      expect(hash1).toBe(hash2);
    });
  });
});
