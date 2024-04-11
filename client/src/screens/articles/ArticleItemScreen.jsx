import { useParams, Link } from 'react-router-dom';
import { SCREENS } from '../../constants/router';

export const ArticleItemScreen = () => {
  const params = useParams();

  return (
    <div className='screen'>
      <Link to={SCREENS.ARTICLES.PATH}>Back to {SCREENS.ARTICLES.NAME}</Link>

      <h2>{SCREENS.ARTICLE_ITEM.NAME}</h2>
      <p>Article ID: {params.id}</p>
      <p>Article Name: Article 1</p>
      <p>Article Price: $10.00</p>
      <p>Article Tax: 5%</p>
      <p>Article Description: Description of Article 1</p>
    </div>
  );
}