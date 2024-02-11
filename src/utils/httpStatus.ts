import _ from "lodash";

class HttpStatus {
    static readonly status = {
        CONTINUE_100: { message: "Continue", code: 100 },
        SWITCHING_PROTOCOLS_101: { message: "Switching Protocols", code: 101 },
        PROCESSING_102: { message: "Processing", code: 102 },
        EARLY_HINTS_103: { message: "Early Hints", code: 103 },
        OK_200: { message: "OK", code: 200 },
        CREATED_201: { message: "Created", code: 201 },
        ACCEPTED_202: { message: "Accepted", code: 202 },
        NON_AUTHORITATIVE_INFORMATION_203: { message: "Non Authoritative Information", code: 203 },
        NO_CONTENT_204: { message: "No Content", code: 204 },
        RESET_CONTENT_205: { message: "Reset Content", code: 205 },
        PARTIAL_CONTENT_206: { message: "Partial Content", code: 206 },
        MULTI_STATUS_207: { message: "Multi-Status", code: 207 },
        MULTIPLE_CHOICES_300: { message: "Multiple Choices", code: 300 },
        MOVED_PERMANENTLY_301: { message: "Moved Permanently", code: 301 },
        MOVED_TEMPORARILY_302: { message: "Moved Temporarily", code: 302 },
        SEE_OTHER_303: { message: "See Other", code: 303 },
        NOT_MODIFIED_304: { message: "Not Modified", code: 304 },
        USE_PROXY_305: { message: "Use Proxy", code: 305 },
        TEMPORARY_REDIRECT_307: { message: "Temporary Redirect", code: 307 },
        PERMANENT_REDIRECT_308: { message: "Permanent Redirect", code: 308 },
        BAD_REQUEST_400: { message: "Bad Request", code: 400 },
        UNAUTHORIZED_401: { message: "Unauthorized", code: 401 },
        PAYMENT_REQUIRED_402: { message: "Payment Required", code: 402 },
        FORBIDDEN_403: { message: "Forbidden", code: 403 },
        NOT_FOUND_404: { message: "Not Found", code: 404 },
        METHOD_NOT_ALLOWED_405: { message: "Method Not Allowed", code: 405 },
        NOT_ACCEPTABLE_406: { message: "Not Acceptable", code: 406 },
        PROXY_AUTHENTICATION_REQUIRED_407: { message: "Proxy Authentication Required", code: 407 },
        REQUEST_TIMEOUT_408: { message: "Request Timeout", code: 408 },
        CONFLICT_409: { message: "Conflict", code: 409 },
        GONE_410: { message: "Gone", code: 410 },
        LENGTH_REQUIRED_411: { message: "Length Required", code: 411 },
        PRECONDITION_FAILED_412: { message: "Precondition Failed", code: 412 },
        REQUEST_TOO_LONG_413: { message: "Request Entity Too Large", code: 413 },
        REQUEST_URI_TOO_LONG_414: { message: "Request-URI Too Long", code: 414 },
        UNSUPPORTED_MEDIA_TYPE_415: { message: "Unsupported Media Type", code: 415 },
        REQUESTED_RANGE_NOT_SATISFIABLE_416: { message: "Requested Range Not Satisfiable", code: 416 },
        EXPECTATION_FAILED_417: { message: "Expectation Failed", code: 417 },
        IM_A_TEAPOT_418: { message: "I'm a teapot", code: 418 },
        INSUFFICIENT_SPACE_ON_RESOURCE_419: { message: "Insufficient Space on Resource", code: 419 },
        METHOD_FAILURE_420: { message: "Method Failure", code: 420 },
        MISDIRECTED_REQUEST_421: { message: "Misdirected Request", code: 421 },
        UNPROCESSABLE_ENTITY_422: { message: "Unprocessable Entity", code: 422 },
        LOCKED_423: { message: "Locked", code: 423 },
        FAILED_DEPENDENCY_424: { message: "Failed Dependency", code: 424 },
        UPGRADE_REQUIRED_426: { message: "Upgrade Required", code: 426 },
        PRECONDITION_REQUIRED_428: { message: "Precondition Required", code: 428 },
        TOO_MANY_REQUESTS_429: { message: "Too Many Requests", code: 429 },
        REQUEST_HEADER_FIELDS_TOO_LARGE_431: { message: "Request Header Fields Too Large", code: 431 },
        UNAVAILABLE_FOR_LEGAL_REASONS_451: { message: "Unavailable For Legal Reasons", code: 451 },
        INTERNAL_SERVER_ERROR_500: { message: "Internal Server Error", code: 500 },
        NOT_IMPLEMENTED_501: { message: "Not Implemented", code: 501 },
        BAD_GATEWAY_502: { message: "Bad Gateway", code: 502 },
        SERVICE_UNAVAILABLE_503: { message: "Service Unavailable", code: 503 },
        GATEWAY_TIMEOUT_504: { message: "Gateway Timeout", code: 504 },
        HTTP_VERSION_NOT_SUPPORTED_505: { message: "HTTP Version Not Supported", code: 505 },
        INSUFFICIENT_STORAGE_507: { message: "Insufficient Storage", code: 507 },
        NETWORK_AUTHENTICATION_REQUIRED_511: { message: "Network Authentication Required", code: 511 },
    };
    static getCode(message = "Internal Server Error"): number {
        const result = _.filter(HttpStatus.status, { message: message });
        if (result.length === 1) return result[0].code;
        else return 0;
    }
    static getMessage(code = 500): string {
        const result = _.filter(HttpStatus.status, { code: code });
        if (result.length === 1) return result[0].message;
        else return "";
    }
}
const status = HttpStatus.status;
export default HttpStatus;
export { status };
