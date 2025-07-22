import axios from "./axios";

export const saveFbrToken = async (token:string) => {
    const response = await axios.post("/credentials/fbr_token", {token});
    return response.data;
};

export const getFbrToken = async () => {
    const response = await axios.get("/credentials/fbr_token");
    return response.data;
};

export const deleteFbrToken = async (id:string) => {
    const response = await axios.delete(`/credentials/fbr_token/${id}`);
    return response.data;
};

export const updateFbrToken = async (id:string, token:string) => {
    const response = await axios.put(`/credentials/fbr_token/${id}`, {token});
    return response.data;
}