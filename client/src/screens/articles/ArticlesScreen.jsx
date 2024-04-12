import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { ArticlesList } from '../../components/ArticlesList';
import { Link } from 'react-router-dom';
import { SCREENS, routeBuilder } from '../../constants/router';

export const ArticlesScreen = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <div className='screen'>
      <Link to={SCREENS.HOME.PATH}>
        {`${t('navigation.backTo')} ${t(`screens.${SCREENS.HOME.NAME}`)}`}
      </Link>

      <button
        className='primary w80'
        style={{ marginTop: "2vw" }}
        onClick={() => navigate(routeBuilder.NEW_ARTICLE())}
      >
        {t('articles.create')}
      </button>

      <h2>{t(`screens.${SCREENS.ARTICLES.NAME}`)}</h2>
      <ArticlesList />
    </div>
  );
}