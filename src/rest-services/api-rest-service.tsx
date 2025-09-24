import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import { ApiConstant } from "./api-constant.ts";
import type { CatModel } from "../model/CatModel.ts";

const API: AxiosInstance = axios.create({
    baseURL: "https://cataas.com/api/",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

const API_CONST = ApiConstant;

const ApiRestService = {

    getCats: async (requiredNumbers: number): Promise<CatModel[]> => {
        const response: AxiosResponse<CatModel[]> = await API.get(`${API_CONST.CATS}?limit=${requiredNumbers}`);
        return response.data
    }

};

export default ApiRestService;
