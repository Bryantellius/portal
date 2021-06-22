import React from 'react';
import Vimeo from '@u-wave/react-vimeo';

const Video = ({
  url,
  showTitle
}) => {
  return (
    <Vimeo responsive={true} width="100%" video={url} showTitle={showTitle} autoplay={false} />
  );
};

export default Video;
