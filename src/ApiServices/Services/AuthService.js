import PreProcess from './PreProcess';
import ApiRoutes from '../ApiRoutes'

function preProcessAuthApi(urlName, params) {
    return PreProcess(ApiRoutes, urlName, params);
}

function postProcessAuthApi(urlName, data) {
    switch (urlName) {
        case 'login':
            return data
    }
}

export {preProcessAuthApi, postProcessAuthApi};
