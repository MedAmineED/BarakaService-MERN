/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, useEffect, useState } from 'react';
import MainCmp from '../../components/MainCmp';
import ItemHeader from '../../components/itemHeader/ItemHeader';
import Article from '../../entities/Article';
import ArticleServices from '../../ApiServices/ArticleServices';
import ApiUrls from '../../ApiUrl/ApiUrls';
import Pagination from '../../components/pagination/Pagination';

import InputModal from '../../components/InputModal/InputModal';
import EditButton from '../../components/actionButton/EditButton';
import DeleteButton from '../../components/actionButton/DeleteButton';
// import Famille from 'src/entities/Famille';
import FamilleServices from '../../ApiServices/FamilleServices';
import { FetchType, InputFieldConfig } from 'src/util/types';






const inputFields : InputFieldConfig[] = [
  { controlId: 'identification', label: 'Identification', type: 'text', placeholder: 'ID', col : "col-4" },
  { controlId: 'designation', label: 'Désignation', type: 'text', placeholder: 'Désignation', col : "col-4" },
  { controlId: 'familleId', label: 'Famille', type: 'select', placeholder: "choisor famille", col : "col-4",
    options : [{
      value : 0,
      label : ''
    }]

   },
  { controlId: 'qte', label: 'Quantité', type: 'number', placeholder: 'Qté', col : "col-4" },
  { controlId: 'qte_min', label: 'Qté Min', type: 'number', placeholder: 'Min', col : "col-4" },
  { controlId: 'qte_max', label: 'Qté Max', type: 'number', placeholder: 'Max', col : "col-4" },
  { controlId: 'prix_achat', label: 'Prix d\'Achat', type: 'number', placeholder: 'Achat', step: '0.01', unit: 'DT', col : "col-4" },
  { controlId: 'prix_vente', label: 'Prix de Vente', type: 'number', placeholder: 'Vente', step: '0.01', unit: 'DT', col : "col-4" },
  { controlId: 'tva', label: 'TVA', type: 'number', placeholder: 'TVA', step: '0.01', unit: '%', col : "col-4" },
  { controlId: 'annee', label: 'Année', type: 'number', placeholder: 'Année', col : "col-4" },
];









