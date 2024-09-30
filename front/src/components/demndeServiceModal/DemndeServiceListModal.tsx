import React, { FC, useEffect, useState, useMemo, useCallback, ReactElement, useContext } from 'react';
import CustomModal from '../customModal/CustomModal';
import GenericTable from '../table/GenericTable';
import Pagination from '../pagination/Pagination';
import DemandeServiceEntity from '../../entities/DemandeServiceEntity';
import DemandeServiceServices from '../../ApiServices/DemandeServiceService'; // Ensure this service exists
import ApiUrls from '../../ApiUrl/ApiUrls';
import CustomCheckBoxFacture from '../../views/facture/customCheckBoxFacture/CustomCheckBoxFacture';
import LigneDemande from '../../entities/LigneDemande';
import { SelectedItmsForFactureContext } from '../../contexts/Contexts';

// Define the type for columns
interface Column {
  header: string;
  accessor: string;
  defaultValue?: number;
  isInput?: {
    type: string;
    min: number;
    max?: string;
  };
  render?: (clm?: Column[], item?: DemandeServiceEntity) => ReactElement;
}

// Props for the modal component
interface DemandeServiceModalProps {
  selectedServices: DemandeServiceEntity[];
  onSaveItems: () => void;
  resetData: () => void;
}

// Modal component for displaying `DemandeService` records
const DemandeServiceListModal: FC<DemandeServiceModalProps> = ({
  onSaveItems,
  selectedServices,
}) => {
  const context = useContext(SelectedItmsForFactureContext);
  const  { transformFromItemToLigneFacture, handleItemSelect } = context;
  const [serviceList, setServiceList] = useState<DemandeServiceEntity[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  const handleSearch = async () => {
    await fetchServiceList();
  };

  // Fetch services list with useCallback to avoid unnecessary re-renders
  const fetchServiceList = useCallback(async (start?: number, rowCpt?: number) => {
    try {
      const response = await DemandeServiceServices.GetListDemandeService(
        `${ApiUrls.DEMANDE_SERVICE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`
      );
      setServiceList(response.demandeServiceList);

      return {
        totalCount: response.totalCount,
        pageCount: rowCpt ? Math.round(response.totalCount / rowCpt) : 0,
      };
    } catch (err) {
      console.log('Error fetching data:', err);
      return {
        totalCount: 0,
        pageCount: 0,
      };
    }
  }, [searchBy, searchValue]);

  const onRowClick = (item : LigneDemande)=> {
    handleItemSelect(item);
    transformFromItemToLigneFacture(item);
  }





  // Define columns for the `DemandeService` table
  const columns: Column[] = [
    { header: 'Matricule', accessor: 'matricule' },
    { header: 'Conducteur', accessor: 'conducteur' },
    { header: 'Employer', accessor: 'employer' },
    { header: 'Client', accessor: 'client' },
    { header: 'Date Demande', accessor: 'date_demande', 
      render: (clm, item: DemandeServiceEntity) => <span>{(item.date_demande + "").split("T")[0]}</span>
    },
    { header: 'Prix TTC', accessor: 'prix_ttc' },
    { header: 'Payer', accessor: 'payer' },
    { header: 'Marque', accessor: 'marque' },
  ];

  // Memoize columns to avoid unnecessary re-renders
  const memoizedColumns = useMemo(() => columns, []);

  useEffect(() => {
    fetchServiceList(0, 50); // Fetch the service list on mount
  }, [fetchServiceList]);

  return (
    <CustomModal
      className="special-modal"
      onSave={() => { onSaveItems(); }}
      textButton="Demande"
      title="Liste des services"
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
              <option value="Matricule">Matricule</option>
              <option value="Conducteur">Conducteur</option>
              <option value="Client">Client</option>
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
                aria-describedby="search-addon"
              />
              <button
                onClick={handleSearch}
                className="btn custom-btn btn-outline-primary"
              >
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
      <GenericTable
        data={serviceList}
        columns={memoizedColumns}
        selectedItems={selectedServices}
        onRowClick={onRowClick}
      />
      <Pagination
        onPageChange={fetchServiceList}
      />
    </CustomModal>
  );
};

export default DemandeServiceListModal;
