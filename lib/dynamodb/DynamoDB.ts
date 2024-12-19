import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
} from '@aws-sdk/lib-dynamodb';
import { KVNamespacePutOptions } from '@cloudflare/workers-types';

export interface DynamoDBItem {
  key: string;
  value: string;
  expiresAt?: number;
}

export interface PutOptions extends KVNamespacePutOptions {
  expirationTtl?: number;
}

export class DynamoDB {
  constructor(
    private readonly client: DynamoDBDocumentClient,
    private readonly tableName: string
  ) {}

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
