/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericTable from '../../../components/table/GenericTable'
import React, { FC, useEffect, useState, useMemo, useCallback } from 'react'
import CustomModal from '../../../components/customModal/CustomModal'
import { FetchType } from '../../../util/types';
import ServiceEntity from '../../../entities/ServiceEntity';
import ServicesServices from '../../../ApiServices/ServicesServices';
import ApiUrls from '../../../ApiUrl/ApiUrls';
import Pagination from '../../../components/pagination/Pagination';

const columns = [
  { header: 'Libelle', accessor: 'libelle' },
  { header: 'Prix', accessor: 'pu' },
  { header: 'Remise', accessor: 'remise' , isInput : {
                                                  type : "number",
                                                  min : 0,
                                                  max : 'pu'
                                                }
  },
];

interface SrvModalProps {
  checkAction: (check: boolean, service: ServiceEntity) => void;
  onSaveItems: () => void;
  selectedServices: ServiceEntity[];
  resetData: () => void;
}

const ServiceListModal: FC<SrvModalProps> = ({ checkAction, onSaveItems, selectedServices, resetData }) => {
  const [serviceList, setServiceList] = useState<ServiceEntity[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  console.log("modale service");

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

  const memoizedColumns = useMemo(() => columns, []);

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
        columns={memoizedColumns}
        onCheckedItemsChange={checkAction}
        selectedItems={selectedServices}
      />
      <Pagination
        onPageChange={fetchServiceList}
      />
    </CustomModal>
  )
}

export default ServiceListModal;
