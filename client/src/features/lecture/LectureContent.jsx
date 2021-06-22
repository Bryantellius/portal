import React from 'react';
import Video from '../video/Video';
import Markdown from 'markdown-to-jsx';
import VideoPlaylist from '../video/VideoPlaylist';

const LectureContent = ({
  content,
  videos
}) => {
  return (
    <>
      {
        videos && <VideoPlaylist videos={videos} />
      }
      <Markdown>{content}</Markdown>
    </>
  );
};

export default LectureContent;
