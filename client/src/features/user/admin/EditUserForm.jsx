import React from 'react';
import { Button, Card, Col, Descriptions, PageHeader, Row } from 'antd';
import { Form, Input } from 'formik-antd';
import { useFormikContext } from 'formik';
import PageContent from '../../shared/components/PageContent';
import PageActions from '../../shared/components/PageActions';
import UserEnrolledCourseList from './UserEnrolledCourseList';
import UserCompletedCourseList from './UserCompletedCourseList';
import userService from '../user.service';
import { CheckCircleOutlined, DeleteOutlined, MessageOutlined } from '@ant-design/icons';
import LineBreak from '../../shared/components/LineBreak';
import appConfig from '../../../config/appConfig';
import moment from 'moment';
import { useHistory } from 'react-router-dom';

const EditUserForm = ({
  user
}) => {
  const {
    values
  } = useFormikContext();
  const history = useHistory();

  const deleteUser = async () => {
    await userService.delete(values.id);

    history.push('/admin/users');
  };

  const openDiscord = () => {
    window.location.href = appConfig.discordLink;
  };

  const getAggregateScore = scores => {
    if (!scores?.length > 0) {
      return 0;
    }

    const averageScore = scores.reduce((a, b) => parseFloat(a) + parseFloat(b), 0) / scores.length;

    return averageScore.toFixed(2) * 100 + '%';
  };


  const enrolledCourses = values.courseUsers
  ?.filter(courseUser => !courseUser.dateCompleted)
  ?.map(courseUser => {
    const courseLectures = courseUser.course?.modules?.flatMap(module => module.lectures).map(lecture => lecture.id);
    return {
      title: courseUser.course?.title,
      createdAt: moment(courseUser.createdAt).format('MM-DD-YYYY'),
      aggregateScore: getAggregateScore(user?.quizSubmissions
      ?.filter(quizSubmission => courseLectures.includes(quizSubmission.quiz?.lectureId))
      ?.map(submission => submission.score))
    };
  });

  const completedCourses = values.courseUsers
  ?.filter(courseUser => courseUser.dateCompleted && new Date(courseUser.dateCompleted) < new Date())
  ?.map(courseUser => {
    const courseLectures = courseUser.course?.modules?.flatMap(module => module.lectures).map(lecture => lecture.id);
    return {
      title: courseUser.course?.title,
      createdAt: moment(courseUser.dateCompleted).format('MM-DD-YYYY'),
      aggregateScore: getAggregateScore(user?.quizSubmissions
      ?.filter(quizSubmission => courseLectures.includes(quizSubmission.quiz?.lectureId))
      ?.map(submission => submission.score))
    };
  });

  return (
    <PageContent>
      <PageHeader
        title="Edit User"
        subTitle={`${values?.firstName} ${values?.lastName}`}>
      </PageHeader>

      <LineBreak />
      <Descriptions
        bordered="true"
        column={2}>
        <Descriptions.Item label="Email">{values.email}</Descriptions.Item>
        <Descriptions.Item label="Created At">{values.createdAt}</Descriptions.Item>
        <Descriptions.Item label="Last Logged In">
          {/*  todo: last logged in */}
        </Descriptions.Item>
      </Descriptions>

      <LineBreak />

      <Card title="Contact Info">
        <Form>
          <Form.Item
            label="First Name"
            name="firstName">
            <Input
              name="firstName"
              value={values?.firstName} />
          </Form.Item>
          <Form.Item
            label="Last Name"
            name="lastName">
            <Input
              name="lastName"
              value={values?.lastName} />
          </Form.Item>

          <Row>
            <Col xs={8}>
              <Form.Item
                label="Discord Username"
                name="discordUsername">
                <Input
                  name="discordUsername"
                  value={values?.discordUsername} />
              </Form.Item>
            </Col>
            <Col xs={4}>
              <Button
                type="primary"
                onClick={openDiscord}
                icon={<MessageOutlined />}>
                Discord
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Row
        className="mt-5"
        justify="space-between">
        <Col sm={11}>
          <UserEnrolledCourseList
            user={user}
            enrolledCourses={enrolledCourses} />
        </Col>
        <Col sm={11}>
          <UserCompletedCourseList
            user={user}
            completedCourses={completedCourses} />
        </Col>
      </Row>
      <PageActions
        side="right"
        style={{ right: '30px' }}>
        <Button
          type="secondary"
          onClick={deleteUser}
          icon={<DeleteOutlined />}>
          Delete
        </Button>
        <Button
          type="primary"
          htmlType="submit"
          icon={<CheckCircleOutlined />}>
          Save
        </Button>
      </PageActions>
    </PageContent>
  );
};

export default EditUserForm;