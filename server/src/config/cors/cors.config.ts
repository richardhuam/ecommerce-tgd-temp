import { envConfig } from '@config/environment';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

const allowedUrl = envConfig().cors.allowedUrl || 'no-url';

export const corsOptions: CorsOptions = {
	credentials: true,
	origin: allowedUrl,
	methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
};
