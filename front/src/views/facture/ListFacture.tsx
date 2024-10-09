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
import './listFacture.css';
import { Button } from 'react-bootstrap';

interface SeeDeatailsProps {
  id?: number | string;
}
const SeeDetails: FC<SeeDeatailsProps> = ({ id }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => { navigate("/showfact", { state: { id, mode: "show" } }) }} className='btn btn-primary w-100 p-0'>
      <i className="bi bi-receipt-cutoff"></i>
    </button>
  );
};

interface Column {
  header: string;
  accessor: string;
  render?: (columns: Column[], dataLine: Facture) => ReactElement;
  style?: React.CSSProperties;
  unit?: string;
  isFixed?: boolean;
}

const columns: Column[] = [
  { header: 'Date Facture', accessor: 'date_facture', style: { textAlign: "start" } },
  { header: 'Client', accessor: 'client', style: { textAlign: "start" } },
  { header: 'Numéro Facture', accessor: 'num_fact', style: { textAlign: "start" } },
  { header: 'Montant PHT', accessor: 'pht', style: { textAlign: "end" }, unit: "DT", isFixed: true },
  { header: 'TVA', accessor: 'tax', style: { textAlign: "end" }, unit: "DT", isFixed: true },
  { header: 'Remise Totale', accessor: 'remise_total', style: { textAlign: "end" }, unit: "DT", isFixed: true },
  { header: 'Prix TTC', accessor: 'prix_ttc', style: { textAlign: "end" }, unit: "DT", isFixed: true },
  {
    header: 'Details', accessor: '',
    render: (col: Column, item: Facture) => {
      return <SeeDetails id={item.id_fact} />;
    }
  }
];

const inputFields: InputFieldConfig[] = [
  { controlId: 'client', label: 'Client', type: 'text', placeholder: 'Client', col: "col-6" },
  { controlId: 'num_fact', label: 'Numéro Facture', type: 'text', placeholder: 'Numéro Facture', col: "col-6" },
  { controlId: 'pht', label: 'Montant PHT', type: 'number', placeholder: 'Montant PHT', col: "col-6" },
  { controlId: 'tax', label: 'Taxe', type: 'number', placeholder: 'Taxe', col: "col-6" },
  { controlId: 'remise_total', label: 'Remise Totale', type: 'number', placeholder: 'Remise Totale', col: "col-6" },
  { controlId: 'prix_ttc', label: 'Prix TTC', type: 'number', placeholder: 'Prix TTC', col: "col-6" },
];

const ListFacture: FC = () => {
  const [factureList, setFactureList] = useState<Facture[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string | Date>('');
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [dateOption, setDateOption] = useState<string >("date");

  const navigate = useNavigate();
  
  const handleCahngeDateOption = (e: React.ChangeEvent<HTMLSelectElement>)=> {
    setDateOption(e.target.value);
    if(e.target.value === "date"){
      setEndDate(null);
    }
  }

  const handleEndDate = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setEndDate(e.target.value);
  }
  const handleStartDate = (e: React.ChangeEvent<HTMLInputElement>)=> {
    setStartDate(e.target.value);
  }

  const fetchFactureList = async (start?: number, rowCpt?: number): Promise<FetchType> => {
    try {
      let url = `${ApiUrls.FACTURE}?searchBy=${searchBy}&start=${start}&rowCpt=${rowCpt}`;

      if (searchBy === 'num_fact' && searchValue) {
        url += `&searchValue=${searchValue}`;
      } else if (searchBy === 'date_facture') {
        if (startDate) url += `&startDate=${startDate}`;
        if (endDate){
           url += `&endDate=${endDate}`;
        }
      }

      const response = await FactureService.GetListFacture(url);

      setFactureList(response.factureList.reverse().map((facture: Facture) => {
        const formatDate = (facture.date_facture + "").split("T")[0].split("-").reverse().join("/");
        return { ...facture, date_facture: formatDate };
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



  const navigateToCreateFact = async (id: number) => {
    navigate('/creerfact', { state: { id, mode: "create" } });
  };

  const handleSearch = async () => {
    await fetchFactureList();
  };

  useEffect(() => {
    fetchFactureList(0, 50);
  }, []);

  return (
    <MainCmp>
      <ItemHeader
        title="Liste de Facture"
        buttonText="Ajouter Facture"
        onButtonClick={() => { navigateToCreateFact() }}
      >
        <Button className="btn custom-btn btn-outline-primary" title='Ajouter Facture' onClick={() => { navigateToCreateFact() }}>
          Creation de Facture
        </Button>
      </ItemHeader>

      <div className="container position-center demande-section" data-aos="fade-up" data-aos-delay="100">
        <hr />
        <div id="eDemande">
          <div className="container search-container">
            <div className="row">
              <div className="col-4">
                <select
                  className="form-select"
                  name="choixRecherche"
                  id="rech_par"
                  aria-label="Default select example"
                  value={searchBy}
                  onChange={(e) => setSearchBy(e.target.value)}
                >
                  <option value="" disabled selected>Recherche par</option>
                  <option value="date_facture">Date Facture</option>
                  <option value="num_fact">Numéro Facture</option>
                </select>
              </div>
              <div className="col-8">
                <div className="input-group w-100">
                  {searchBy === "date_facture" ?
                    <div className='d-flex gap-2'>
                      <div className='d-flex gap-2 align-items-center'>
                        <label></label>
                        <select
                          value = {dateOption}
                          onChange= {(e)=> {handleCahngeDateOption(e)}}
                          style={{
                            width: '80px'
                          }}
                          id="dateOptionID"
                          className="form-control rounded"
                        >
                          <option value="date">Date</option>
                          <option value="plage">Plage</option>
                        </select>
                      </div>
                      <div  className='d-flex gap-2 align-items-center'>
                        <label>De</label>
                        <input
                          onChange={(e) => handleStartDate(e)}
                          value={startDate || ''}
                          type="date"
                          id="startDate"
                          className="form-control rounded"
                        />
                      </div>
                      {dateOption == "plage"? <div className='d-flex gap-2 align-items-center'>
                        <label>à</label>
                        <input
                          onChange={(e) => handleEndDate(e)}
                          value={endDate || ''}
                          type="date"
                          id="endDate"
                          className="form-control rounded"
                        />
                      </div>
                      : ""
                      }
                    </div>
                    :
                    <input
                      onChange={(e) => setSearchValue(e.target.value)}
                      value={searchValue as string}
                      type="search"
                      id="rechValue"
                      name="rechercher"
                      className="form-control rounded"
                      placeholder="Rechercher"
                      aria-label="Rechercher"
                      aria-describedby="search-addon"
                    />
                  }
                  <button
                    onClick={() => { handleSearch() }}
                    className="btn custom-btn btn-outline-primary">Rechercher</button>
                </div>
              </div>
            </div>
          </div>
          <GenericTable
            data={factureList}
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
