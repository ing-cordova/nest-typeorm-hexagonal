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
    CREATE_PROFILE: `${PrefixEndpointType.PUBLIC}/create-profile`,
};

export const PrivateEndpoints = {
    GENERATE_PROFILE: `${PrefixEndpointType.PRIVATE}/generate-profile`,
    UPDATE_PROFILE: `${PrefixEndpointType.PRIVATE}/update-profile`,
    DELETE_PROFILE: `${PrefixEndpointType.PRIVATE}/delete-profile/:id`,
};