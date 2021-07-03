import React, { useState } from 'react';
import Video from './Video';
import { Tabs, message } from 'antd';
const { TabPane } = Tabs;

const VideoPlaylist = ({
  videos
}) => {
  const [activeVideo, setActiveVideo] = useState('0');
  const onError = err => {
    message.error('Oops! There was an error loading the video. If this keeps happening, let us know about it at.');
  };

  if (videos.length === 1) {
    return <Video showTitle={true} url={videos[0].url} />
  }
  return (
    <Tabs
      activeKey={activeVideo}
      onChange={setActiveVideo}
      tabPosition="left">
      {
        videos?.length > 0 && videos.map((video, index) => (
          <TabPane
            tab={video?.title}
            key={index.toString()}>
            <Video
              showTitle={false}
              url={video.url}
              onError={onError}
            />
          </TabPane>
        ))
      }
    </Tabs>
  );
};

export default VideoPlaylist;