import axios from "axios";
import Article from "src/entities/Article";

interface getType {
    totalCount : number, 
    articleList : Article[]
}

class ArticleServices {


    async GetListArticle(endpoint: string): Promise<getType> {
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


      async GetArticleById(endpoint: string, id : number): Promise<Article> {
        try {
          const response = await axios.get<Article>(`${endpoint}/${id}`, {
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


    async AddArticle(endpoint: string, article: Article): Promise<Article> {
      try {
        const response = await axios.post<Article>(endpoint, article, {
          headers: {
            Authorization: `Bearer token`,
            'Content-Type': 'application/json'
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error adding article:", error);
        throw error;
      }
    }




    async UpdateArticle(endpoint: string, id : number, article: Article): Promise<Article> {
      try {
        const response = await axios.put<Article>(`${endpoint}/${id}`, article, {
          headers: {
            Authorization: `Bearer token`,
            'Content-Type': 'application/json'
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error adding article:", error);
        throw error;
      }
    }


    async DeleteArticle(endpoint: string, id : number): Promise<Article> {
      try {
        const response = await axios.delete<Article>(`${endpoint}/${id}`, {
          headers: {
            Authorization: `Bearer token`,
            'Content-Type': 'application/json'
          },
        });
        return response.data;
      } catch (error) {
        console.error("Error adding article:", error);
        throw error;
      }
    }

}

export default new ArticleServices();