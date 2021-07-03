import React from 'react';
import { Card, Button } from 'antd';
import { blue } from '@ant-design/colors';

const CareerServicesWidget = () => {
  return (
    <Card
      bodyStyle={{ backgroundColor: '#fff' }}
      style={{ backgroundColor: blue.primary }}
      cover={
        <img
          src="/assets/svg/learn.svg"
          alt="Career Services"
        />
      }
      actions={[
        <Button
          key="Career Services"
          type="primary"
          href="/career-services">
          Schedule an Appointment
        </Button>
      ]}>
      <Card.Meta title="Career Services" />
    </Card>
  );
};

export default CareerServicesWidget;