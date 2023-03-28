import AWS from "aws-sdk";

export function getPresignedUrl(fileUrl = ''): string {
    const EXPIRED_AFTER_MINUTES = Number(process.env['LIFETIME_TOKEN_AWS']);

    const fileName = new URL(fileUrl).pathname.slice(1);
    if (!fileName) {
        throw new Error('No file url.');
    }

    const credentials = {
        accessKeyId: process.env['ACCESS_KEY_AWS'] || '',
        secretAccessKey: process.env['SECRET_ACCESS_KEY_AWS'] || ''
    };
    
    AWS.config.update({ credentials: credentials, region: process.env['REGION_AWS'] });
    
    const s3 = new AWS.S3();
    const BUCKET = process.env['BUCKET_NAME_AWS'];
    const KEY = fileName;
    
    const presignedGETURL = s3.getSignedUrl('getObject', {
        Bucket: BUCKET,
        Key: KEY,
        Expires: 60 * EXPIRED_AFTER_MINUTES
    });

    return presignedGETURL;
}