const enum PrefixEndpointType {
    AUTH = '/auth',
    PUBLIC = '/public',
    PRIVATE = '/private',
}

export const AuthEndpoints = {
    CHANGE_TEMPORAL_PASSWORD: `${PrefixEndpointType.AUTH}/change-temporal-password`,
    REFRESH_TOKEN: `${PrefixEndpointType.AUTH}/refresh-token`,
};

export const PublicEndpoints = {
    LOGIN: `${PrefixEndpointType.PUBLIC}/login`,
};

export const PrivateEndpoints = {
    GENERATE_PROFILE: `${PrefixEndpointType.PRIVATE}/generate-profile`,
};