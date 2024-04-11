import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SCREENS } from '../../constants/router';
import { useArticles } from '../../adapters/primary/useArticles';
import { createArticle, updateArticle } from '../../domain/InventoryService';

const DEFAULT_FORM_STATE = {
  ID: "",
  NAME: "",
  PRICE: "0",
  TAX_PERCENTAGE: "0",
  DESCRIPTION: "",
};

export const ArticleItemScreen = () => {
  const navigate = useNavigate();
  const params = useParams();
  const { articles } = useArticles();
  const currentArticle = articles.find(article => article.id === params.id);
  const isNewArticle = !currentArticle && params.id === 'new';

  const [formState, setFormState] = useState({
    id: currentArticle?.id || DEFAULT_FORM_STATE.ID,
    name: currentArticle?.name || DEFAULT_FORM_STATE.NAME,
    price: currentArticle?.price || DEFAULT_FORM_STATE.PRICE,
    taxPercentage: currentArticle?.taxPercentage || DEFAULT_FORM_STATE.TAX_PERCENTAGE,
    description: currentArticle?.description || DEFAULT_FORM_STATE.DESCRIPTION,
  });

  useEffect(() => {
    if (!currentArticle) return;

    setFormState({
      id: currentArticle.id,
      name: currentArticle.name,
      price: currentArticle.price,
      taxPercentage: currentArticle.taxPercentage,
      description: currentArticle.description || DEFAULT_FORM_STATE.DESCRIPTION,
    });
  }, [currentArticle]);

  const handleCreateArticle = async (event) => {
    event.preventDefault();
    const response = await createArticle(formState);
    console.log(response);
    setFormState(DEFAULT_FORM_STATE);
    navigate(SCREENS.ARTICLES.PATH)
  };

  const handleUpdateArticle = async (event) => {
    event.preventDefault();
    const response = await updateArticle(formState);
    setFormState(response);
  };

  const handleChange = (event) => {
    // Prevent negative values for price and taxPercentage
    if (event.target.name === 'price' || event.target.name === 'taxPercentage') {
      if (Number(event.target.value) < 0) return;
    }

    setFormState((prevFormState) => ({
      ...prevFormState,
      [event.target.name]: event.target.value,
    }));
  };

  const screenTitle =
    currentArticle
      ? formState.name || 'Article'
      : isNewArticle
        ? formState.name || 'New Article'
        : 'Article not found';

  const submitButtonAction = currentArticle ? handleUpdateArticle : handleCreateArticle;
  const submitButtonLabel = currentArticle ? 'UPDATE ARTICLE' : 'CREATE ARTICLE';
  const disableSubmitButton =
    !formState.name ||
    formState.price === '0' ||
    formState.taxPercentage === '0';

  const subtitle = disableSubmitButton
    ? 'Enter the missing details of the article:'
    : 'Enter the details of the article:';

  const renderArticleForm = () => (
    <form onSubmit={submitButtonAction}>
      <p>{subtitle}</p>
      {!isNewArticle && 
        <label>
          ID: 
          <input type="number" name="id" value={formState.id} onChange={handleChange} readOnly />
        </label>
      }
      <label>
        Name: 
        <input className={formState.name ? '' : 'warning'} type="text" name="name" value={formState.name} onChange={handleChange} />
      </label>
      <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
        <label className='w45'>
          Price: 
          <input className={formState.price === '0' ? 'warning' : ''} type="number" name="price" value={formState.price} onChange={handleChange} />
        </label>
        <label className='w45'>
          Tax percentage: 
          <input className={formState.taxPercentage === '0' ? 'warning' : ''} type="number" name="taxPercentage" value={formState.taxPercentage} onChange={handleChange} />
        </label>
      </div>
      <label>
        Description:
        <textarea name="description" value={formState.description} onChange={handleChange} />
      </label>
      <button type="submit" className='primary' disabled={disableSubmitButton}>{submitButtonLabel}</button>
    </form>
  );

  return (
    <div className='screen'>
      <Link to={SCREENS.ARTICLES.PATH}>Back to {SCREENS.ARTICLES.NAME}</Link>

      <h2>{screenTitle}</h2>

      {(currentArticle || isNewArticle) && renderArticleForm()}
    </div>
  );
}