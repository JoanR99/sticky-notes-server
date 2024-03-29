import { CorsOptions } from 'cors';
import allowedOrigins from './allowedOrigins';

const corsOptions: CorsOptions = {
	origin: (origin, callback) => {
		if (process.env.NODE_ENV === 'development') return callback(null, origin);
		if (origin && allowedOrigins.indexOf(origin) !== -1) {
			callback(null, origin);
		} else {
			callback(new Error('Not allowed by CORS'));
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};

export default corsOptions;
