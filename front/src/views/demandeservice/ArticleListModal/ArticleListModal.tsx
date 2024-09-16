/* eslint-disable @typescript-eslint/no-explicit-any */
import GenericTable from '../../../components/table/GenericTable';
import React, { FC, useEffect, useState } from 'react';
import CustomModal from '../../../components/customModal/CustomModal';
import { FetchType } from '../../../util/types';
import Article from '../../../entities/Article';
import ArticleServices from '../../../ApiServices/ArticleServices';
import ApiUrls from '../../../ApiUrl/ApiUrls';
import Pagination from '../../../components/pagination/Pagination';

const columns = [
  { header: 'Identification', accessor: 'identification' },
  { header: 'Designation', accessor: 'designation' },
  { header: 'Prix Vente', accessor: 'prix_vente' },
  { header: 'Quantité', accessor: 'qte', defaultValue: 1, isInput : {
                                                                type : "number",
                                                                min : 1,
                                                              }
  },
  { header: 'Famille', accessor: 'famille' },
  ];

interface ArticleModalProps {
  checkAction: (check: boolean, article: Article) => void;
  onSaveItems: () => void;
  selectedArticles: Article[];
  resetData: () => void;
}

const ArticleListModal: FC<ArticleModalProps> = ({
  checkAction,
  onSaveItems,
  selectedArticles,
  resetData,
}) => {
  const [articleList, setArticleList] = useState<Article[]>([]);
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');

  console.log('modale article');

  const handleSearch = async () => {
    await fetchArticleList();
  };

  const fetchArticleList = async (start?: number, rowCpt?: number): Promise<FetchType> => {
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
  };

  useEffect(() => {
    fetchArticleList(0, 50);
  }, []);

  return (
    <CustomModal
      className="special-modal" 
      onSave={() => {
        onSaveItems();
      }}
      textButton="Liste des articles"
      title="Liste des articles"
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
              <option value="" disabled selected>
                Recherche par
              </option>
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
              <button onClick={() => handleSearch()} className="btn custom-btn btn-outline-primary">
                Rechercher
              </button>
            </div>
          </div>
        </div>
      </div>
      <GenericTable
        data={articleList}
        columns={columns}
        onCheckedItemsChange={checkAction}
        selectedItems={selectedArticles}
      />
      <Pagination onPageChange={fetchArticleList} />
    </CustomModal>
  );
};

export default ArticleListModal;
