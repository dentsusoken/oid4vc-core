import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  DeleteCommand,
} from '@aws-sdk/lib-dynamodb';
import { mockClient } from 'aws-sdk-client-mock';
import { DynamoDB } from '../DynamoDB';
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('DynamoDB', () => {
  const ddbMock = mockClient(DynamoDBDocumentClient);
  const tableName = 'test-table';
  let dynamoDB: DynamoDB;

  beforeEach(() => {
    ddbMock.reset();
    dynamoDB = new DynamoDB(
      ddbMock as unknown as DynamoDBDocumentClient,
      tableName
    );
  });

  describe('get', () => {
    it('should successfully retrieve a value', async () => {
      const mockItem = {
        key: 'testKey',
        value: 'testValue',
      };

      ddbMock.on(GetCommand).resolves({
        Item: mockItem,
      });

      const result = await dynamoDB.get('testKey');
      expect(result).toBe('testValue');
    });

    it('should return null when key does not exist', async () => {
      ddbMock.on(GetCommand).resolves({
        Item: undefined,
      });

      const result = await dynamoDB.get('nonexistentKey');
      expect(result).toBeNull();
    });

    it('should throw an error when DynamoDB operation fails', async () => {
      ddbMock.on(GetCommand).rejects(new Error('DynamoDB Error'));

      await expect(dynamoDB.get('testKey')).rejects.toThrow('DynamoDB Error');
    });
  });

  describe('put', () => {
    it('should successfully save a value', async () => {
      ddbMock.on(PutCommand).resolves({});

      await expect(dynamoDB.put('testKey', 'testValue')).resolves.not.toThrow();

      expect(ddbMock.calls()).toHaveLength(1);
      const putCall = ddbMock.call(0);
      expect(putCall.args[0].input).toEqual({
        TableName: tableName,
        Item: {
          key: 'testKey',
          value: 'testValue',
        },
      });
    });

    it('should save a value with TTL option', async () => {
      const now = 1234567890;
      vi.spyOn(Date, 'now').mockImplementation(() => now * 1000);

      ddbMock.on(PutCommand).resolves({});

      await dynamoDB.put('testKey', 'testValue', { expirationTtl: 3600 });

      const putCall = ddbMock.call(0);
      expect(putCall.args[0].input).toEqual({
        TableName: tableName,
        Item: {
          key: 'testKey',
          value: 'testValue',
          expiresAt: 1234571490,
        },
      });
    });

    it('should throw an error when DynamoDB operation fails', async () => {
      ddbMock.on(PutCommand).rejects(new Error('DynamoDB Error'));

      await expect(dynamoDB.put('testKey', 'testValue')).rejects.toThrow(
        'DynamoDB Error'
      );
    });
  });

  describe('delete', () => {
    it('should successfully delete a value', async () => {
      ddbMock.on(DeleteCommand).resolves({});

      await expect(dynamoDB.delete('testKey')).resolves.not.toThrow();

      expect(ddbMock.calls()).toHaveLength(1);
      const deleteCall = ddbMock.call(0);
      expect(deleteCall.args[0].input).toEqual({
        TableName: tableName,
        Key: { key: 'testKey' },
      });
    });

    it('should throw an error when DynamoDB operation fails', async () => {
      ddbMock.on(DeleteCommand).rejects(new Error('DynamoDB Error'));

      await expect(dynamoDB.delete('testKey')).rejects.toThrow(
        'DynamoDB Error'
      );
    });
  });
});
