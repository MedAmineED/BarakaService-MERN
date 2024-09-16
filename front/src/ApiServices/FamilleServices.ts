import axios from "axios";
import Famille from "src/entities/Famille";



class FamilleServices {
    async GetListFamille(endpoint: string): Promise<Famille[]> {
        try {
          const response = await axios.get<Famille[]>(endpoint, {
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

export default new FamilleServices();