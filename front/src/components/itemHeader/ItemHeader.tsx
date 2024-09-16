import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css'

interface ItemHeaderProps {
  title: string;
  buttonText: string;
  onButtonClick: () => void;
  children?: React.ReactNode;
}

const ItemHeader: React.FC<ItemHeaderProps> = ({ title, children }) => {
  return (
    <div className="row w-100">
      <div className="col-6 d-flex w-100 justify-content-between">
        <label id="SousTitre">{title}</label>
        {children}
      </div>
    </div>
  );
};

export default ItemHeader;
