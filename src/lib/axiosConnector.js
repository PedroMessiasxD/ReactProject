import axios from "axios";

const connector = axios.create({
    baseURL: 'https://localhost:7287/api/'
})

export default connector;