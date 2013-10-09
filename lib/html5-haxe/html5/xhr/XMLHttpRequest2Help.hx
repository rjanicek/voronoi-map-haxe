package html5.xhr;

enum RequestMethod {

	/**
	 * Asks for the response identical to the one that would correspond to a
	 * GET request, but without the response body. This is useful for
	 * retrieving meta-information written in response headers, without having
	 * to transport the entire content.
	 */
	HEAD;

	/**
	 * Requests a representation of the specified resource. Requests using GET
	 * (and a few other HTTP methods) "SHOULD NOT have the significance of
	 * taking an action other than retrieval". The W3C has published guidance
	 * principles on this distinction, saying, "Web application design should
	 * be informed by the above principles, but also by the relevant limitations."
	 */
	GET;

	/**
	 * Submits data to be processed (e.g., from an HTML form) to the identified
	 * resource. The data is included in the body of the request. This may
	 * result in the creation of a new resource or the updates of existing
	 * resources or both.
	 */
	POST;

	/**
	 * Uploads a representation of the specified resource.
	 */
	PUT;

	/**
	 * Deletes the specified resource.
	 */
	DELETE;

	/**
	 * Echoes back the received request, so that a client can see what (if any)
	 * changes or additions have been made by intermediate servers.
	 */
	TRACE;

	/**
	 * Returns the HTTP methods that the server supports for specified URL.
	 * This can be used to check the functionality of a web server by
	 * requesting '*' instead of a specific resource.
	 */
	OPTIONS;

	/**
	 * Converts the request connection to a transparent TCP/IP tunnel, usually
	 * to facilitate SSL-encrypted communication (HTTPS) through an unencrypted
	 * HTTP proxy.
	 */
	CONNECT;

	/**
	 * Is used to apply partial modifications to a resource.
	 */
	PATCH;
}

enum ReadyState {

	/**
	* When constructed, the XMLHttpRequest object must be in the UNSENT state.
	*/
	UNSENT;

	/**
	* The OPENED state is the state of the object when the open() method has been
	* successfully invoked. During this state request headers can be set using
	* setRequestHeader() and the request can be made using send().
	*/
	OPENED;

	/**
	* The HEADERS_RECEIVED state is the state of the object when all response
	* headers have been received.
	*/
	HEADERS_RECEIVED;
	/**
	* The LOADING state is the state of the object when the response entity body
	* is being received.
	*/
	LOADING;

	/**
	* The DONE state is the state of the object when either the data transfer has
	* been completed or something went wrong during the transfer (infinite
	* redirects for instance).
	*/
	DONE;
}

enum HttpStatusCode {

	/**
	 * Standard response for successful HTTP requests. The actual response will
	 * depend on the request method used. In a GET request, the response will
	 * contain an entity corresponding to the requested resource. In a POST
	 * request the response will contain an entity describing or containing
	 * the result of the action.
	 */
	OK;

	/**
	 * The requested resource could not be found but may be available again in the future.
	 * Subsequent requests by the client are permissible.
	 */
	NOT_FOUND;

	/**
	 * A generic error message, given when no more specific message is suitable.
	 */
	INTERNAL_SERVER_ERROR;
}

class XMLHttpRequest2Help {

	public static function requestMethodValue(requestMethod:RequestMethod):String {
		return switch (requestMethod) {
			case HEAD: "HEAD";
			case GET: "GET";
			case POST: "POST";
			case PUT: "PUT";
			case DELETE: "DELETE";
			case TRACE: "TRACE";
			case OPTIONS: "OPTIONS";
			case CONNECT: "CONNECT";
			case PATCH: "PATCH";
		}
	}
	
	public static function readyStateValue(readyState:ReadyState):Int {
		return switch (readyState) {
			case UNSENT: 0;
			case OPENED : 1;
			case HEADERS_RECEIVED: 2;
			case LOADING : 3;
			case DONE : 4;
		}
	}
	
	public static function httpStatusCodeValue(httpStatusCode:HttpStatusCode):Int {
		return switch(httpStatusCode) {
			case OK: 200;
			case NOT_FOUND: 404;
			case INTERNAL_SERVER_ERROR: 500;
		}
	}
	
	public static function setBinaryModeForChrome(xhr:XMLHttpRequest2):Void {
		xhr.overrideMimeType("text/plain; charset=x-user-defined");
		xhr.responseType = "arraybuffer";
	}
	
}