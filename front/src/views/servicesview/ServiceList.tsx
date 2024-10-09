/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import ServiceEntity from '../../entities/ServiceEntity';
import ServiceService from '../../ApiServices/ServicesServices';
import ApiUrls from '../../ApiUrl/ApiUrls';
import Pagination from '../../components/pagination/Pagination';

import InputModal from '../../components/InputModal/InputModal'; 
import { FetchType, InputFieldConfig } from 'src/util/types';
import GenericTable from '../../components/table/GenericTable';
import CategorieServices from '../../ApiServices/CategorieServices';



const columns = [
  { header: 'Categorie', accessor: 'categorie', style : {textAlign: "start"} },
  { header: 'Libelle', accessor: 'libelle', style : {textAlign: "start"} },
  { header: 'Prix Unitaire', accessor: 'pu', style : {textAlign: "end"}, isFixed : true, unit : "DT" },
  { header: 'Remise', accessor: 'remise', style : {textAlign: "end"}, isFixed : true, unit : "DT" },
];



const inputFields: InputFieldConfig[] = [
  { controlId: 'categorieid', label: 'Categorie', type: 'select',
     placeholder: 'Categorie ID',
      col: "col-6",
      options : [{
        value : 0,
        label : "test"
      }]
     },
  { controlId: 'libelle', label: 'Libelle', type: 'text', placeholder: 'Libelle', col: "col-6" },
  { controlId: 'pu', label: 'PU', type: 'number', placeholder: 'PU', col: "col-6" },
  { controlId: 'remise', label: 'Remise', type: 'number', placeholder: 'Remise', col: "col-6" },
];





const ListeServices: FC = () => {
  const [serviceList, setServiceList] = useState<ServiceEntity[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [inputsAtt, setInputsAtt] = useState<InputFieldConfig[]>([...inputFields]);


    //fetch list familles
  const fetchCategorieList = async (): Promise<void> => {
      try {
        const response  = await CategorieServices.GetListCategorie(ApiUrls.CATEGORIE);
        const options = response.map((fm)=> {
             return {
              value : fm.id? fm.id : 0,
              label : fm.libelle
             }
        })
  
        const prevInputs = [...inputFields];
        prevInputs[0].options = [...options];
  
        setInputsAtt(prevInputs);
        
      } catch (err) {
        console.log("Error fetching data :", err);
  
      }
    };






  const fetchServiceList = async (start?: number, rowCpt?: number): Promise<FetchType> => {
    try {
      const response = await ServiceService.GetListService(`${ApiUrls.SERVICE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`);
      setServiceList(response.serviceList);

      return { totalCount: response.totalCount, pageCount: rowCpt ? Math.round(response.totalCount / rowCpt) : 0 };
    } catch (err) {
      console.log("Error fetching data:", err);
      return {
        totalCount: 0,
        pageCount: 0
      };
    }
  };

  const fetchServiceById = async (id: number): Promise<ServiceEntity | []> => {
    try {
      const response = await ServiceService.GetServiceById(ApiUrls.SERVICE, id);
      return response;
    } catch (err) {
      console.log("Error fetching data:", err);
      return [];
    }
  };

  const handleSearch = async () => {
    await fetchServiceList();
  };

  const validateService = (service: ServiceEntity): string | null => {
    if (typeof service.libelle !== "string" || service.libelle.trim() === "") {
      return "Libelle must be a non-empty string.";
    }

    const pu = Number(service.pu);
    if (isNaN(pu) || pu < 0) {
      return "PU must be a non-negative number.";
    }

    const remise = Number(service.remise);
    if (isNaN(remise) || remise < 0) {
      return "Remise must be a non-negative number.";
    }

    return null;
  };

  const editService = async (id: number, service: ServiceEntity): Promise<void> => {
    const validationError = validateService(service);
    try {
      if (validationError) {
        throw new Error(validationError);
      }
      await ServiceService.UpdateService(ApiUrls.SERVICE, id, service);
      console.log("Service edited successfully.");
    } catch (error) {
      console.error("Error editing service:", error);
    }
  };

  const handleEdit = async (id: number, formData: ServiceEntity | { [key: string]: any }) => {
    const numericData: ServiceEntity | { [key: string]: any } = {
      ...formData,
      categorieid: parseInt(formData.categorieid),
      pu: parseFloat(formData.pu),
      remise: parseFloat(formData.remise),
    };
    try {
      await editService(id, numericData as ServiceEntity);
      await fetchServiceList(0, 50);
    } catch (error) {
      console.error("Error editing service:", error);
    }
  };

  const addService = async (service: ServiceEntity): Promise<void> => {
    const validationError = validateService(service);
    try {
      if (validationError) {
        throw new Error(validationError);
      }
      await ServiceService.AddService(ApiUrls.SERVICE, service);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const handleSave = async (formData: ServiceEntity | { [key: string]: any }) => {
    const numericData: ServiceEntity | { [key: string]: any } = {
      ...formData,
      categorieid: parseInt(formData.categorieid),
      pu: parseFloat(formData.pu),
      remise: parseFloat(formData.remise),
    };
    try {
      await addService(numericData as ServiceEntity);
      await fetchServiceList(0, 50);
    } catch (error) {
      console.error("Error adding service:", error);
    }
  };

  const deleteService = async (id: number): Promise<void> => {
    try {
      await ServiceService.DeleteService(ApiUrls.SERVICE, id);
      await fetchServiceList(0, 50);
    } catch (error) {
      console.error("Error deleting service:", error);
    }
  };

  useEffect(() => {
    fetchServiceList(0, 50);
    fetchCategorieList();
  }, []);

  return (
    <MainCmp>
      <ItemHeader
        title="Liste des Services"
        buttonText="Ajouter Service"
        onButtonClick={() => {}}
      >
        <InputModal
          title="Ajouter un Service"
          inputFields={inputsAtt}
          onSave={handleSave}
          textButton='Ajouter Service'
        />
      </ItemHeader>

      <div className="container position-center service-section" data-aos="fade-up" data-aos-delay="100">
        <hr />
        <div id="eService">
          <div className="container search-container">
          <div className="row">
              <div className="col">
                <select
                  className="form-select"
                  name="choixRecherche"
                  id="rech_par"
                  aria-label="Default select example"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="" disabled selected>Recherche par</option>
                  <option value="Categorie">Categorie</option>
                  <option value="Libelle">Libelle</option>
                  <option value="PU">PU</option>
                  <option value="Remise">Remise</option>
                </select>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    type="search"
                    id="rechValue"
                    name="rechercher"
                    className="form-control rounded"
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    aria-describedby="search-addon" />
                  <button
                    onClick={() => { handleSearch() }}
                    className="btn custom-btn btn-outline-primary">Rechercher</button>
                </div>
              </div>
            </div>
          </div>
          <GenericTable
            data={serviceList}
            columns={columns}
            inputFields={inputsAtt}
            onEdit={handleEdit}
            onDelete={deleteService}
            fetchById={fetchServiceById}
          />
          <Pagination
            onPageChange={fetchServiceList}
          />
        </div>
      </div>
    </MainCmp>
  );
};

export default ListeServices;



