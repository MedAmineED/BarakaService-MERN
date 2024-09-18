import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

interface VehiculeFormProps {
  formData: {
    matricule: string;
    marque: string;
    conducteur: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

const VehiculeForm: FC<VehiculeFormProps> = ({ formData, handleChange, errors }) => (
  <div className="section">
    <div className="section-title inputs-sec-title">Véhicule</div>
    <div className="inline-inputs">
      <Form.Group controlId="matricule" className="mb-2 input-container">
        <Form.Label>Matricule</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Saisir Matricule"
          value={formData.matricule}
          onChange={handleChange}
          isInvalid={!!errors.matricule}
        />
        <Form.Control.Feedback type="invalid">{errors.matricule}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="marque" className="mb-2 input-container">
        <Form.Label>Marque</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Saisir Marque"
          value={formData.marque}
          onChange={handleChange}
          isInvalid={!!errors.marque}
        />
        <Form.Control.Feedback type="invalid">{errors.marque}</Form.Control.Feedback>
      </Form.Group>
    </div>
    <Form.Group controlId="conducteur" className="mb-2">
      <Form.Label>Conducteur</Form.Label>
      <Form.Control
        type="text"
        size="sm"
        placeholder="Saisir Conducteur"
        value={formData.conducteur}
        onChange={handleChange}
        isInvalid={!!errors.conducteur}
      />
      <Form.Control.Feedback type="invalid">{errors.conducteur}</Form.Control.Feedback>
    </Form.Group>
  </div>
);

export default VehiculeForm;
