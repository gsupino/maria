import {
    IMAGE_LOAD,
    IMAGE_LOAD_SUCCESS,
    IMAGE_LOAD_FAIL
    } from './actionTypes';

export const IMAGE_REQUEST = 'IMAGE_REQUEST';
export const IMAGE_SUCCESS = 'IMAGE_SUCCESS';
export const IMAGE_FAILURE = 'IMAGE_FAILURE';

export function load_Old() {
    return {
        types: [IMAGE_REQUEST, IMAGE_SUCCESS, IMAGE_FAILURE],
        urlPoint: '/api/images',
        fetchParams: {}
    };
}

export function load() {
    return {
        CALL_API: {
            types: [IMAGE_REQUEST, IMAGE_SUCCESS, IMAGE_FAILURE],
            endpoint: '/api/images',
            params: {},
            payload: {}//,
            // Check the cache (optional):
            //shouldCallAPI: (state) => !state.image[userId],
        }
    };
}