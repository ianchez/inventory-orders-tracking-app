import { ArticlesList } from '../components/ArticlesList';
import { Link } from 'react-router-dom';
import { SCREENS } from '../constants/router';

export const ArticlesScreen = () => {
  return (
    <div className='screen'>
      <Link to={SCREENS.HOME} className='link'>Back to Home</Link>

      <h2>Articles</h2>
      <ArticlesList />
    </div>
  );
}