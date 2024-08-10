import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import {
  clearFeed,
  getFeed,
  selectFeedError,
  selectFeedIsLoading,
  selectOrders
} from '../../services/slices/feedSlice';
import styles from '../../components/ui/pages/feed/feed.module.css';

export const Feed: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrders);
  const isLoading = useSelector(selectFeedIsLoading);
  const error = useSelector(selectFeedError);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    setHasLoaded(false);
    dispatch(getFeed())
      .then(() => setHasLoaded(true))
      .catch(() => setHasLoaded(true));

    return () => {
      dispatch(clearFeed());
    };
  }, [dispatch]);

  if (isLoading) {
    return <Preloader />;
  }

  if (error && hasLoaded) {
    return <h2 className={styles.error}>Произошла ошибка при загрузке</h2>;
  }

  if (!orders.length && hasLoaded && !error) {
    return <h2 className={styles.noOrders}>Пока что заказов нет</h2>;
  }

  const handleGetFeeds = () => {
    setHasLoaded(false);
    dispatch(getFeed())
      .then(() => setHasLoaded(true))
      .catch(() => setHasLoaded(true));
  };

  return <FeedUI orders={orders} handleGetFeeds={handleGetFeeds} />;
};
