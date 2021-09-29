import PreProcess from './PreProcess';
import ApiRoutes from '../ApiRoutes'

function preProcessUserApi(urlName, params) {
    return PreProcess(ApiRoutes, urlName, params);
}

function postProcessUserApi(urlName, data) {
    switch (urlName) {
        case 'test':
            return data
    }
}

export {preProcessUserApi, postProcessUserApi};
