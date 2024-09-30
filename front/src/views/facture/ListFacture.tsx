/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactElement, useEffect, useState } from 'react';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import Facture from '../../entities/Facture';
import FactureService from '../../ApiServices/FactureService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import Pagination from '../../components/pagination/Pagination';
import { FetchType, InputFieldConfig } from '../../util/types';
import GenericTable from '../../components/table/GenericTable';
import { useNavigate } from 'react-router-dom';
import './listFacture.css'


interface SeeDeatailsProps {
    id?: number | string;
  } 
const SeeDetails :FC<SeeDeatailsProps> = ({ id })=> {
    const navigate = useNavigate();
  
    return <button onClick={()=> {navigate("/editfact", { state: { id }})}} className='btn btn-primary w-100 p-0'>
              <i className="bi bi-receipt-cutoff"></i>
          </button>
  }
  
//---Columns of the table -----
interface Column {
  header: string;
  accessor: string;
  render?: (columns: Column[], dataLine: Facture) => ReactElement;
}

const columns: Column[] = [
  { header: 'Date Facture', accessor: 'date_facture' },
  { header: 'Client', accessor: 'client' },
  { header: 'Numéro Facture', accessor: 'num_fact' },
  { header: 'Montant PHT', accessor: 'pht' },
  { header: 'Taxe', accessor: 'tax' },
  { header: 'Remise Totale', accessor: 'remise_total' },
  { header: 'Prix TTC', accessor: 'prix_ttc' },
  { header: 'Details', accessor: '',
    render : ()=>{ 
        return <SeeDetails/>;
        return null;
      }
  }
];

//--- Data lines of table -----
const inputFields: InputFieldConfig[] = [
  { controlId: 'client', label: 'Client', type: 'text', placeholder: 'Client', col: "col-6" },
  { controlId: 'num_fact', label: 'Numéro Facture', type: 'text', placeholder: 'Numéro Facture', col: "col-6" },
  { controlId: 'pht', label: 'Montant PHT', type: 'number', placeholder: 'Montant PHT', col: "col-6" },
  { controlId: 'tax', label: 'Taxe', type: 'number', placeholder: 'Taxe', col: "col-6" },
  { controlId: 'remise_total', label: 'Remise Totale', type: 'number', placeholder: 'Remise Totale', col: "col-6" },
  { controlId: 'prix_ttc', label: 'Prix TTC', type: 'number', placeholder: 'Prix TTC', col: "col-6" },
];

//------------------------------------------------
//---- Component --------------------------------
//------------------------------------------------
const ListFacture: FC = () => {
  const [factureList, setFactureList] = useState<Facture[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  
  const navigate = useNavigate();

  const fetchFactureList = async (start?: number, rowCpt?: number): Promise<FetchType> => {
    try {
      const response = await FactureService.GetListFacture(`${ApiUrls.FACTURE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`);
      setFactureList(response.factureList.map((facture) => {
        return { ...facture, date_facture: new Date(facture.date_facture).toLocaleDateString('en-US') };
      }));

      return { totalCount: response.totalCount, pageCount: rowCpt ? Math.round(response.totalCount / rowCpt) : 0 };
    } catch (err) {
      console.log("Error fetching data:", err);
      return {
        totalCount: 0,
        pageCount: 0
      };
    }
  };

  const handleSearch = async () => {
    await fetchFactureList();
  };

  useEffect(() => {
    fetchFactureList(0, 50);
    console.log(factureList)
  }, []);

  return (
    <MainCmp>
      <ItemHeader
        title="Liste de Facture"
        buttonText="Ajouter Facture"
        onButtonClick={() => { /* Logic to add a new invoice */ }}
      />
      
      <div className="container position-center demande-section" data-aos="fade-up" data-aos-delay="100">
        <hr />
        <div id="eDemande">
          <div className="container search-container">
            <div className="row">
              <div className="col">
                <select
                  className="form-select"
                  name="choixRecherche"
                  id="rech_par"
                  aria-label="Default select example"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="" disabled selected>Recherche par</option>
                  <option value="Client">Client</option>
                  <option value="Numéro Facture">Numéro Facture</option>
                </select>
              </div>
              <div className="col-6">
                <div className="input-group">
                  <input
                    onChange={(e) => setSearchValue(e.target.value)}
                    value={searchValue}
                    type="search"
                    id="rechValue"
                    name="rechercher"
                    className="form-control rounded"
                    placeholder="Rechercher"
                    aria-label="Rechercher"
                    aria-describedby="search-addon" />
                  <button
                    onClick={() => { handleSearch() }}
                    className="btn custom-btn btn-outline-primary">Rechercher</button>
                </div>
              </div>
            </div>
          </div>
          <GenericTable
            data={factureList.reverse()}
            columns={columns}
            inputFields={inputFields}
          />
          <Pagination
            onPageChange={fetchFactureList}
          />
        </div>
      </div>
    </MainCmp>
  );
};

export default ListFacture;
