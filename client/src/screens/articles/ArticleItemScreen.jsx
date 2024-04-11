import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { SCREENS } from '../../constants/router';
import { useArticles } from '../../adapters/primary/useArticles';
import { updateArticle } from '../../domain/InventoryService';

export const ArticleItemScreen = () => {
  const params = useParams();
  const { articles } = useArticles();
  const currentArticle = articles.find(article => article.id === params.id);

  const [formState, setFormState] = useState({
    id: currentArticle?.id || "",
    name: currentArticle?.name || "",
    price: currentArticle?.price || 0.0,
    taxPercentage: currentArticle?.taxPercentage || 0,
    description: currentArticle?.description || "",
  });

  useEffect(() => {
    if (!currentArticle) return;

    setFormState({
      id: currentArticle.id || "",
      name: currentArticle.name || "",
      price: currentArticle.price || 0.0,
      taxPercentage: currentArticle.taxPercentage || 0,
      description: currentArticle.description || "",
    });
  }, [currentArticle]);

  const handleUpdateArticle = (event) => {
    event.preventDefault();
    updateArticle(formState);
  };

  const handleChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const screenTitle = currentArticle ? currentArticle.name : 'Article not found';

  const renderArticleForm = () => (
    <form onSubmit={handleUpdateArticle}>
      <label>
        ID: 
        <input type="text" name="id" value={formState.id} onChange={handleChange} readOnly />
      </label><br />
      <label>
        Name: 
        <input type="text" name="name" value={formState.name} onChange={handleChange} />
      </label><br />
      <label>
        Price: 
        <input type="number" name="price" value={formState.price} onChange={handleChange} />
      </label><br />
      <label>
        Tax: 
        <input type="number" name="taxPercentage" value={formState.taxPercentage} onChange={handleChange} />
      </label><br />
      <label>
        Description: 
        <textarea name="description" value={formState.description} onChange={handleChange} />
      </label><br />
      <button type="submit">Update Article</button>
    </form>
  );

  return (
    <div className='screen'>
      <Link to={SCREENS.ARTICLES.PATH}>Back to {SCREENS.ARTICLES.NAME}</Link>

      <h2>{screenTitle}</h2>

      {currentArticle && renderArticleForm()}
    </div>
  );
}