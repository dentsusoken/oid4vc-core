import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { KVNamespacePutOptions } from '@cloudflare/workers-types';

/**
 * Represents an item stored in DynamoDB.
 */
export interface DynamoDBItem {
  key: string;
  value: string;
  expiresAt?: number;
}

/**
 * Options for the put operation in DynamoDB, extending KVNamespacePutOptions.
 */
export interface PutOptions extends KVNamespacePutOptions {
  expirationTtl?: number;
}

/**
 * A class to interact with DynamoDB for basic CRUD operations.
 */
export class DynamoDB {
  /**
   * Constructs a new DynamoDB instance.
   *
   * @param client - The DynamoDBDocumentClient instance.
   * @param tableName - The name of the DynamoDB table.
   */
  constructor(
    private readonly client: DynamoDBDocumentClient,
    private readonly tableName: string
  ) {}

  /**
   * Retrieves a value from DynamoDB by key.
   *
   * @param key - The key of the item to retrieve.
   * @returns A promise that resolves to the value associated with the key, or null if not found.
   * @throws Will throw an error if the DynamoDB operation fails.
   */
  async get(key: string): Promise<string | null> {
    try {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: { key },
      });
      const result = await this.client.send(command);
      const item = result.Item as DynamoDBItem | undefined;

      return item?.value ? item.value : null;
    } catch (error) {
      console.error('Error in DynamoDB get:', error);
      throw error;
    }
  }

  /**
   * Puts a value into DynamoDB with an optional expiration time.
   *
   * @param key - The key of the item to store.
   * @param value - The value of the item to store.
   * @param options - Optional settings for the put operation, including expiration time.
   * @returns A promise that resolves when the operation is complete.
   * @throws Will throw an error if the DynamoDB operation fails.
   */
  async put(key: string, value: string, options?: PutOptions): Promise<void> {
    try {
      const item: DynamoDBItem = {
        key,
        value,
      };

      if (options?.expirationTtl) {
        item.expiresAt = Math.floor(Date.now() / 1000) + options.expirationTtl;
      }

      const command = new PutCommand({
        TableName: this.tableName,
        Item: item,
      });
      await this.client.send(command);
    } catch (error) {
      console.error('Error in DynamoDB put:', error);
      throw error;
    }
  }

  /**
   * Deletes an item from DynamoDB by key.
   *
   * @param key - The key of the item to delete.
   * @returns A promise that resolves when the operation is complete.
   * @throws Will throw an error if the DynamoDB operation fails.
   */
  async delete(key: string): Promise<void> {
    try {
      const command = new DeleteCommand({
        TableName: this.tableName,
        Key: { key },
      });
      await this.client.send(command);
    } catch (error) {
      console.error('Error in DynamoDB delete:', error);
      throw error;
    }
  }
}
