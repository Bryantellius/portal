import React, { useEffect, useState, Fragment } from 'react';
import ApiClient from '../utils/apiClient';
import VideoSearchControl from '../components/video/VideoSearchControl';
import VideoGallery from '../components/video/VideoGallery';

const ViewVideos = () => {
  const [videos, setVideos] = useState([]);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const searchVideos = async () => {
      const apiClient = new ApiClient();

      if (query && query.length > 2) {
        const searchResults = await apiClient.get(`/video/search/${ query }`);

        setVideos(searchResults);
      }
    };

    searchVideos();
  }, [query, setVideos]);

  return (
    <Fragment>
      <VideoSearchControl value={query} onChange={e => setQuery(e.target.value)} />
      <VideoGallery videos={videos} />
    </Fragment>
  );
};

export default ViewVideos;