const ListeArticles: FC = () => {
  const [articleList, setArticleList] = useState<Article[]>([]); // Updated to handle an array
  const [searchBy, setSearchBy] = useState<string>('');
  const [searchValue, setSearchValue] = useState<string>('');
  const [inputsAtt, setInputsAtt] = useState<InputFieldConfig[]>([...inputFields]);



  //fetch list familles
  const fetchFamilleList = async (): Promise<void> => {
    try {
      const response  = await FamilleServices.GetListFamille(ApiUrls.FAMILLE);
      const options = response.map((fm)=> {
           return {
            value : fm.id? fm.id : 0,
            label : fm.famille
           }
      })

      const prevInputs = [...inputFields];
      prevInputs[2].options = [...options];

      setInputsAtt(prevInputs);
      
    } catch (err) {
      console.log("Error fetching data :", err);

    }
  };

//-----------fetch article list 

  const fetchArticleList = async (start? : number, rowCpt? : number): Promise<FetchType> => {
    try {
      const response = await ArticleServices.GetListArticle(`${ApiUrls.ARTICLE}?searchBy=${searchBy}&searchValue=${searchValue}&start=${start}&rowCpt=${rowCpt}`);
      setArticleList(response.articleList);
      
      return {totalCount : response.totalCount, pageCount : rowCpt? Math.round(response.totalCount / rowCpt) : 0}
    } catch (err) {
      console.log("Error fetching data :", err);
      return {
        totalCount : 0,
        pageCount : 0
      }
    }
  };

  const fetchArticleById = async (id : number): Promise<Article | []> => {
    try {
      const response = await ArticleServices.GetArticleById(ApiUrls.ARTICLE, id);
      return response;
    } catch (err) {
      console.log("Error fetching data :", err);
      return []
    }
  };


  const handleSearch = async () => {
    await fetchArticleList();
  };


  const validateArticle = (article: Article): string | null => {
    if (typeof article.identification !== "string" || article.identification.trim() === "") {
      return "Identification must be a non-empty string.";
    }
  
    if (typeof article.designation !== "string" || article.designation.trim() === "") {
      return "Designation must be a non-empty string.";
    }
  
    const qte = Number(article.qte);
    if (isNaN(qte) || qte < 0) {
      return "Quantity must be a non-negative number.";
    }
  
    const qte_min = Number(article.qte_min);
    if (isNaN(qte_min) || qte_min < 0) {
      return "Minimum quantity must be a non-negative number.";
    }
  
    const qte_max = Number(article.qte_max);
    if (isNaN(qte_max) || qte_max < 0) {
      return "Maximum quantity must be a non-negative number.";
    }
   
    const prix_achat = Number(article.prix_achat);
    if (isNaN(prix_achat) || prix_achat < 0) {
      return "Purchase price must be a non-negative number.";
    }
  
    const prix_vente = Number(article.prix_vente);
    if (isNaN(prix_vente) || prix_vente < 0) {
      return "Sale price must be a non-negative number.";
    }
  
    const tva = Number(article.tva);
    if (isNaN(tva) || tva < 0) {
      return "VAT must be a non-negative number.";
    }
  
    const annee = Number(article.annee);
    if (isNaN(annee) || annee < 1900 || annee > new Date().getFullYear()) {
      return "Year must be a valid year.";
    }
  
    return null;
  };
   

  const editArticle = async (id: number, article: Article) : Promise<void> => {
    const validationError = validateArticle(article);
    try {
      if (validationError) {
        throw new Error(validationError);
      }
      await ArticleServices.UpdateArticle(ApiUrls.ARTICLE, id, article);
    } catch (error) {
      console.error("Error editing article:", error);
    }
  };

  const handleEdit = async (id: number, formData : Article | { [key: string]: any }) => {
    const numericData: Article | { [key: string]: any } = {
      ...formData,
      familleId : parseInt(formData.familleId),
      qte: parseInt(formData.qte),
      qte_min: parseInt(formData.qte_min),
      qte_max: parseInt(formData.qte_max),
      prix_achat: parseFloat(formData.prix_achat),
      prix_vente: parseFloat(formData.prix_vente),
      tva: parseFloat(formData.tva),
      annee: parseInt(formData.annee),
    };
    try {
      // Edit the article
      await editArticle(id, numericData as Article);
    } catch (error) {
      console.error("Error edit article:", error);
    }

  };

  

  const addArticle = async (article: Article) : Promise<void> => {
    const validationError = validateArticle(article);
    try {
      if (validationError) {
        throw new Error(validationError);
      }
      await ArticleServices.AddArticle(ApiUrls.ARTICLE, article);
    } catch (error) {
      console.error("Error adding article:", error);
    }
  };

  const handleSave = async (formData : Article | { [key: string]: any }) => {
    const handledArticle: Article | { [key: string]: any } = {
      ...formData,
      familleId : parseInt(formData.familleId),
      qte: parseInt(formData.qte),
      qte_min: parseInt(formData.qte_min),
      qte_max: parseInt(formData.qte_max),
      prix_achat: parseFloat(formData.prix_achat),
      prix_vente: parseFloat(formData.prix_vente),
      tva: parseFloat(formData.tva),
      annee: parseInt(formData.annee),
    };
    try {
      // Add the article
      await addArticle(handledArticle as Article);
    } catch (error) {
      console.error("Error adding article:", error);
    }

  };



  const deleteArticle = async (id: number) : Promise<void> => {
    try {
      await ArticleServices.DeleteArticle(ApiUrls.ARTICLE, id);
      await fetchArticleList(0, 50);
    } catch (error) {
      console.error("Error delet article:", error);
    }
  };




  useEffect(() => {
    fetchArticleList(0, 50);
    fetchFamilleList();
  }, []);

  return (
    <MainCmp>
      <ItemHeader
        title="Liste des Articles"
        buttonText="Ajouter Article"
        onButtonClick={() => {}}
      >
          <InputModal 
                  title="Ajouter un Article" 
                  inputFields={inputsAtt} 
                  onSave={handleSave} 
                  textButton='Ajouter Article'
          />
      </ItemHeader>

      <div className="container position-center article-section" data-aos="fade-up" data-aos-delay="100">
        <hr />
        <div id="eArticle">
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
                  <option value = "" disabled selected>Recherche par</option>
                  <option value="Famille">Famille</option>
                  <option value="Identification">Identification</option>
                  <option value="Designation">Désignation</option>
                  <option value="Prix_achat">Prix d'achat</option>
                  <option value="Prix_vente">Prix de vente</option>
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
                        onClick={()=> {handleSearch()}}
                        className="btn custom-btn btn-outline-primary">Rechercher</button>
                </div>
              </div>
              
            </div>
          </div>
          <div className="table-responsive" id="tab-pag">
            <table className="TabContenu table table-sm" id="iTabContenu">
              <thead className="thead-fixed">
                <tr>
                  <th rowSpan={2} className="text-center align-middle">Famille</th>
                  <th rowSpan={2} className="text-center align-middle">Identification</th>
                  <th rowSpan={2} className="text-center align-middle">Désignation</th>
                  <th colSpan={3} className="text-center align-middle">Stock</th>
                  <th colSpan={2} className="text-center align-middle">Prix</th>
                  <th rowSpan={2} className="text-center align-middle">TVA</th>
                  <th rowSpan={2} className="text-center align-middle">Action</th>
                </tr>
                <tr>
                  <th className="text-center align-middle">Qté</th>
                  <th className="text-center align-middle">Min.</th>
                  <th className="text-center align-middle">Max.</th>
                  <th className="text-center align-middle">Achat</th>
                  <th className="text-center align-middle">Vente</th>
                </tr>
              </thead>
              <tbody>
                {articleList.map((article, index) => (
                  <tr key={article.id}>
                    <td style={{textAlign: "start"}}>{article.famille}</td> {/* Assuming Famille ID is used here */}
                    <td style={{textAlign: "start"}}>{article.identification}</td>
                    <td style={{textAlign: "start"}}>{article.designation}</td>
                    <td  style={{textAlign: "end"}}>{article.qte}</td>
                    <td  style={{textAlign: "end"}}>{article.qte_min} DT</td>
                    <td  style={{textAlign: "end"}}>{article.qte_max}</td>
                    <td  style={{textAlign: "end"}}>{article.prix_achat.toFixed(3)} DT</td>
                    <td  style={{textAlign: "end"}}>{article.prix_vente.toFixed(3)} DT</td>
                    <td  style={{textAlign: "end"}}>{article.tva}%</td>
                    <td className='action-cell'>
                      <EditButton 
                            title="Modifier un Article" 
                            inputFields={inputFields} 
                            onSave={handleEdit}
                            id = {article.id}
                            fetchById={fetchArticleById}
                      />
                      <DeleteButton 
                        onDelete ={deleteArticle} 
                        title="Supprimer l'Article"
                        id = {article.id? article.id : 0}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
            <Pagination 
                 onPageChange={fetchArticleList}
             />
        </div>
      </div>
    </MainCmp>
  );
};

export default ListeArticles;


