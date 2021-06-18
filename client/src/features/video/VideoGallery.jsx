import React from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Vimeo from '@u-wave/react-vimeo';

const VideoGallery = ({ videos }) => {
  return (
    <Container fluid={true}>
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
                video={video.url}
                showTitle={true}
                autoplay={false}
                responsive={true}
              />
            </Col>
          ))
        }
      </Row>
    </Container>
  );
};

export default VideoGallery;