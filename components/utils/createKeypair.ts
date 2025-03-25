import axios from "axios";

export const createKeypair = async () => {
    try {
        const response = await axios.post("/api/createKeypair");
        return response.data;
    } catch (error) {
        console.error("Error minting NFT:", error.response?.data || error.message);
        throw error;
    }
};
