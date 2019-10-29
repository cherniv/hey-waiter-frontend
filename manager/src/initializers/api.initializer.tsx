import Api from 'axios';
import {setApiVendor} from 'mobx-active-model';
import Auth from '../services/Auth';
import {projectId} from '../config/firebase';
setApiVendor(Api);

var API_PATH = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents/`;

Api.defaults.baseURL = API_PATH;
    
// Setting Authorization token on the fly
function setTokenHeaderOnTheFly(config:any) {
  setTokenHeader(config);
  return config;
}

function setTokenHeader (config:any) {
  var {token} = Auth;
  var {headers} = config;
  if (token && headers) {
    (headers.common || headers)['Authorization'] = Api.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  }
}

// Turning {fields:{id: {integerValue: 12345}}} into {id: 12345}
function formatResponse (response:any): any {
  var {data} = response;  
  //var rawData = {...response.data.fields};
  //console.log("RESPONSE RAW:", rawData);
  for(var key in data.fields) {
    var rawVal = data.fields[key];
    var val = rawVal[Object.keys(rawVal)[0]];
    data.fields[key] = val;
  }
  //console.log("RESPONSE FORMATTED:", data.fields);
  return {data: data.fields};
}

const TYPES = {
  "number": 'integerValue',
  "string": 'stringValue',
  "boolean": 'booleanValue',
}

// Turning {authorId: 12345} into {fields:{id:{integerValue:12345}}}
function formatRequest (request:any) {
  var {data, method} = request;
  if (method === "post") {
    var newData = {fields: {}};
    for(var key in data) {
      var val = data[key];
      var typeOfVal:string = typeof val;
      var valType = (TYPES as any)[typeOfVal];
      (newData as any).fields[key] = {[valType]:val};
    }
    request.data = newData;
  }
  return request;
}

Api.interceptors.request.use(setTokenHeaderOnTheFly);
Api.interceptors.request.use(formatRequest);
Api.interceptors.response.use(formatResponse);  
