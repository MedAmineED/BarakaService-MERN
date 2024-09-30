/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericTable from '../table/GenericTable'
import React, { FC, useEffect, useState, useMemo, useCallback, ReactElement, ChangeEvent } from 'react'
import CustomModal from '../customModal/CustomModal'
import { FetchType } from '../../util/types';
import ServiceEntity from '../../entities/ServiceEntity';
import ServicesServices from '../../ApiServices/ServicesServices';
import ApiUrls from '../../ApiUrl/ApiUrls';
import Pagination from '../pagination/Pagination';
import Article from '../../entities/Article';
import CustomCheckbox from '../../views/demandeservice/customCheckBox/CustomCheckbox';
import TableInput from '../../views/demandeservice/tableInput/TableInput';
import CustomCheckBoxFacture from '../../views/facture/customCheckBoxFacture/CustomCheckBoxFacture';
// import { Checkbox } from 'react-bootstrap';

type Item = ServiceEntity | Article;


//---type of Column of the table -----
interface Column {
  header: string;
  accessor: string;
  defaultValue?: number;
  isInput?: {
    type: string;
    min: number;
    max: string;
  };
  render? : (line?: Column[], dataLine?: Item) => ReactElement;
}


//----------------------------------------------------------------
//---- Principle Component ----
//----------------------------------------------------------------
//---- propos of the principle component ----
interface SrvModalProps {
  selectedServices: ServiceEntity[];
  cmpType: string;  // Component type : if facture it will use checkBox of facture if demande it will use checkBox of demande
  onSaveItems: () => void;
  resetData: () => void;
}



//---- modal component ----
const ServiceListModal: FC<SrvModalProps> = ({ onSaveItems, selectedServices, resetData, cmpType }) => {
  const [serviceList, setServiceList] = useState<ServiceEntity[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');



  const handleSearch = async () => {
    await fetchServiceList();
  };

  const fetchServiceList = useCallback(async (start?: number, rowCpt?: number): Promise<FetchType> => {
    try {
      const response = await ServicesServices.GetListService(`${ApiUrls.SERVICE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`);
      setServiceList(response.serviceList);

      return { totalCount: response.totalCount, pageCount: rowCpt ? Math.round(response.totalCount / rowCpt) : 0 };
    } catch (err) {
      console.log("Error fetching data:", err);
      return {
        totalCount: 0,
        pageCount: 0
      };
    }
  }, [searchBy, searchValue]);

  useEffect(() => {
    fetchServiceList(0, 50);
  }, [fetchServiceList]);


  const columns = [
    {
      header: '',
      accessor: '',
      render: (clm: Column[], item: ServiceEntity | Article) => {
        return cmpType == "demande"? <CustomCheckbox item={item} /> : <CustomCheckBoxFacture item={item} />;
      }, 
    },
    { header: 'Libelle', accessor: 'libelle' },
    { header: 'Prix', accessor: 'pu' }, 
    { 
      header: 'Remise', 
      accessor: 'remise',
      render: (clm: Column[], item: ServiceEntity | Article) =>{
        return cmpType == "demande"? <TableInput item={item} attribute='remise'/> : null;
      }
    },
  ];

  return (
    <CustomModal
      className='special-modal'
      onSave={() => { onSaveItems() }}
      textButton='liste des services'
      title='liste des services'
      onClose={resetData}
    >
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
              <option value="" disabled>Recherche par</option>
              <option value="Categorie">Categorie</option>
              <option value="Libelle">Libelle</option>
              <option value="PU">PU</option>
              <option value="Remise">Remise</option>
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
                onClick={handleSearch}
                className="btn custom-btn btn-outline-primary">Rechercher</button>
            </div>
          </div>
        </div>
      </div>
      <GenericTable
        data={serviceList}
        columns={columns}
        selectedItems={selectedServices}
      />
      <Pagination
        onPageChange={fetchServiceList}
      />
    </CustomModal>
  )
}

export default ServiceListModal;
