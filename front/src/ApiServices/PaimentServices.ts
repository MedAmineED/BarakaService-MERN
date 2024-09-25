import axios from "axios";
import Paiement from "src/entities/Paiement";

interface GetType {
    totalCount: number;
    paiementList: Paiement[];
}

class PaiementService {

    async GetSum(endpoint: string, demId: number): Promise<number> {
        try {
            const response = await axios.get<number>(`${endpoint}/sum/${demId}`, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching paiement sum:", error);
            throw error;
        }
    }

    async AddTimbreFiscal(endpoint: string, demId: number, prixFinal : number): Promise<number> {
        try {
            const response = await axios.post<number>(`${endpoint}/addtimbre/${demId}`, {prix_ttc : prixFinal}, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching paiement sum:", error);
            throw error;
        }
    }

    async PaiementOperation(endpoint: string, demId: number, prixFinale: number, paiement : Paiement): Promise<number> {
        try {
            await this.AddTimbreFiscal(endpoint, demId, prixFinale);
            const response = await axios.post<number>(`${endpoint}/paimentoperation/${demId}`, paiement, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching paiement sum:", error);
            throw error;
        }
    }

    async GetListPaiements(endpoint: string, demId: number): Promise<GetType> {
        try {
            const response = await axios.get<GetType>(`${endpoint}/${demId}`, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching paiements:", error);
            throw error;
        }
    }

    async GetPaiementById(endpoint: string, id: number): Promise<Paiement> {
        try {
            const response = await axios.get<Paiement>(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer token`,
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching paiement:", error);
            throw error;
        }
    }

    async AddPaiement(endpoint: string, paiement: Paiement): Promise<Paiement> {
        try {
            const response = await axios.post<Paiement>(endpoint, paiement, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error adding paiement:", error);
            throw error;
        }
    }

    async UpdatePaiement(endpoint: string, id: number, paiement: Paiement): Promise<Paiement> {
        try {
            const response = await axios.put<Paiement>(`${endpoint}/${id}`, paiement, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error updating paiement:", error);
            throw error;
        }
    }

    async DeletePaiement(endpoint: string, id: number): Promise<Paiement> {
        try {
            const response = await axios.delete<Paiement>(`${endpoint}/${id}`, {
                headers: {
                    Authorization: `Bearer token`,
                    'Content-Type': 'application/json',
                },
            });
            return response.data;
        } catch (error) {
            console.error("Error deleting paiement:", error);
            throw error;
        }
    }
}

export default new PaiementService();
