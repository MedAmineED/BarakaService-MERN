import React, { FC } from 'react';
import { Form } from 'react-bootstrap';

interface ClientFormProps {
  formData: {
    client: string;
    bon_commande: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  errors: Record<string, string>;
}

const ClientForm: FC<ClientFormProps> = ({ formData, handleChange, errors }) => ( 
  <div className="section">
    <div className="section-title inputs-sec-title"></div>
    <div className="inline-inputs">
      <Form.Group controlId="client" className="mb-2 input-container">
        <Form.Label>Nom du Client</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Saisir Nom du Client"
          value={formData.client}
          onChange={handleChange}
          isInvalid={!!errors.client}
        />
        <Form.Control.Feedback type="invalid">{errors.client}</Form.Control.Feedback>
      </Form.Group>
      <Form.Group controlId="bon_commande" className="mb-2 input-container">
        <Form.Label>N° Bon de Commande</Form.Label>
        <Form.Control
          type="text"
          size="sm"
          placeholder="Saisir N° Bon de Commande"
          value={formData.bon_commande}
          onChange={handleChange}
          isInvalid={!!errors.bon_commande}
        />
        <Form.Control.Feedback type="invalid">{errors.bon_commande}</Form.Control.Feedback>
      </Form.Group>
    </div>
  </div>
);

export default ClientForm;
