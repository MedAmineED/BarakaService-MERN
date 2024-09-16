import axios from "axios";
import Categorie from "src/entities/Categorie";



class CategorieServices {
    async GetListCategorie(endpoint: string): Promise<Categorie[]> {
        try {
          const response = await axios.get<Categorie[]>(endpoint, {
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

export default new CategorieServices();