import merge from 'lodash.merge';
import { stripTrailingSlash } from "wasp/universal/url";
const env = process.env.NODE_ENV || 'development';
const config = {
    all: {
        env,
        isDevelopment: env === 'development',
        port: parseInt(process.env.PORT) || 3001,
        databaseUrl: process.env.DATABASE_URL,
        allowedCORSOrigins: [],
    },
    development: getDevelopmentConfig(),
    production: getProductionConfig(),
};
const resolvedConfig = merge(config.all, config[env]);
// PUBLIC API
export default resolvedConfig;
function getDevelopmentConfig() {
    const frontendUrl = stripTrailingSlash(process.env.WASP_WEB_CLIENT_URL || 'http://localhost:3000/');
    return {
        frontendUrl,
        allowedCORSOrigins: '*',
    };
}
function getProductionConfig() {
    const frontendUrl = stripTrailingSlash(process.env.WASP_WEB_CLIENT_URL);
    return {
        frontendUrl,
        allowedCORSOrigins: [frontendUrl],
    };
}
//# sourceMappingURL=config.js.map