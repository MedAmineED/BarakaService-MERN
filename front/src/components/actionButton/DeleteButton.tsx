import React, { FC, useState } from 'react'
import './style.css';
import { Button, Modal } from 'react-bootstrap';


interface DeleteModalProps {
    title: string;
    onDelete: (id : number) => Promise<void>;
    id : number;
}

const DeleteButton : FC<DeleteModalProps> = ({title, onDelete, id}) => {

   const [show, setShow] = useState(false);
   const handleClose = () =>{
         setShow(false);
     };
   const handleShow = () => setShow(true);
   
   
   const handleDelete = async () => {
       
     try {
       if(id) await onDelete(id);
       handleClose();
     }catch(err) {
         console.log(err);
     }
   };
  return (
    <div>
       <button type="button" 
                onClick={()=>{handleShow()}}
                className={`btn action-btn btn-sm btn-danger`}>
           <i className={"bi bi-x-square"}></i>
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
          <Modal.Title className="h5 text-center w-100">{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-2">
        <div className="d-flex justify-content-center">
            <Button variant="outline-secondary " size="sm" onClick={handleClose} className="me-2">
              Annuler
            </Button>
            <Button className='spr-btn' variant="primary" size="sm" onClick={handleDelete}>
              Supprimer
            </Button>
          </div>
        </Modal.Body>
        <Modal.Footer>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DeleteButton
