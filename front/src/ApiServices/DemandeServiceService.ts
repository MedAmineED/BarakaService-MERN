import axios from "axios";
import DemandeServiceEntity from 'src/entities/DemandeServiceEntity';

interface getType {
    totalCount : number, 
    demandeServiceList : DemandeServiceEntity[]
}

class DemandeServiceServices {
    
    async GetListDemandeService(endpoint: string): Promise<getType> {
        try {
            const response = await axios.get<getType>(endpoint, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async GetDemandeServiceById(endpoint: string, id: number): Promise<DemandeServiceEntity> {
        try {
            const response = await axios.get<DemandeServiceEntity>(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error;
        }
    }

    async AddDemandeService(endpoint: string, demandeService: DemandeServiceEntity): Promise<DemandeServiceEntity> {
        try {
            const response = await axios.post<DemandeServiceEntity>(endpoint, demandeService, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding DemandeService:", error);
            throw error;
        }
    }

    async UpdateDemandeService(endpoint: string, id: number, demandeService: DemandeServiceEntity): Promise<DemandeServiceEntity> {
        try {
            const response = await axios.put<DemandeServiceEntity>(`${endpoint}/${id}`, demandeService, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating DemandeService:", error);
            throw error;
        }
    }

    async DeleteDemandeService(endpoint: string, id: number): Promise<DemandeServiceEntity> {
        try {
            const response = await axios.delete<DemandeServiceEntity>(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting DemandeService:", error);
            throw error;
        }
    }
}

export default new DemandeServiceServices();
