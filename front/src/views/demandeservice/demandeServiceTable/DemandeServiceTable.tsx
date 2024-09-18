/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useContext, useEffect } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { SelectedItmsContext } from '../../../contexts/Contexts';
import LigneDemande from 'src/entities/LigneDemande';

interface Column {
  header: string;
  accessor: string;
}

const columns : Column[] = [
  { header: 'libelle', accessor: 'designation' },
  { header: 'prix unitaire', accessor: 'prix' },
  { header: 'quantite', accessor: 'quantite' },
  { header: 'prix HT', accessor: 'prix' },
  { header: 'remise U', accessor: 'remise' },
  { header: 'tax', accessor: 'tax' },
  { header: 'tax total', accessor: 'tax_total' },
  { header: 'prix TTC', accessor: 'prix_TTC' },
];

interface DemandeServiceTableProps {
  getPrixTTC : (ttc : number)=> void
}

const DemandeServiceTable: FC<DemandeServiceTableProps> = ({
  getPrixTTC
}) => {
  const context = useContext(SelectedItmsContext);
  const { ligneDemandeListe, removeItemSelect, removeItemSelectXbutton } = context;
  // Calculate totals
  const totals = {
    montant_HT: 0,
    remise_total: 0,
    montant_TVA: 0,
    montant_TTC: 0,
  };

  const onDelete = (item: LigneDemande) => {
    console.log(item)
    removeItemSelectXbutton(item);
    getPrixTTC(totals.montant_TTC);
  };

  useEffect(()=> {
    getPrixTTC(totals.montant_TTC);
  }, [ligneDemandeListe])

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
            {ligneDemandeListe.map((item, rowIndex) => (
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