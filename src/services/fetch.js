import config from "../utils/auth0_config";
export var FetchMethod;
(function (FetchMethod) {
    FetchMethod["GET"] = "GET";
    FetchMethod["POST"] = "POST";
    FetchMethod["PUT"] = "PUT";
    FetchMethod["DELETE"] = "DELETE";
    FetchMethod["PATCH"] = "PATCH";
})(FetchMethod || (FetchMethod = {}));
export var FetchReturn;
(function (FetchReturn) {
    FetchReturn[FetchReturn["JSON"] = 0] = "JSON";
    FetchReturn[FetchReturn["ArrayBuffer"] = 1] = "ArrayBuffer";
    FetchReturn[FetchReturn["Text"] = 2] = "Text";
    FetchReturn[FetchReturn["Blob"] = 3] = "Blob";
    FetchReturn[FetchReturn["FormData"] = 4] = "FormData";
})(FetchReturn || (FetchReturn = {}));
export var FetchCache;
(function (FetchCache) {
    FetchCache["FILE"] = "default";
    FetchCache["JSON"] = "no-cache";
})(FetchCache || (FetchCache = {}));
let Fetch = (() => {
    class Fetch {
        static set token(token) {
            Fetch._token = token;
            Fetch.headers.set("Authorization", `Bearer ${token}`);
            (function (send) {
                XMLHttpRequest.prototype.send = function (data) {
                    if (token)
                        this.setRequestHeader("Authorization", `Bearer ${token}`);
                    const organizationId = Fetch.headers.get("X-Simumatik-Organization-Id");
                    if (organizationId)
                        this.setRequestHeader("X-Simumatik-Organization-Id", organizationId);
                    send.call(this, data);
                };
            })(XMLHttpRequest.prototype.send);
        }
        static get token() { return Fetch._token; }
        static async processRespnse(response) {
            if (response.ok) {
                return (response.status !== 204) ? response : null;
            }
            else {
                const error = await response.json();
                if (error.cause) {
                    throw error;
                }
                else if (error.error) {
                    throw Error(error.error.description);
                }
                else {
                    throw Error('Unrepoted Error');
                }
            }
        }
    }
    Fetch.headers = new Headers({ "Content-Type": "application/json" });
    Fetch.baseURL = config.audience;
    Fetch.fetch = async (input, options = {}) => {
        if (options) {
            if (!options.headers) {
                options = Object.assign({}, options, { headers: Fetch.headers });
            }
            else {
                const headers = new Headers(options.headers);
                headers.set("Authorization", `Bearer ${Fetch._token}`);
                options.headers = headers;
            }
            if (options.body && options.body.constructor.name === "FormData") {
                if (options.headers) {
                    options.headers.delete('Content-Type');
                }
            }
        }
       /*  const response = await Fetch.processRespnse(await fetch(`${Fetch.baseURL}/${input}`, options)); */
        const response = await Fetch.processRespnse(await fetch(`/${input}`, options));
        if (!response)
            return null;
        switch (options.returnAs) {
            case 0:
                return response.json();
            case 1:
                return response.arrayBuffer();
            case 2:
                return response.text();
            case 3:
                return response.blob();
            case 4:
                return response.formData();
            default:
                return response.json();
        }
    };
    return Fetch;
})();
export { Fetch };