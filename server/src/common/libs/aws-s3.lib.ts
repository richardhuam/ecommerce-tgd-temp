import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { autoContentType } from '@common/utils/get-auto-content-type';
import { envConfig } from '@config/environment';

export class S3Service {
	private readonly s3Client: S3Client;

	constructor() {
		this.s3Client = new S3Client({
			region: envConfig().aws.s3.bucketRegion,
			credentials: {
				accessKeyId: envConfig().aws.s3.accessKeyId,
				secretAccessKey: envConfig().aws.s3.secretAccessKey,
			},
		});
	}

	async uploadImageToS3(file: Express.Multer.File, path: string, imageName: string) {
		await this.s3Client.send(
			new PutObjectCommand({
				Bucket: envConfig().aws.s3.bucketName,
				Key: `${path}/${imageName}`,
				Body: file.buffer,
				ContentType: autoContentType(file.originalname),
			}),
		);
	}
}
