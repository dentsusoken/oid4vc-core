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

/**
 * Type for the CryptoModule providing cryptographic functionalities.
 */
export type CryptoModule = {
  /**
   * Generates a random byte array of the specified size.
   * @param size - The number of random bytes to generate.
   * @returns A Uint8Array containing the random bytes.
   */
  getRandomBytes: (size: number) => Uint8Array;

  /**
   * Computes the SHA-256 hash of the given byte array asynchronously.
   * @param bytes - The input byte array to hash.
   * @returns A Promise that resolves to the SHA-256 hash as a hexadecimal string.
   */
  sha256Async: (bytes: Uint8Array) => Promise<string>;
};
