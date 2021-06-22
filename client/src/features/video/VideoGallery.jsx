import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Vimeo from '@u-wave/react-vimeo';

const VideoGallery = ({ videos }) => {
  return (
    <Row>
      {
        videos && videos.map(video => (
          <Col
            key={video.id}
            xs={12}
            sm={6}
            md={4}>
            <Vimeo
              key={video.id}
              className="mb-3"
              video={video.url}
              showTitle={true}
              autoplay={false}
              responsive={true}
              height="100%"
            />
          </Col>
        ))
      }
    </Row>
  );
};

export default VideoGallery;