/*
 * Copyright (C) 2024 Dentsusoken, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
 * either express or implied. See the License for the specific
 * language governing permissions and limitations under the
 * License.
 */

import { CryptoModule } from './types';

/**
 * Standard cryptographic module providing cryptographic functionalities.
 * @type {CryptoModule}
 */
export const standardCrypto: CryptoModule = {
  /**
   * Generates a random byte array of the specified size.
   * @param {number} size - The number of random bytes to generate.
   * @returns {Uint8Array} A Uint8Array containing the random bytes.
   */
  getRandomBytes: (size: number): Uint8Array => {
    return crypto.getRandomValues(new Uint8Array(size));
  },

  /**
   * Computes the SHA-256 hash of the given byte array asynchronously.
   * @param {Uint8Array} bytes - The input byte array to hash.
   * @returns {Promise<string>} A Promise that resolves to the SHA-256 hash as a hexadecimal string.
   */
  sha256Async: async (bytes: Uint8Array): Promise<string> => {
    const hashBuffer = await crypto.subtle.digest('SHA-256', bytes);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, '0'))
      .join('');
    return hashHex;
  },
};
