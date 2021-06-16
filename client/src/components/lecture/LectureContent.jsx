import React from 'react';
import Video from '../shared/Video';
import Markdown from 'markdown-to-jsx';

const LectureContent = ({
  content,
  videos
}) => {
  return (
    <>
      {
        videos && videos.map(video => (
          <Video title={video.title} url={video.url} key={video.id} />
        ))
      }
      <div className="docs-content">
        <Markdown>{content}</Markdown>
      </div>
    </>
  );
};

export default LectureContent;
