/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useContext, useEffect, useState } from 'react';
import { Table, Row, Col } from 'react-bootstrap';
import 'bootstrap-icons/font/bootstrap-icons.css';
import './style.css';
import { SelectedItmsContext } from '../../../contexts/Contexts';
import LigneDemande from '../../../entities/LigneDemande';

interface Column {
  header: string;
  accessor: string;
  style?: React.CSSProperties; 
}

const columns : Column[] = [
  { header: 'libelle', accessor: 'designation', style : {textAlign: "start"}  },
  { header: 'prix unitaire', accessor: 'prix', style : {textAlign: "end"}  },
  { header: 'quantite', accessor: 'quantite', style : {textAlign: "end"}  },
  { header: 'prix HT', accessor: 'prix',  style : {textAlign: "end"} },
  { header: 'remise U', accessor: 'remise',  style : {textAlign: "end"} },
  { header: 'tax', accessor: 'tax',  style : {textAlign: "end"} },
  { header: 'tax total', accessor: 'tax_total',  style : {textAlign: "end"} },
  { header: 'prix TTC', accessor: 'prix_TTC',  style : {textAlign: "end"} },
];

interface DemandeServiceTableProps {
}

const DemandeServiceTable: FC<DemandeServiceTableProps> = () => {
  const context = useContext(SelectedItmsContext);
  const { ligneDemandeListe, removeItemSelect, removeItemSelectXbutton, totals, setTotals } = context;

  const [ligneDemandeFinale, setLigneDemandeFinale] = useState<LigneDemande[] | []>([]);






  const onDelete = (item: LigneDemande) => {
    removeItemSelectXbutton(item);

  };

  useEffect(()=> {
    let ligneDemandeArr: LigneDemande[] | [] = [];
    let montant_HT = 0;
    let remise_total = 0;
    let montant_TVA = 0;
    let montant_TTC = 0;
    ligneDemandeListe.map((lnDmn : LigneDemande)=>{
      //-- calculate tax, tax total and prix ttc, and set all new attr in updated ligne (ligne demande finale)
      const updatedLigneDemande = {...lnDmn};

      const tax = parseFloat((lnDmn.prix * lnDmn.tva / 100).toFixed(3));
      const tax_total = parseFloat((tax * lnDmn.quantite).toFixed(3));
      const prix_TTC = parseFloat(((lnDmn.prix * lnDmn.quantite) + tax_total - (lnDmn.remise * lnDmn.quantite)).toFixed(3));

      updatedLigneDemande.tax = tax;
      updatedLigneDemande.tax_total = tax_total;
      updatedLigneDemande.prix_TTC = prix_TTC;

 

      // -- calcalculations of global totals and set it in their state
      montant_HT += parseFloat((lnDmn.prix * lnDmn.quantite).toFixed(3));
      remise_total += parseFloat((lnDmn.remise * lnDmn.quantite).toFixed(3));
      montant_TVA += parseFloat((updatedLigneDemande.tax_total).toFixed(3));
      montant_TTC += parseFloat((updatedLigneDemande.prix_TTC).toFixed(3));

      setTotals({
        montant_HT,
        remise_total,
        montant_TVA,
        montant_TTC,
      });

      ligneDemandeArr = [updatedLigneDemande, ...ligneDemandeArr];
    })
    setLigneDemandeFinale(ligneDemandeArr);
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
            {ligneDemandeFinale.map((item, rowIndex) => (
              <tr key={item.id || rowIndex}>
                <td className="text-center">
                  <i onClick={() => onDelete(item)} className="bi bi-x-circle text-danger" style={{ cursor: 'pointer' }}></i>
                </td>
                {columns.map((column, colIndex) => (
                  <td key={colIndex} style={column.style}>{item[column.accessor]}</td>
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