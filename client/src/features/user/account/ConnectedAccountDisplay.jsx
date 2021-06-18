import React from 'react';
import { Button, Card } from 'react-bootstrap';

const ConnectedAccountDisplay = ({
  provider,
  isConnected,
  handleConnect
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          { provider }
        </Card.Title>
        <Card.Subtitle>
          {
            isConnected
              ? 'Connected'
              : 'Not Connected'
          }
        </Card.Subtitle>
        <Card.Text>
          {
            isConnected
              ? 'You can sign in to TrueCoders with this provider.'
              : `Connect with ${ provider } to allow signing in with your ${ provider } account and other cool features.`
          }
        </Card.Text>
        {
          !isConnected &&
          <Button variant="primary" onClick={handleConnect}>
            Connect with { provider }
          </Button>
        }
      </Card.Body>
    </Card>
  );
};

export default ConnectedAccountDisplay;