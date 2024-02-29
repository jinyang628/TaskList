import axios from "axios";

// const API_URL = process.env.EXPO_PUBLIC_API_URL;
const API_URL = "http://localhost:3000";

export async function deleteTask(id: string) {
    try {
        const response = await axios.delete(
            `${API_URL}/api/tasks/${id}`
        );
        console.log(response.data.message)
    } catch (error) {
        console.error(error);
        throw error;
    }
}