import { useState, useEffect } from 'react';

import { InfinitySpin } from 'react-loader-spinner';

import InfiniteScroll from 'react-infinite-scroll-component';

import { imageSearch } from 'components/API/API';

import { Searchbar } from './Searchbar/Searchbar';

import { Imagegallery } from './ImageGalley/ImageGallery';

// import { LoadMore } from './LoadMore/LoadMore.styled';

import { Modal } from './Modal/Modal';

import { Modalpic } from './ModalPic/ModalPic';

import { Loader } from './Loader/Loader';

// import { MyLoader } from './Loader/Loader';

export const App = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [largeImage, setLargeImage] = useState('');
  const [query, setQuery] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    async function getResponse() {
      setIsLoaded(true);
      const responce = await imageSearch(query, page);
      setData(prevData => [...prevData, ...responce]);
      setIsLoaded(false);
    }
    getResponse();
  }, [page, query]);

  const formData = searchQuery => {
    if (searchQuery !== query) {
      setData([]);
      setPage(1);
      setQuery(searchQuery);
    }
  };

  const loadMore = () => setPage(prevPage => prevPage + 1);
  const setLargeImg = img => setLargeImage(img);
  const onModalClose = () => setLargeImage('');

  return (
    <section>
      <Searchbar data={formData} />

      {/* case with button "load more"  */}

      {/* {query && (
          <Imagegallery data={data} setLargeImg={setLargeImg} />
        )}

        {data.length > 0 && (
          <LoadMore type="button" onClick={loadMore}>
            Load more
          </LoadMore>
        )} */}

      {/* case with infinite scroll */}

      {query && (
        <InfiniteScroll
          dataLength={data.length}
          next={loadMore}
          hasMore={true}
          endMessage={
            <p style={{ textAlign: 'center' }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <Imagegallery data={data} setLargeImg={setLargeImg} />
        </InfiniteScroll>
      )}

      {largeImage && (
        <Modal onClose={onModalClose}>
          <Modalpic path={largeImage} tag={query} />
        </Modal>
      )}

      {isLoaded && (
        // spinner
        <Loader>
          <InfinitySpin width="200" color="#4366c0" />
        </Loader>

        // sceleton
        // <MyLoader />
      )}
    </section>
  );
};
