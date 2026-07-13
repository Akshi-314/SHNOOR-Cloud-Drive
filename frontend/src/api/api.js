import axios from "axios";

const API = axios.create({
    baseURL: "https://shnoor-cloud-drive-kbvm.onrender.com"
});

export default API;