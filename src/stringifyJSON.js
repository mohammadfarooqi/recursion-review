// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

//takes an array loops thorugh, parses and returns a string
var parseArray = function (arr) {
  //check if array length is 0 and return []
  if(arr.length === 0) {
    return '[]';
  }

  //init str with open square bracket
  var str = '[';

  //loop through each element and parse
  for(var i = 0; i < arr.length; i++) {
    if(typeof arr[i] === 'number') {
      str += arr[i];
    } else if (typeof arr[i] === 'string') {
      str += '"' + arr[i] + '"';
    } else if (Array.isArray(arr[i])) {
      str += parseArray(arr[i]);
    } else if (typeof arr[i] === 'object') {
      str += parseObj(arr[i]);
    }

    if(i + 1 < arr.length) {
      str += ',';
    }
  }

  str += ']';
  return str;
};

//returns length of obj
var objLength = function (obj) {
  var count = 0;

  for(var key in obj) {
    if(obj.hasOwnProperty(key)) {
      count++;
    }
  }

  return count;
};

//takes in an object parses and returns a string
var parseObj = function (obj) {
  //check if ojb length is 0 and return empty object
  if(objLength(obj) === 0) {
    return '{}';
  }
  //get obj size
  var objSize = objLength(obj);
  //init str with curly brace
  var str = '{';
  //loop through object and parse obj
  for(var key in obj) {
    if(typeof obj[key] !== 'function' && typeof obj[key] !== 'undefined') {
      str += '"' + key + '"' +':';
      if(typeof obj[key] === 'string') {
        str += '"' + obj[key] + '"';
      } else if(typeof obj[key] === 'boolean' || obj[key] === null) {
        str += obj[key];
      } else if (Array.isArray(obj[key])) {
        str += parseArray(obj[key]);
      } else if (typeof obj[key] === 'object') {
        str += parseObj(obj[key]);
      }
      if(objSize > 1) {
        str += ',';
      }
    }
    objSize--;
  }

  str += '}';
  return str;
};

//takes an object ans stringifies to a JSON object
var stringifyJSON = function(obj) {

  if(typeof obj === 'number' || obj === null || typeof obj === 'boolean') {
    return obj+"";
  } else if ( typeof obj === 'string') {
    return '"' + obj + '"';
  } else if (Array.isArray(obj)) {
    return parseArray(obj);
  } else if (typeof obj === 'object') {
    return parseObj(obj);
  }

};
