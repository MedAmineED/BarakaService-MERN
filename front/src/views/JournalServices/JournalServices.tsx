/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactElement, useEffect, useState } from 'react';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import DemandeServiceEntity from '../../entities/DemandeServiceEntity';
import DemandeServiceServices from '../../ApiServices/DemandeServiceService';
import ApiUrls from '../../ApiUrl/ApiUrls';
import Pagination from '../../components/pagination/Pagination';
import { FetchType, InputFieldConfig } from '../../util/types';
import GenericTable from '../../components/table/GenericTable';
import { useNavigate } from 'react-router-dom';
import ServiceEntity from '../../entities/ServiceEntity';
import Article from '../../entities/Article';


interface SeeDeatailsProps {
  id: number | string;
} 

const SeeDetails :FC<SeeDeatailsProps> = ({ id })=> {
  const navigate = useNavigate();

  return <button onClick={()=> {navigate("/baraka/detailsDemandeService", { state: { id }})}} className='btn btn-primary w-100 p-0'>
            <i onClick={()=> {navigate("/baraka/detailsDemandeService", { state: { id }})}} className="bi bi-receipt-cutoff"></i>
        </button>
}


//---Columns of the table -----
interface Column {
  header: string;
  accessor: string;
  defaultValue?: number;
  isInput?: {
    type: string;
    min: number;
    max: string;
  };
  render? : (line?: Column[], dataLine?: ServiceEntity | Article) => ReactElement;
}

const columns = [
  { header: 'Date Demande', accessor: 'date_demande', style : {textAlign: "start"},  },
  { header: 'Matricule', accessor: 'matricule', style : {textAlign: "start"} },
  { header: 'Client', accessor: 'client', style : {textAlign: "start"} },
  { header: 'Employee', accessor: 'employer', style : {textAlign: "start"} },
  { header: 'Payé', accessor: 'payer',  
    render : (clmns: Column[], dataLine: DemandeServiceEntity) : ReactElement=> {
      return dataLine[clmns[4].accessor] == 1? 
                            <div className='text-success'><i className="bi bi-patch-check-fill "></i> Payee</div> 
             : dataLine[clmns[4].accessor] == 2 ?
                            <div className='text-warning'><i className="bi bi-patch-exclamation"></i> Partiel</div>         
                : <div className='text-danger'><i className="bi bi-patch-minus-fill"></i> Impayé</div>
  } },
  { header: 'Montant TTC', accessor: 'prix_ttc', style : {textAlign: "end"}, isFixed : true, unit : "DT" },
  { header: 'Marque', accessor: 'marque', style : {textAlign: "start"} },
  { header: 'Details', accessor: '', 
    render : (clmns: Column[], dataLine: DemandeServiceEntity)=>{ 
      if(dataLine.id_dem)
      return <SeeDetails id={dataLine.id_dem}/>;
      return null;
    }}
];


//--- Data lines of table -----
const inputFields: InputFieldConfig[] = [
  { controlId: 'matricule', label: 'Matricule', type: 'text', placeholder: 'Matricule', col: "col-6" },
  { controlId: 'employer', label: 'Employeur', type: 'text', placeholder: 'Employeur', col: "col-6" },
  { controlId: 'client', label: 'Client', type: 'text', placeholder: 'Client', col: "col-6" },
  { controlId: 'payer', label: 'Payé', type: 'number', placeholder: 'Payé', col: "col-6",},
  { controlId: 'marque', label: 'Marque', type: 'text', placeholder: 'Marque', col: "col-6" },
];



//------------------------------------------------
//---- Component --------------------------------
//------------------------------------------------
const JournalService: FC = () => {
  const [demandeList, setDemandeList] = useState<DemandeServiceEntity[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const fetchDemandeList = async (start?: number, rowCpt?: number): Promise<FetchType> => {
    try {
      const response = await DemandeServiceServices.GetListDemandeService(`${ApiUrls.DEMANDE_SERVICE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`);
      setDemandeList(() : DemandeServiceEntity[] => {
        return response.demandeServiceList.map((dmn)=> {
          return {...dmn, date_demande: new Date(dmn.date_demande).toLocaleDateString('en-US') }
        })
      });

      return { totalCount: response.totalCount, pageCount: rowCpt ? Math.round(response.totalCount / rowCpt) : 0 };
    } catch (err) {
      console.log("Error fetching data:", err);
      return {
        totalCount: 0,
        pageCount: 0
      };
    }
  };

  const fetchDemandeById = async (id: number): Promise<DemandeServiceEntity | null> => {
    try {
      const response = await DemandeServiceServices.GetDemandeServiceById(ApiUrls.DEMANDE_SERVICE, id);
      return response;
    } catch (err) {
      console.log("Error fetching data:", err);
      return null;
    }
  };

  const handleSearch = async () => {
    await fetchDemandeList();
  };


  useEffect(() => {
    fetchDemandeList(0, 50);
  }, []);

  return (
    <MainCmp>
      <ItemHeader
        title="Journal de Service"
        buttonText="Ajouter Demande"
        onButtonClick={() => {}}
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
                  <option value="Matricule">Matricule</option>
                  <option value="Conducteur">Conducteur</option>
                  <option value="Client">Client</option>
                  <option value="Bon_Commande">Bon Commande</option>
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
            data={demandeList.reverse()}
            columns={columns}
            inputFields={inputFields}
            fetchById={fetchDemandeById}
          />
          <Pagination
            onPageChange={fetchDemandeList}
          />
        </div>
      </div>
    </MainCmp>
  );
};

export default JournalService;