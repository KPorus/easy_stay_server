import { S3Client, PutObjectCommand, DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import crypto from 'crypto'
import sharp from 'sharp';
const random = crypto.randomBytes(32).toString('hex');
import dotenv from 'dotenv'


dotenv.config()


const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION as string
const bucketAccessKey = process.env.ACCESS_KEY as string
const bucketSecret = process.env.SECRET_ACCESS_KEY as string


// const s3 = new aws.S3({
//     accessKeyId: bucketAccessKey,
// secretAccessKey: bucketSecret
// region: bucketRegion
//   });

//   const upload = (bucketName:any) =>
//     multer({
//       storage: multerS3({
//         s3,
//         bucket: bucketName,
//         metadata: function (req:Request, file:any, cb:any) {
//           cb(null, { fieldName: file.fieldname });
//         },
//         key: function (req:Request, file:any, cb:any) {
//           cb(null, `image-${Date.now()}.jpeg`);
//         },
//       }),
//     });


const s3 = new S3Client({
    credentials: {
        accessKeyId: bucketAccessKey,
        secretAccessKey: bucketSecret
    },
    region: bucketRegion
});


export async function uploadFile(file: Express.Multer.File,key:string) {
    const buffer = await sharp(file?.buffer).resize({ height: 128, width: 128 }).toBuffer();
    const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
        ContentType: file.mimetype
    }
    const command = new PutObjectCommand(params);
    await s3.send(command);
}

export function deleteFile(fileName: any) {
    const deleteParams = {
        Bucket: bucketName,
        Key: fileName,
    }

    return s3.send(new DeleteObjectCommand(deleteParams));
}

export async function getObjectSignedUrl(fileName: string) {
    const getObjectParams = {
        Bucket: bucketName,
        Key: fileName + random,
    };
    const imageName = fileName + random
    const getcommand = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, getcommand);
    return { url, imageName }
}