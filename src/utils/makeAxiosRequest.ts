import axios from "axios";
import env from "./env_variables";

module.exports = async ({ uri = "", method = "get", data = {} }) => {
    method = ["get", "post", "put", "patch", "delete"].includes(method.toLocaleLowerCase()) ? method : "get";
    const response = await axios({
        url: env.API_BASE_URL + (uri || ""),
        method: method,
        data: data,
        headers: {
            Authorization: "Token " + env.API_TOKEN,
            "Content-Type": "application/json",
        },
    });
    return response.data;
};
