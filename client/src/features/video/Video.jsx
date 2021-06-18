import React from 'react';
import Vimeo from '@u-wave/react-vimeo';

const Video = ({
  title,
  url
}) => {
  return (
    <>
      <Vimeo video={url} autoplay={false} />
    </>
  );
};

export default Video;
