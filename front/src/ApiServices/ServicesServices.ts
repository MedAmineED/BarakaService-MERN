import axios from "axios";
import ServiceEntity from "src/entities/ServiceEntity";

interface getType {
  totalCount: number;
  serviceList: ServiceEntity[];
}

class ServiceServices {

  async GetListService(endpoint: string): Promise<getType> {
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

  async GetServiceById(endpoint: string, id: number): Promise<ServiceEntity> {
    try {
      const response = await axios.get<ServiceEntity>(`${endpoint}/${id}`, {
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

  async AddService(endpoint: string, service: ServiceEntity): Promise<ServiceEntity> {
    try {
      const response = await axios.post<ServiceEntity>(endpoint, service, {
        headers: {
          Authorization: `Bearer token`,
          'Content-Type': 'application/json',
        }, 
      });
      return response.data;
    } catch (error) {
      console.error("Error adding service:", error);
      throw error;
    }
  }

  async UpdateService(endpoint: string, id: number, service: ServiceEntity): Promise<ServiceEntity> {
    try {
      const response = await axios.put<ServiceEntity>(`${endpoint}/${id}`, service, {
        headers: {
          Authorization: `Bearer token`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  }

  async DeleteService(endpoint: string, id: number): Promise<ServiceEntity> {
    try {
      const response = await axios.delete<ServiceEntity>(`${endpoint}/${id}`, {
        headers: {
          Authorization: `Bearer token`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  }

}

export default new ServiceServices();
