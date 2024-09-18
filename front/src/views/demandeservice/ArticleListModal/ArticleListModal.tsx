/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericTable from '../../../components/table/GenericTable';
import React, { FC, useEffect, useState, useMemo, useCallback, ReactElement } from 'react';
import CustomModal from '../../../components/customModal/CustomModal';
import { FetchType } from '../../../util/types';
import Article from '../../../entities/Article';
import ArticleServices from '../../../ApiServices/ArticleServices';
import ApiUrls from '../../../ApiUrl/ApiUrls';
import Pagination from '../../../components/pagination/Pagination';
import CustomCheckbox from '../customCheckBox/CustomCheckbox'; // Ensure this import is correct
import TableInput from '../tableInput/TableInput';
import ServiceEntity from '../../../entities/ServiceEntity';

// Define the type of column for the table
interface Column {
  header: string;
  accessor: string;
  defaultValue?: number;
  isInput?: {
    type: string;
    min: number;
    max?: string;
  };
  render?: (clm?: Column[], item?: Article) => ReactElement;
}

// Define columns for the article table
const columns: Column[] = [
  {
    header: '',
    accessor: '',
    render: (clm, item: Article) => (
      <CustomCheckbox item={item}/>
    ),
  },
  { header: 'Identification', accessor: 'identification' },
  { header: 'Designation', accessor: 'designation' },
  { header: 'Prix', accessor: 'prix_vente', },
  { header: 'Remise', accessor: '',
    render: (clm: Column[], item: ServiceEntity | Article) =>{
      return <TableInput item={item} 
                        attribute='remise' 
                        defaultValue={0}
                        />;
    }
   },
  { header: 'Quantité', accessor: 'qte', 
    render: (clm: Column[], item: ServiceEntity | Article) =>{
      return <TableInput item={item} 
                        attribute='qte' 
                        defaultValue={1}
                        min = {1}
                        />;
    }
   },
  { header: 'Famille', accessor: 'famille' },

];

// Define the props for the modal component
interface ArticleModalProps {
  onSaveItems: () => void;
  selectedArticles: Article[];
  resetData: () => void;
}

// Modal component for displaying articles
const ArticleListModal: FC<ArticleModalProps> = ({
  onSaveItems,
  selectedArticles,
}) => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  console.log('modale article');

  const handleSearch = async () => {
    await fetchArticleList();
  };

  // Fetch articles list with useCallback to avoid unnecessary re-renders
  const fetchArticleList = useCallback(async (start?: number, rowCpt?: number): Promise<FetchType> => {
    try {
      const response = await ArticleServices.GetListArticle(
        `${ApiUrls.ARTICLE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`
      );
      setArticleList(response.articleList);

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

  // useMemo to memoize columns
  const memoizedColumns = useMemo(() => columns, []);

  useEffect(() => {
    fetchArticleList(0, 50);
  }, [fetchArticleList]);

  return (
    <CustomModal
      className='special-modal'
      onSave={() => { onSaveItems(); }}
      textButton='Liste des articles'
      title='Liste des articles'
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
              <option value="Identification">Identification</option>
              <option value="Designation">Désignation</option>
              <option value="Famille">Famille</option>
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
        data={articleList}
        columns={memoizedColumns}
        selectedItems={selectedArticles}
      />
      <Pagination
        onPageChange={fetchArticleList}
      />
    </CustomModal>
  );
};

export default ArticleListModal;
