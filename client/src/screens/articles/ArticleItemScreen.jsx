import { useState, useContext } from 'react';

import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { InventoryContext } from '../../context/inventory';
import { SCREENS } from '../../constants/router';
import { ArticleForm } from '../../components/ArticleForm';

export const ArticleItemScreen = () => {
  const { t } = useTranslation();
  const params = useParams();

  const { articles } = useContext(InventoryContext);
  const [articleName, setArticleName] = useState('');

  const currentArticle = articles.find(article => article.id === params.id);
  const isNewArticle = !currentArticle && params.id === 'new';

  const screenTitle =
    currentArticle
      ? currentArticle.name || t('articles.title.singular')
      : isNewArticle
        ? articleName || t('articles.title.new')
        : t('articles.title.notFound');

  return (
    <div className='screen'>
      <Link to={SCREENS.ARTICLES.PATH}>
        {`${t('navigation.backTo')} ${t(`screens.${SCREENS.ARTICLES.NAME}`)}`}
      </Link>

      <h2>{screenTitle}</h2>

      {(currentArticle || isNewArticle) &&
        <ArticleForm
          setArticleName={setArticleName}
          currentArticle={currentArticle}
          isNewArticle={isNewArticle}
        />
      }
    </div>
  );
}