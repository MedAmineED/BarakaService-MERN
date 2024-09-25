import axios from "axios";
import Societe from "../entities/Societe";



class SocieteServices {
    async GetListSociete(endpoint: string): Promise<Societe[]> {
        try {
          const response = await axios.get<Societe[]>(endpoint, {
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
}

export default new SocieteServices();