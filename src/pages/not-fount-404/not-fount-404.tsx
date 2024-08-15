import { FC } from 'react';
import { Helmet } from 'react-helmet-async';

export const NotFound404: FC = () => (
  <>
    <Helmet>
      <title>Страница не найдена</title>
    </Helmet>
    <h3 className={`pb-6 text text_type_main-large`}>
      Страница не найдена. Ошибка 404.
    </h3>
  </>
);
