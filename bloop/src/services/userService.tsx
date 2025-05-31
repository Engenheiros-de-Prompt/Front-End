import axios from 'axios';



export default function userService() {
    const API_URL = 'http://localhost:3000/user';

    const getUsersByteamId = async (teamId: string): Promise<any> => {
        console.log("Response from getUsersByteamId:", response.data);
        try {
            const response = await axios.get(`${API_URL}/getUsersByteamId/${teamId}`);
            
            return response.data;
        } catch (error) {
            console.error('Error fetching users by team:', error);
            throw error;
        }
    }

    const getUserById = async (userId: string): Promise<any> => {
        try {
            const response = await axios.get(`${API_URL}/getUserById/${userId}`);
            return response.data;
        } catch (error) {
            console.error('Error fetching user by ID:', error);
            throw error;
        }
    }

    const createUser = async (userData: any): Promise<any> => {
        try {
            const response = await axios.post(`${API_URL}/createUser`, userData);
            return response.data;
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    }
    
    return {
        getUsersByteamId,
        getUserById,
        createUser
    }
}