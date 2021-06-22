import React, { useState } from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import Video from './Video';

const VideoPlaylist = ({
  videos
}) => {
  const [activeVideo, setActiveVideo] = useState(videos[0]?.id);

  if (videos.length === 1) {
    return <Video showTitle={true} url={videos[0].url} />
  }
  return (
    <Tab.Container activeKey={activeVideo}>
      <Row noGutters>
        <Col xs={12} sm={8} md={10}>
          <Tab.Content>
            {
              videos?.length > 0 && videos.map(video => (
                <Tab.Pane eventKey={video.id} key={video.id}>
                  <Video showTitle={false} url={video.url} />
                </Tab.Pane>
              ))
            }
          </Tab.Content>
        </Col>
        <Col xs={12} sm={4} md={2}>
          <Nav
            variant="pills"
            activeKey={activeVideo}
            onSelect={setActiveVideo}
            className="flex-column">
            {
              videos?.length > 0 && videos.map(video => (
                <Nav.Item key={video.id}>
                  <Nav.Link eventKey={video.id}>
                    { video.title }
                  </Nav.Link>
                </Nav.Item>
              ))
            }
          </Nav>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default VideoPlaylist;