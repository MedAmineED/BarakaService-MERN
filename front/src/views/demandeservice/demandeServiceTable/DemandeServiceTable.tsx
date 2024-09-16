/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';

interface Column {
  header: string;
  accessor: string;
}


interface DemandeServiceTableProps {
  data: { [key: string]: any; }[];
  columns: Column[];
  srv: any;
  onDelete: (item : number) => void;
  getPrixTTC : (ttc : number)=> void
}

const DemandeServiceTable: FC<DemandeServiceTableProps> = ({ 
  data, 
  columns, 
  onDelete,
  getPrixTTC
}) => {
  // Calculate totals
  const totals = {
    montant_HT: data.reduce((sum, item) => sum + (item.prix_HT || 0), 0),
    remise_total: data.reduce((sum, item) => sum + (item.remise_U || 0), 0),
    montant_TVA: data.reduce((sum, item) => sum + (item.tax_total || 0), 0),
    montant_TTC: data.reduce((sum, item) => sum + (item.prix_TTC || 0), 0),
  };

  useEffect(()=> {
    getPrixTTC(totals.montant_TTC);
  }, [data])

  return (
    <div className="table-demande-service">
      <div className="table-responsive">
        <Table striped bordered hover size="sm">
          <thead>
            <tr>
              <th></th>
              {columns.map((column, index) => (
                <th key={index} className="text-center">{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, rowIndex) => (
              <tr key={item.id || rowIndex}>
                <td className="text-center">
                  <i onClick={() => onDelete(item)} className="bi bi-x-circle text-danger" style={{ cursor: 'pointer' }}></i>
                </td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} className="text-center">{item[column.accessor]}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Row className="mt-3">
        <Col xs={12} md={6}></Col>
        <Col xs={12} md={6}>
          <div className="table-footer">
            <div className="footer-item">
              <span className="footer-title">Montant HT :</span>
              <span className="footer-value">{totals.montant_HT.toFixed(2)} DT</span>
            </div>
            <div className="footer-item remise">
              <span className="footer-title">Remise totale :</span>
              <span className="footer-value">{totals.remise_total.toFixed(2)} DT</span>
            </div>
            <div className="footer-item">
              <span className="footer-title">Montant TVA :</span>
              <span className="footer-value">{totals.montant_TVA.toFixed(2)} DT</span>
            </div>
            <div className="footer-item ttc">
              <span className="footer-title">Montant TTC :</span>
              <span className="footer-value">{totals.montant_TTC.toFixed(2)} DT</span>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default DemandeServiceTable;