import React from 'react';
import Markdown from 'markdown-to-jsx';
import VideoPlaylist from '../video/VideoPlaylist';
import LineBreak from '../shared/components/LineBreak';

const LectureContent = ({
  content,
  videos
}) => {
  return (
    <>
      {
        videos && <VideoPlaylist videos={videos} />
      }

      <LineBreak/>
      <Markdown>{content}</Markdown>
    </>
  );
};

export default LectureContent;
