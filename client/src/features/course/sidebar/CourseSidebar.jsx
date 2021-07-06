import React from 'react';
import { Menu, Space, Typography } from 'antd';
import { useHistory, useParams } from 'react-router-dom';
import { CheckCircleFilled, GroupOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import CourseProgressBar from '../CourseProgressBar';

const CourseSidebar = ({
  course
}) => {
  const history = useHistory();
  const {
    courseId
  } = useParams();

  const completedLectures = useSelector(state => state.lecture.completedLectures);

  const goToLecture = e => {
    history.push(`/course/${courseId}/lecture/${e.key}`);
  };

  const isLectureCompleted = lectureId => {
    return !!completedLectures.find(lecture => lecture.id === lectureId);
  };

  return (
    <Space
      size="large"
      direction="vertical">
      <Typography.Title
        level={3}>
        {course?.title}
      </Typography.Title>

      <CourseProgressBar />

      <Menu
        theme="dark"
        mode="inline"
        onClick={goToLecture}
        inlineCollapsed={false}
        defaultOpenKeys={course?.modules?.map(module => `module-${module.id}`)}
        style={{
          width: '100%'
        }}>
        {
          course?.modules?.length > 0 && course.modules.map(module => (
            module.lectures?.length > 0
              ? (
                <Menu.SubMenu
                  key={`module-${module.id}`}
                  title={module.title}
                  icon={<GroupOutlined />}>
                  {
                    module.lectures.map(lecture => (
                      <Menu.Item
                        key={lecture.id}>
                        {
                          isLectureCompleted(lecture?.id) && (
                            <CheckCircleFilled
                              className="text-success"
                              style={{
                                position: 'absolute',
                                left: '20px',
                                top: 0,
                                bottom: 0,
                                margin: 'auto',
                                height: '15px'
                              }} />
                          )
                        }
                        {lecture.title}
                      </Menu.Item>
                    ))
                  }
                </Menu.SubMenu>
              )
              : <></>
          ))
        }
      </Menu>
    </Space>
  );
};

export default CourseSidebar;
