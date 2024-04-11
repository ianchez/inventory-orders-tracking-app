import { ArticlesList } from '../../components/ArticlesList';
import { Link } from 'react-router-dom';
import { SCREENS } from '../../constants/router';

export const ArticlesScreen = () => {
  return (
    <div className='screen'>
      <Link to={SCREENS.HOME.PATH}>Back to {SCREENS.HOME.NAME}</Link>

      <h2>{SCREENS.ARTICLES.NAME}</h2>
      <ArticlesList />
    </div>
  );
}