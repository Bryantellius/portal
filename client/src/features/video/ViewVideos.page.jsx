import React, { useEffect, useState, Fragment } from 'react';
import ApiClient from '../../utils/apiClient';
import VideoSearchControl from './VideoSearchControl';
import VideoGallery from './VideoGallery';
import { useDispatch, useSelector } from 'react-redux';
import { searchVideos } from './video.slice';
import LoadingContainer from '../shared/components/LoadingContainer';

const ViewVideosPage = () => {
  const dispatch = useDispatch();
  const videos = useSelector(state => state.video.videos);
  const isLoading = useSelector(state => state.video.isLoading);
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (query && query.length > 2) {
      dispatch(searchVideos(query));
    }
  }, [query, dispatch]);

  return (
    <LoadingContainer isLoading={isLoading}>
      <VideoSearchControl value={query} onChange={e => setQuery(e.target.value)} />
      <VideoGallery videos={videos} />
    </LoadingContainer>
  );
};

export default ViewVideosPage;