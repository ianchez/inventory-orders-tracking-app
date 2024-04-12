import { useRouteError, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { SCREENS } from "../constants/router";

export const ErrorScreen = () => {
  const { t } = useTranslation();
  const error = useRouteError();
  console.error(error);

  return (
    <div className="screen">
      <Link to={SCREENS.HOME.PATH}>
        {`${t('navigation.backTo')} ${t(`screens.${SCREENS.HOME.NAME}`)}`}
      </Link>

      <h1>{t('error.title')}</h1>
      <p>{t('error.message')}</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}