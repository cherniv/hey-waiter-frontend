import Api from 'axios';
import User from '../models/User';
import Business from '../models/Business';
import Auth from '../services/Auth';
import {projectId} from '../config/firebase';
import Table from '../models/Table';
User.Api = (Api);
Business.Api = (Api);
Table.Api = Api;

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

function getValue(node:any): any {
  var val = node[Object.keys(node)[0]];
  if (val.values) {
    val = val.values.map((item:any) => {
      return getValue(item);
    })
  }
  return val;
}

function formatResponseDocument(data:any): any {
  data.fields = data.fields || {};
  for(var key in data.fields) {
    data.fields[key] = getValue(data.fields[key]);
  }
  var id = data.name.split('/').pop();
  data.fields['id'] = id;
  //console.log("RESPONSE FORMATTED:", data.fields);
  return data.fields;
}

// Turning {fields:{id: {integerValue: 12345}}} into {id: 12345}
function formatResponse (response:any): any {
  var {data} = response;  
  //console.log("RESPONSE RAW:", {...response});

  // this type comes from delete request
  if (Object.entries(data).length === 0) return data;
  
  // this type comes from :runQuery post request
  if (data.length) {
    return {data: data.map((document:any) => {
      var formattedData = formatResponseDocument(document.document);
      return formattedData;
    })}
  // this type comes from /:id get request
  } else {
    var document = data;
    var formattedData = formatResponseDocument(document);
    return {data: formattedData};
  } 
}

const TYPES = {
  "number": 'integerValue',
  "string": 'stringValue',
  "boolean": 'booleanValue',
  "array": 'arrayValue',
}

// Turning {authorId: 12345} into {fields:{id:{integerValue:12345}}}
function formatRequest (request:any) {
  var {data, method, url} = request;
  //console.log('REQUEST', request);
  if ((method === "post" || method === "put") && !url.includes(":runQuery")) {
    var newData = {fields: {}};
    for(var key in data) {
      var val = data[key];
      var typeOfVal:string = typeof val;
      var isArray = Array.isArray(val);
      if (isArray) typeOfVal = "array";
      var firestoreType = (TYPES as any)[typeOfVal];
      if (!isArray) {
        (newData as any).fields[key] = {[firestoreType]:val};
      } else {
        val = val.slice().map((item:any) => {
          var typeOfVal:string = typeof item;
          var firestoreType = (TYPES as any)[typeOfVal];
          return {[firestoreType]:item};
        });
        (newData as any).fields[key] = {[firestoreType]:{values:val}};
      }
    }
    request.data = newData;
  }
  if (method === "put") request.method = "patch";
  return request;
}

Api.interceptors.request.use(setTokenHeaderOnTheFly);
Api.interceptors.request.use(formatRequest);
Api.interceptors.response.use(formatResponse);  
