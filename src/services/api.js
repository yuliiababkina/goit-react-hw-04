import axios from "axios";

const UNSPLASH_ACCESS_KEY = "boroGLh2_ZkYMROzEGG_Tf0mAQYIo-OqGLpRL-i2lW0";
axios.defaults.baseURL = "https://api.unsplash.com/search";
axios.defaults.headers.common["Authorization"] =
    "Client-ID " + UNSPLASH_ACCESS_KEY;

export const fetchImages = async (query, page) => {
    const { data } = await axios.get(`/photos`, {
        params: {
            page,
            query,
            per_page: 12,
            orientation: "landscape",
        },
    });

    return data;
};
