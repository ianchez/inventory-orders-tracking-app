import { useNavigate } from 'react-router-dom';

import { ArticlesList } from '../../components/ArticlesList';
import { Link } from 'react-router-dom';
import { SCREENS, routeBuilder } from '../../constants/router';

export const ArticlesScreen = () => {
  const navigate = useNavigate();

  return (
    <div className='screen'>
      <Link to={SCREENS.HOME.PATH}>Back to {SCREENS.HOME.NAME}</Link>

      <button
        className='primary w80'
        style={{ marginTop: "2vw" }}
        onClick={() => navigate(routeBuilder.NEW_ARTICLE())}
      >
        Create New Article
      </button>

      <h2>{SCREENS.ARTICLES.NAME}</h2>
      <ArticlesList />
    </div>
  );
}