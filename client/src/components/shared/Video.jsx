import React from 'react';

const Video = ({
  title,
  url
}) => {
  return (
    <>
      <h4>{ title }</h4>

      <video width="100%" height="auto" controls>
        <source src={ url } type="video/mp4" />
      </video>
    </>
  );
};

export default Video;
