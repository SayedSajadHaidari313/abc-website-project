import { env } from './EnvironmentConfig'

export const APP_NAME = 'InsightDeed Website';
export const API_BASE_URL = env.API_ENDPOINT_URL;
export const SITE_PREFIX_PATH = '/';
export const REDIRECT_URL_KEY = 'redirect';
export const AUTHENTICATED_ENTRY_EMPLOYER = '/employer-dashboard';
export const AUTHENTICATED_ENTRY_JOBSEEKER = '/jobseeker-dashboard';
