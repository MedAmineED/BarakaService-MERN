/* eslint-disable @typescript-eslint/no-explicit-any */
import React, {  useState } from 'react';
import { Form, InputGroup } from 'react-bootstrap';
import './style.css'; // We'll create this CSS file for custom styles
import { InputFieldConfig } from 'src/util/types';
import CustomModal from '../../components/customModal/CustomModal';



interface InputModalProps {
  title: string;
  inputFields: InputFieldConfig[];
  onSave: (formData: { [key: string]: any }) => Promise<void>;
  textButton : string;
}

const InputModal: React.FC<InputModalProps> = ({ title, inputFields, onSave, textButton }) => {
  const [formData, setFormData] = useState<{ [key: string]: any }>({});


  const handleChange = (controlId: string, value: any) => {
              console.log("from handle change ",formData);
              setFormData((prev) => ({ ...prev, [controlId]: value }));
  };

  
  const handleSave = async () => {
    console.log(formData);
    try {
        await onSave(formData);
        console.log(formData)
    }catch(err) {
        console.log(err);
    }
  };

  return (
        <CustomModal onSave={handleSave} textButton={textButton} title={title}>
          <Form className="compact-form">
            <div className="row g-1">
              {inputFields.map((field, index) => (
                <React.Fragment key={field.controlId + index}>
                  <div className={field.col ? field.col : "col-4"}>
                    <Form.Group controlId={field.controlId}>
                      <Form.Label>{field.label}</Form.Label>
                      {field.unit ? (
                        <InputGroup>
                          <Form.Control
                            type={field.type}
                            placeholder={field.placeholder}
                            step={field.step}
                            onChange={(e) => handleChange(field.controlId, e.target.value)}
                            value={formData[field.controlId] || ''}
                          />
                          <InputGroup.Text>{field.unit}</InputGroup.Text>
                        </InputGroup>
                      ) : field.type == "select" ? (
                        <select
                          className='form-select'
                          onChange={(e) => handleChange(field.controlId, e.target.value)}
                          value={formData[field.controlId] || ''}
                        >
                          <option disabled value="">{field.placeholder}</option>
                          {field.options && field.options.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      ) :  (
                        <Form.Control
                          type={field.type}
                          placeholder={field.placeholder}
                          step={field.step}
                          onChange={(e) => handleChange(field.controlId, e.target.value)}
                          value={formData[field.controlId] || ''}
                        />
                      )  
                      }
                    </Form.Group>
                  </div>
                  
                </React.Fragment>
              ))}
            </div>
          </Form>
        </CustomModal>
  );
};

export default InputModal;
