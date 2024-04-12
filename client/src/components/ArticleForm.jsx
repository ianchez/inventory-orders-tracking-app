import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../context/inventory';
import { createArticle, updateArticle } from '../domain/InventoryService';
import { SCREENS } from '../constants/router';

const DEFAULT_FORM_STATE = {
  ID: "",
  NAME: "",
  PRICE: "0",
  TAX_PERCENTAGE: "0",
  DESCRIPTION: "",
};

export const ArticleForm = ({currentArticle, setArticleName, isNewArticle = false}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { refetch } = useContext(InventoryContext);

  const [formState, setFormState] = useState({
    id: currentArticle?.id || DEFAULT_FORM_STATE.ID,
    name: currentArticle?.name || DEFAULT_FORM_STATE.NAME,
    price: currentArticle?.price || DEFAULT_FORM_STATE.PRICE,
    taxPercentage: currentArticle?.taxPercentage || DEFAULT_FORM_STATE.TAX_PERCENTAGE,
    description: currentArticle?.description || DEFAULT_FORM_STATE.DESCRIPTION,
  });

  const handleSubmitArticle = async (event) => {
    event.preventDefault();
    const action = currentArticle ? updateArticle : createArticle;
    const response = await action(formState);
    if (!response.id) return;

    navigate(SCREENS.ARTICLES.PATH);
    refetch();
  };

  const handleChange = ({target}) => {
    // Prevent negative values for price and taxPercentage
    if (target.name === 'price' || target.name === 'taxPercentage') {
      if (Number(target.value) < 0) return;
    }

    if (target.name === 'name') {
      setArticleName(target.value);
    }

    setFormState((prevFormState) => ({
      ...prevFormState,
      [target.name]: target.value,
    }));
  };

  const disableSubmitButton =
    !formState.name ||
    !formState.price ||
    !formState.taxPercentage ||
    formState.price === '0' ||
    formState.taxPercentage === '0';

  const subtitle = disableSubmitButton
    ? t('articles.subtitle.missingDetails')
    : t('articles.subtitle.details');

  const submitButtonLabel = currentArticle
    ? t('articles.button.update')
    : t('articles.button.create');

  return (
    <form onSubmit={handleSubmitArticle}>
      <p>{subtitle}</p>

      {!isNewArticle && 
        <label>
          {t('articles.formLabel.id')}
          <input type="number" name="id" value={formState.id} onChange={handleChange} readOnly disabled/>
        </label>
      }

      <label>
        {t('articles.formLabel.name')}
        <input
          className={formState.name ? '' : 'warning'}
          type="text"
          name="name"
          value={formState.name}
          onChange={handleChange}
        />
      </label>

      <div style={{ display: 'flex', justifyContent: 'space-between', width: "100%" }}>
        <label className='w45'>
          {t('articles.formLabel.price')}
          <input
            className={!formState.price || formState.price === '0' ? 'warning' : ''}
            type="number"
            name="price"
            value={formState.price}
            onChange={handleChange}
          />
        </label>
        <label className='w45'>
          {t('articles.formLabel.taxPercentage')}
          <input
            className={!formState.taxPercentage || formState.taxPercentage === '0' ? 'warning' : ''}
            type="number"
            name="taxPercentage"
            value={formState.taxPercentage}
            onChange={handleChange}
          />
        </label>
      </div>

      <label>
        {t('articles.formLabel.description')}
        <textarea
          name="description"
          value={formState.description}
          onChange={handleChange}
        />
      </label>

      <button type="submit" className='primary' disabled={disableSubmitButton}>
        {submitButtonLabel}
      </button>
    </form>
  );
}