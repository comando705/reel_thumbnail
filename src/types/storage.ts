export type StorageType = 'local' | 's3';

export interface StorageConfig {
  type: StorageType;
  s3?: {
    region: string;
    accessKeyId: string;
    secretAccessKey: string;
    bucketName: string;
  };
} 