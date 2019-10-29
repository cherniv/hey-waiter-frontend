import Api from 'axios';
import {setApiVendor} from 'mobx-active-model';
import Auth from '../services/Auth';
import {projectId} from '../config/firebase';
setApiVendor(Api);

var API_PATH = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/`;

Api.defaults.baseURL = API_PATH;
    
function setTokenHeader (config:any) {
  var {token} = Auth;
  var {headers} = config;
  if (token && headers) {
    (headers.common || headers)['Authorization'] = Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
}

function setTokenHeaderOnTheFly(config:any) {
  setTokenHeader(config);
  return config;
}

function formatData (response:any) {
  var {data} = response;
  for(var key in data.fields) {
    var rawVal = data.fields[key];
    var val = rawVal[Object.keys(rawVal)[0]];
    data.fields[key] = val;
  }
  return data.fields;
}

// Setting Authorization token on the fly
Api.interceptors.request.use(setTokenHeaderOnTheFly);

// Turning {id: {integerValue: 12345}} into {id: 12345}
Api.interceptors.response.use(formatData);  