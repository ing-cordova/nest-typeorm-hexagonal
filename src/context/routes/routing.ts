export const enum PrefixEndpointType {
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
    GET_ALL_COUNTRIES: `${PrefixEndpointType.PUBLIC}/get-all-countries`,
    GET_STATES_BY_COUNTRY: `${PrefixEndpointType.PUBLIC}/get-states-by-country/:countryId`,
    GET_CATEGORIES: `${PrefixEndpointType.PUBLIC}/get-categories`,
    GET_SUBCATEGORIES_BY_CATEGORY_ID: `${PrefixEndpointType.PUBLIC}/subcategories/category/:categoryId`,
    CREATE_NEW_MESSAGE: `${PrefixEndpointType.PUBLIC}/send-message`,
};

export const PrivateEndpoints = {
    GENERATE_PROFILE: `${PrefixEndpointType.PRIVATE}/generate-profile`,
    UPDATE_PROFILE: `${PrefixEndpointType.PRIVATE}/update-profile`,
    DELETE_PROFILE: `${PrefixEndpointType.PRIVATE}/delete-profile/:id`,
    VIEW_PROFILE: `${PrefixEndpointType.PRIVATE}/view-profile/:username`,
    VIEW_ALL_PROFILE: `${PrefixEndpointType.PRIVATE}/view-all-profile`,
    VIEW_ALL_MESSAGES: `${PrefixEndpointType.PRIVATE}/view-all-messages`,
    VIEW_ALL_PAYMENT_METHODS: `${PrefixEndpointType.PRIVATE}/payment-methods`,
    CREATE_NEW_PAYMENT_METHOD: `${PrefixEndpointType.PRIVATE}/create-payment-method`,
    CREATE_NEW_ISSUER_TYPE: `${PrefixEndpointType.PRIVATE}/create-issuer-type`,
    VIEW_ALL_ISSUER_TYPES: `${PrefixEndpointType.PRIVATE}/issuer-types`,
    VIEW_ISSUER_TYPE_BY_ID: `${PrefixEndpointType.PRIVATE}/issuer-type/:id`,
    UPDATE_ISSUER_TYPE: `${PrefixEndpointType.PRIVATE}/update-issuer-type/:id`,
    DELETE_ISSUER_TYPE: `${PrefixEndpointType.PRIVATE}/delete-issuer-type/:id`,
};