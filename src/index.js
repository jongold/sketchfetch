/* @flow */
/* globals NSString, NSUTF8StringEncoding, NSMutableURLRequest, NSURL, NSURLConnection */
import Future from 'fluture';

type URL = string;
type Options = {
  method?: 'GET' | 'POST',
  headers?: { [key: string]: string },
};

const defaultOptions = {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
  },
};

// url options? -> Future NSURLRequest NSError
const makeRequest = (url: URL, options?: Options = {}) =>
  Future.try(() => {
    const _options = {
      ...defaultOptions,
      ...options,
    };
    // const data = NSString.alloc().initWithString(url).dataUsingEncoding(NSUTF8StringEncoding);

    const request = NSMutableURLRequest.requestWithURL(NSURL.URLWithString(url));
    request.setHTTPMethod(_options.method);
    // request.setHTTPBody(data);

    Object.keys(_options.headers).forEach(header =>
      request.setValue_forHTTPHeaderField(_options.headers[header], header));

    return request;
  });

// runRequest :: NSURLRequest -> Future NSURLResponse NSErrir
const runRequest = request =>
  Future((reject, resolve) => {
    let error;
    const response = NSURLConnection.sendSynchronousRequest_returningResponse_error(
      request,
      null,
      error,
    );
    if (response) {
      resolve(response);
    } else {
      reject(error);
    }
  });

// toJSON :: NSURLResponse -> Future Object NSError
const toJSON = response =>
  Future.try(() => {
    const result = NSString.alloc().initWithData_encoding(response, NSUTF8StringEncoding);
    return JSON.parse(result).data;
  });

const fetch = (url: URL, options?: Options) =>
  makeRequest(url, options).chain(runRequest).chain(toJSON);

export default fetch;
