import minioClient from '../config/minio.js';
import path from 'path'
const MINIO_BUCKET = process.env.MINIO_BUCKET;

const storeFile = async (file, customPath = "", customName = "") => {
        if (!file) {
                throw new Error('No file provided');
        }

        const fileName = customName ? `${customName}${fileExtension}` : `${Date.now()}-${file.originalname}`;
        const filePath = path.join(customPath, fileName).replace(/\\/g, '/');
        const metaData = {
                'Content-Type': file.mimetype,
        };

        await minioClient.putObject(MINIO_BUCKET, filePath, file.buffer, metaData);
        return path.join(MINIO_BUCKET, filePath).replace(/\\/g, '/');
};

const getFile = async (key) => {
        const stream = await minioClient.getObject(MINIO_BUCKET, key);
        return stream;
};
const getFileUrl = (key) => {
        const url = `${process.env.MINIO_URL}/${MINIO_BUCKET}/${key}`;
        return url;
};
const deleteFile = async (path) => {
        return await minioClient.removeObject(MINIO_BUCKET, path);
}

export { storeFile, getFile,getFileUrl, deleteFile };
