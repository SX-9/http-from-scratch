/**
 * @typedef {Object} RequestData
 * @property {String} method - The HTTP method used in the request.
 * @property {String} path - The path of the request.
 * @property {Object} query - The query parameters of the request.
 * @property {Object} headers - The headers of the request.
 * @property {String} body - The body of the request.
 * @property {String} version - The HTTP version of the request.
 */

/**
 * Parses the raw HTTP request data and extracts relevant information.
 * @param {Buffer} raw - The raw HTTP request data.
 * @returns {RequestData} - An object containing the parsed request information.
 */
function parseReq(raw) {
  let request = raw.toString();
  let [line1, ...lines] = request.split('\r\n');
  let [method, route, version] = line1.split(' ');
  let [path, search] = route.split('?');
  let query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
  let headers = Object.fromEntries(lines.filter((_,i) => i <= lines.length - 3).map(line => line.split(': ')));
  let body = lines[lines.length - 1];
  return { method, path, query, headers, body, version };
}

/**
 * @typedef {Object} ResponseData
 * @property {Number} status - The HTTP status code of the response.
 * @property {String} message - The HTTP status message of the response.
 * @property {Object} headers - The headers of the response.
 * @property {String} body - The body of the response.
 * @property {String} version - The HTTP version of the response.
 * @property {String} response - The HTTP response string.
 */

/**
 * Creates a raw HTTP response from the given data.
 * @param {ResponseData} data - The data to use to create the response.
 * @returns {Buffer} - The raw HTTP response.
 */
function stringifyRes(data) {
}

require('net').createServer(socket => {
  socket.on('data', raw => {
    const data = parseReq(raw);
    console.log(data)
    socket.end();
  });
}).listen(4221, "0.0.0.0");