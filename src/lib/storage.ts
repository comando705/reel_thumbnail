import { StorageConfig, StorageType } from '@/types/storage';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

export class StorageService {
  private config: StorageConfig;
  private s3Client?: S3Client;

  constructor(config: StorageConfig) {
    this.config = config;
    if (config.type === 's3' && config.s3) {
      this.s3Client = new S3Client({
        region: config.s3.region,
        credentials: {
          accessKeyId: config.s3.accessKeyId,
          secretAccessKey: config.s3.secretAccessKey,
        },
      });
    }
  }

  async uploadFile(file: File): Promise<string> {
    if (this.config.type === 's3') {
      return this.uploadToS3(file);
    }
    return this.uploadToLocal(file);
  }

  private async uploadToS3(file: File): Promise<string> {
    if (!this.s3Client || !this.config.s3) {
      throw new Error('S3 configuration is missing');
    }

    const filename = `${uuidv4()}-${file.name}`;
    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: this.config.s3.bucketName,
      Key: `uploads/${filename}`,
      Body: buffer,
      ContentType: file.type,
    });

    await this.s3Client.send(command);

    return `https://${this.config.s3.bucketName}.s3.amazonaws.com/uploads/${filename}`;
  }

  private async uploadToLocal(file: File): Promise<string> {
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    
    // Ensure upload directory exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filename = `${uuidv4()}-${file.name}`;
    const filePath = path.join(uploadDir, filename);
    
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    return `/uploads/${filename}`;
  }
} 