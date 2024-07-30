import * as Minio from 'minio'
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const minioClient = new Minio.Client({
  endPoint: process.env.MINIO_URL.replace(/https?:\/\//, ''),
  port: 443, // Default port for MinIO with SSL
  useSSL: true,
  accessKey: process.env.MINIO_ACCESS_KEY,
  secretKey: process.env.MINIO_SECRET_KEY,
});

export default minioClient;
