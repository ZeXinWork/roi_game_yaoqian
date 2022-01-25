import {
	GET,
	GET_LIST,
	POST,
	FILE,
	POSTBODY
} from './types.js';
import simple from './simple.js';
import * as api from './config.js';

const restResult = simple.restResult;

export const uploadTrackLog = (name, params) => {
	return restResult(POSTBODY, api.TRACK_LOG + `/${name.toLocaleLowerCase()}`, params);
};

