import busboy from 'busboy';
import AWS from "aws-sdk";
import { Handler } from "@netlify/functions";
import { withPlanetscale } from "@netlify/planetscale";

export const handler: Handler = withPlanetscale(async (event, context) => {
    const {
        planetscale: { connection },
    } = context;

    if (!context.clientContext?.["identity"] || !context.clientContext['user'].app_metadata.roles.includes('admin')) {
        return {
            statusCode: 401
        }
    }
    
    try {
        const fields = await parseMultipartForm(event);

        if (!fields) {
            throw new Error('Unable to parse image');
        }

        const {
            name,
            type,
            category_id,
            subcategory_id,
        } = fields;
        const file = fields.file[0];

        const isVisible = fields.isVisible === 'true' ? true : false;

        const CREDENTIALS = {
            accessKeyId: process.env['ACCESS_KEY_AWS'] || '',
            secretAccessKey: process.env['SECRET_ACCESS_KEY_AWS'] || ''
        };
        const BUCKET = process.env['BUCKET_NAME_AWS'] || '';
        
        AWS.config.update({ credentials: CREDENTIALS, region: process.env['REGION_AWS'] });

        const s3 = new AWS.S3();

        const uploadedFile = await s3.upload({
            Bucket: BUCKET,
            Key: file.filename,
            Body: file.content
        }).promise();

        await connection.execute("INSERT INTO audio (name, audio_url, type, category_id, subcategory_id, isVisible) VALUES(?, ?, ?, ?, ?, ?)", [
            name,
            uploadedFile.Location,
            type,
            category_id,
            subcategory_id,
            isVisible
        ]);
        
        return {
            statusCode: 200
        };
    } catch (error: any) {
        return {
            statusCode: 400,
            body: error.toString(),
        };
    }
});


type NewSound = {
    name: string,
    type: string,
    category_id: number | null,
    subcategory_id: number | null,
    isVisible: string,
    file: {
        filename: string;
        type: string;
        content: Buffer;
    }[];
};

function parseMultipartForm(event: any): Promise<NewSound> {
    return new Promise((resolve) => {
        const sound: NewSound = { name: '', type: '', category_id: null, subcategory_id: null, isVisible: true,  file: [] };
        const bb = busboy({ headers: event.headers });

        bb.on('file', (name, file, info) => {
            const { filename, mimeType } = info;
            file.on('data', (data) => {
                if (!sound[name]) sound[name] = [];

                sound[name].push({
                    filename,
                    type: mimeType,
                    content: data,
                });
            });
        });

        bb.on('field', (name, val) => {
            if (val === 'null') {
                sound[name] = null;
            } else {
                sound[name] = val;
                console.log(name, val);
            }
        });

        bb.on('close', () => {
            resolve(sound);
        });

        bb.end(Buffer.from(event.body, 'base64'));
    });
}