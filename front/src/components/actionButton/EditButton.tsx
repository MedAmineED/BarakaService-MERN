/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import { Modal, Button, Form, InputGroup } from 'react-bootstrap';
import './style.css'; // We'll create this CSS file for custom styles
import { InputFieldConfig } from 'src/util/types';



interface InputModalProps {
  title: string;
  inputFields: InputFieldConfig[];
  onSave: (id : number, formData: { [key: string]: any }) => Promise<void>;
  id? : number;
  fetchById?: (id: number) => Promise<{ [key: string]: any }>;
}



const EditButton : FC<InputModalProps> = ({ title, inputFields, onSave, id, fetchById }) => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState<{ [key: string]: any }>({});

  useEffect(()=> {
    if (id && fetchById) {
      fetchById(id).then((data) => {
        setFormData(data);
      }).catch(err => {
        console.error("Error fetching data: ", err);
      });
    }
  },[show])

  const handleClose = () =>{
        setShow(false);
        resetFormData();
    };
    const handleShow = () => setShow(true);
    const resetFormData = () => {
    const newFormData: { [key: string]: any } = {};
  
    for (const key in formData) {
      if (Object.prototype.hasOwnProperty.call(formData, key)) {
        // Determine the type of the value and set default
        if (typeof formData[key] === 'number') {
          newFormData[key] = 0; // Set numeric values to 0
        } else {
          newFormData[key] = ''; // Set other types to empty string
        }
      }
    }
    setFormData(newFormData);
  };


  const handleChange = (controlId: string, value: any) => {
    console.log("from handle change ",formData);
    setFormData((prev) => ({ ...prev, [controlId]: value }));
  };

  const handleSave = async () => {
    console.log(formData);
    try {
      if(id) await onSave(id, formData);
      console.log(formData)
      handleClose();
    }catch(err) {
        console.log(err);
    }
  };

  return (
    <div>
       <button type="button" 
                onClick={()=>{handleShow()}} 
                className={`btn action-btn btn-sm btn-primary`}>
           <i className="bi bi-pencil-square"></i>
       </button>
       <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className="compact-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
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
                          <option value="">{field.placeholder}</option>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" size="sm" onClick={handleClose}>
            Fermer
          </Button>
          <Button variant="primary" size="sm" onClick={handleSave}>
            Enregistrer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default EditButton
