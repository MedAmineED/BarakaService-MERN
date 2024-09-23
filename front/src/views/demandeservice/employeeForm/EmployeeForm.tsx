import React, { FC, useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import EmployeeServices from '../../../ApiServices/EmployeeServices';
import ApiUrls from '../../../ApiUrl/ApiUrls';
import Employee from './../../../entities/Employee';

interface EmployeeFormProps {
  formData: {
    employer: string;
    heure_deb: string;
    heure_fin: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

const EmployeeForm: FC<EmployeeFormProps> = ({ formData, handleChange, errors }) => {
  //employee state emloyee setEmploye 
  const [employee, setEmployee] = useState<Employee[] | []>([]);

  //employee state heure_fin setHeureFin
  const fetchEmployee = async (): Promise<void> => {
    try {
      const response = await EmployeeServices.GetListEmployee(`${ApiUrls.EMPLOYEE}`);
      setEmployee(response.employeeList);
    } catch (err) {
      console.log("Error fetching data :", err);
    }
  };

  useEffect(() =>{
    fetchEmployee();
  },[])
  return <div className="section">
            <div className="section-title inputs-sec-title"></div>
            <div className="inline-inputs">
              <Form.Group controlId="employer" className="mb-2 input-container">
                <Form.Label>Employé</Form.Label>
                <Form.Control
                  as="select" // Change from 'type="text"' to 'as="select"'
                  size="sm"
                  value={formData.employer}
                  onChange={handleChange}
                  isInvalid={!!errors.employer}
                >
                  <option value="" disabled>Sélectionner un Employé</option> {/* Default option */}
                  {
                    employee.map((emp: Employee) => (
                      <option key={emp.id} value={emp.nom}>{emp.nom}</option>
                    ))
                  }
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.employer}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="heure_deb" className="mb-2 input-container">
                <Form.Label>Heure Début</Form.Label>
                <Form.Control
                  type="time"
                  size="sm"
                  value={formData.heure_deb}
                  onChange={handleChange}
                  isInvalid={!!errors.heure_deb}
                />
                <Form.Control.Feedback type="invalid">{errors.heure_deb}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="heure_fin" className="mb-2 input-container">
                <Form.Label>Heure Fin</Form.Label>
                <Form.Control
                  type="time"
                  size="sm"
                  placeholder="Saisir Heure Fin"
                  value={formData.heure_fin}
                  onChange={handleChange}
                  isInvalid={!!errors.heure_fin}
                />
                <Form.Control.Feedback type="invalid">{errors.heure_fin}</Form.Control.Feedback>
              </Form.Group>
            </div>
          </div>
};

export default EmployeeForm;
