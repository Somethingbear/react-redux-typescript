import axios from "axios"
import qs from "qs";

let source = axios.CancelToken.source();

export let postQuery = async (url: string, data: object) => {
    let queryUrl = `${url}?${qs.stringify(data, { encode: false })}`;
  
    try {
        const res = await axios.post(queryUrl, { cancelToken: source.token });
        // if (res.error && res.message) {
        //     throw new Error(res.message);
        // } else {
        return res.data;
    }
    catch (err) {
        if (axios.isCancel(err)) {
            console.error(err.message, err);
        }
        else {
            throw err;
        }
    }
  }

export default postQuery;

export function cancelPostQuery() {
    source.cancel('request canceled');
}