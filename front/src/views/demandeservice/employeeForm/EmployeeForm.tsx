import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

interface EmployeeFormProps {
  formData: {
    employer: string;
    heure_deb: string;
    heure_fin: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

const EmployeeForm: FC<EmployeeFormProps> = ({ formData, handleChange, errors }) => (
  <div className="section">
    <div className="section-title inputs-sec-title">Employé</div>
    <div className="inline-inputs">
      <Form.Group controlId="employer" className="mb-2 input-container">
        <Form.Label>Employé</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Saisir Employé"
          value={formData.employer}
          onChange={handleChange}
          isInvalid={!!errors.employer}
        />
        <Form.Control.Feedback type="invalid">{errors.employer}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="heure_deb" className="mb-2 input-container">
        <Form.Label>Heure Début</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Saisir Heure Début"
          value={formData.heure_deb}
          onChange={handleChange}
          isInvalid={!!errors.heure_deb}
        />
        <Form.Control.Feedback type="invalid">{errors.heure_deb}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="heure_fin" className="mb-2 input-container">
        <Form.Label>Heure Fin</Form.Label>
        <Form.Control
          type="text"
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
);

export default EmployeeForm;
