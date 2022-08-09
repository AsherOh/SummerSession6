import axios from "axios";

const instance = axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    params: {
        api_key: "f9ecada74da8e2078faaf789b830d337",
        language: "ko-KR",
    },
});

export default instance;