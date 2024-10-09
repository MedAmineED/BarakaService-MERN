/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import Employee from '../../entities/Employee';
import EmployeeServices from '../../ApiServices/EmployeeServices';
import ApiUrls from '../../ApiUrl/ApiUrls';
import Pagination from '../../components/pagination/Pagination';

import InputModal from '../../components/InputModal/InputModal'; 
import { FetchType, InputFieldConfig } from 'src/util/types';
import GenericTable from '../../components/table/GenericTable';

const columns = [
  { header: 'CIN', accessor: 'cin', style : { textAlign: "start" } },
  { header: 'Nom', accessor: 'nom', style : { textAlign: "start" } },
  { header: 'Date de Recrutement', accessor: 'recrutement',  style : { textAlign: "start" },
    render: (undefined, item: Employee) => {
    const formatDate = (item.recrutement + "").split('T')[0];
      return <span style = { {textAlign : "start"} }>{formatDate}</span>;
    },
   },
  { header: 'Mobile', accessor: 'mobile',  style : { textAlign: "start" }},
  { header: 'Salaire', accessor: 'salaire',  style : { textAlign: "end" }, isFixed : true },
];

const inputFields: InputFieldConfig[] = [
  { controlId: 'cin', label: 'CIN', type: 'text', placeholder: 'CIN', col: "col-6" },
  { controlId: 'nom', label: 'Nom', type: 'text', placeholder: 'Nom', col: "col-6" },
  { controlId: 'recrutement', label: 'Recrutement', type: 'date', placeholder: 'Recrutement', col: "col-6" },
  { controlId: 'mobile', label: 'Mobile', type: 'text', placeholder: 'Mobile', col: "col-6" },
  { controlId: 'salaire', label: 'Salaire', type: 'number', placeholder: 'Salaire', col: "col-6" },
];

const EmployeeList: FC = () => {
  const [employeeList, setEmployeeList] = useState<Employee[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const fetchEmployeeList = async (start?: number, rowCpt?: number): Promise<FetchType> => {
    try {
      const response = await EmployeeServices.GetListEmployee(`${ApiUrls.EMPLOYEE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`);
      setEmployeeList(response.employeeList);

      return { totalCount: response.totalCount, pageCount: rowCpt ? Math.round(response.totalCount / rowCpt) : 0 };
    } catch (err) {
      console.log("Error fetching data:", err);
      return {
        totalCount: 0,
        pageCount: 0
      };
    }
  };

  const fetchEmployeeById = async (id: number): Promise<Employee | []> => {
    try {
      const response = await EmployeeServices.GetEmployeeById(ApiUrls.EMPLOYEE, id);
      return response;
    } catch (err) {
      console.log("Error fetching data:", err);
      return [];
    }
  };

  const handleSearch = async () => {
    await fetchEmployeeList();
  };

  const validateEmployee = (employee: Employee): string | null => {
    if (typeof employee.nom !== "string" || employee.nom.trim() === "") {
      return "Nom must be a non-empty string.";
    }

    const salaire = Number(employee.salaire);
    if (isNaN(salaire) || salaire < 0) {
      return "Salaire must be a non-negative number.";
    }



    return null;
  };

  const editEmployee = async (id: number, employee: Employee): Promise<void> => {
    const validationError = validateEmployee(employee);
    try {
      if (validationError) {
        throw new Error(validationError);
      }
      await EmployeeServices.UpdateEmployee(ApiUrls.EMPLOYEE, id, employee);
      await fetchEmployeeList(0, 50);
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const handleEdit = async (id: number, formData: Employee | { [key: string]: any }) => {
    const numericData: Employee | { [key: string]: any } = {
      ...formData,
      salaire: parseFloat(formData.salaire),
      specialite: parseInt(formData.specialite),
    };
    try {
      await editEmployee(id, numericData as Employee);
      await fetchEmployeeList(0, 50);
    } catch (error) {
      console.error("Error editing employee:", error);
    }
  };

  const addEmployee = async (employee: Employee): Promise<void> => {
    const validationError = validateEmployee(employee);
    try {
      if (validationError) {
        console.log("Validation Error:", validationError);
        throw new Error(validationError);
      }
      await EmployeeServices.AddEmployee(ApiUrls.EMPLOYEE, employee);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const handleSave = async (formData: Employee | { [key: string]: any }) => {
    const numericData: Employee | { [key: string]: any } = {
      ...formData,
      salaire: parseFloat(formData.salaire),
      specialite: parseInt(formData.specialite),
    };
    try {
      await addEmployee(numericData as Employee);
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };


  const deleteEmployee = async (id: number): Promise<void> => {
    try {
      await EmployeeServices.DeleteEmployee(ApiUrls.EMPLOYEE, id);
      await fetchEmployeeList(0, 50);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  useEffect(() => {
    fetchEmployeeList(0, 50);
  }, []);

  return (
    <MainCmp>
      <ItemHeader
        title="Liste des Employés"
        buttonText="Ajouter Employé"
        onButtonClick={() => {}}
      >
        <InputModal 
          title="Ajouter un Employé"
          inputFields={inputFields}
          onSave={handleSave}
          textButton='Ajouter Employé'
        />
      </ItemHeader>

      <div className="container position-center employee-section" data-aos="fade-up" data-aos-delay="100">
        <hr />
        <div id="eEmployee">
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
                  <option value="CIN">CIN</option>
                  <option value="Nom">Nom</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Salaire">Salaire</option>
                  <option value="Specialité">Spécialité</option>
                  <option value="État">État</option>
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
            data={employeeList}
            columns={columns}
            inputFields={inputFields}
            onEdit={handleEdit}
            onDelete={deleteEmployee}
            fetchById={fetchEmployeeById}
          />
          <Pagination
            onPageChange={fetchEmployeeList}
          />
        </div>
      </div>
    </MainCmp>
  );
};

export default EmployeeList;
