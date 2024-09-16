import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './style.css';

interface CustomModalProps {
  title: string;
  onSave: () => Promise<void> | void;
  textButton: string;
  children: React.ReactNode;
  onClose?: ()=>void;
  className? : string
}

const CustomModal: React.FC<CustomModalProps> = ({ title, onSave, textButton, children, onClose, className }) => {
  const [show, setShow] = useState(false);

  const handleClose = () =>{
    if(onClose){
        onClose();
    }
     setShow(false)
    };
  const handleShow = () => setShow(true);

  const handleSave = async () => {
    try {
      await onSave();
      setShow(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Button className='btn btn-primary custom-btn add-btn' onClick={handleShow}>
        {textButton}
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        centered
        className={`compact-modal ${className? className : ""}`}
      >
        <Modal.Header closeButton>
          <Modal.Title className="h5">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2" style={{ maxHeight: '70vh', overflowY: 'auto' }}>
          {children}
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
  );
};

export default CustomModal;
