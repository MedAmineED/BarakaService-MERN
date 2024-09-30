import axios from "axios";
import Facture from '../entities/Facture'; // Adjust the import path

interface getType {
    totalCount: number;
    factureList: Facture[];
}

class FactureService {
    
    async GetListFacture(endpoint: string): Promise<getType> {
        console.log(endpoint)
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

    async GetFactureById(endpoint: string, id: number): Promise<Facture> {
        try {
            const response = await axios.get<Facture>(`${endpoint}/${id}`, {
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

    async GetFactureByIdDem(endpoint: string, id: number): Promise<Facture> {
        try {
            const response = await axios.get<Facture>(`${endpoint}/bydemande/${id}`, {
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

    async getLatestNumber(endpoint: string): Promise<number> {
        try {
            const response = await axios.get<{latestnumber : number}>(`${endpoint}/latestnumber`, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data.latestnumber;
        } catch (error) {
            console.error("Error adding Facture:", error);
            throw error;
        }
    }


    async AddFacture(endpoint: string, facture: Facture): Promise<Facture> {
        try {
            const response = await axios.post<Facture>(endpoint, facture, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding Facture:", error);
            throw error;
        }
    }

    async UpdateFacture(endpoint: string, id: number, facture: Facture): Promise<Facture> {
        try {
            const response = await axios.put<Facture>(`${endpoint}/${id}`, facture, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating Facture:", error);
            throw error;
        }
    }

    async DeleteFacture(endpoint: string, id: number): Promise<Facture> {
        try {
            const response = await axios.delete<Facture>(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json'
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting Facture:", error);
            throw error;
        }
    }
}

export default new FactureService();
