import axios from "axios";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://localhost:3000";

export async function getTasks() {
    try {
        const response = await axios.get(
            `${API_URL}/api/tasks`
        );
        return response.data;
    } catch (error) {
        console.error(error);
        // You can throw the error again so that the calling function can handle it
        throw error;
    }
}