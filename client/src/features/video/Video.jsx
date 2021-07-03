import React from 'react';
import Vimeo from '@u-wave/react-vimeo';
import styled from 'styled-components';

const Video = ({
  url,
  showTitle,
  autoplay = false,
  responsive = true,
  ...props
}) => {
  return (
    <VideoWrapper>
      <Vimeo
        responsive={responsive}
        autoplay={autoplay}
        width="100%"
        video={url}
        { ...props } />
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  min-height: 400px;
  height: 100%;
`;

export default Video;
