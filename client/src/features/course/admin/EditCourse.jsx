import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { DatePicker, Form, Input } from 'formik-antd';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import courseService from '../course.service';
import { FieldArray, Formik } from 'formik';
import PageContent from '../../shared/components/PageContent';
import 'react-datepicker/dist/react-datepicker.css';
import EditCourseModule from './EditCourseModule';
import CourseModules from './CourseModules';
import FormSubmitButton from '../../shared/components/FormSubmitButton';
import { Col, PageHeader, Row, Typography } from 'antd';
import { useHistory } from 'react-router';

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [course, setCourse] = useState({
    title: '',
    type: '',
    modules: []
  });

  const saveCourse = async course => {
    course.modules = course.modules.map(module => module.id);

    const saved = await courseService.upsert(course);
    console.log(saved);

    history.push('/admin/courses');
  };

  useEffect(() => {
    const fetchCourse = async () => {
      const course = await courseService.fetchById(id);

      setCourse(course);
    };

    fetchCourse();
  }, [id, dispatch]);

  return (
    <PageContent className="page-content">
      <PageHeader
        title="View/Edit Course:"
        subTitle={`${course.title}`}>
      </PageHeader>

      {course?.id &&
      <Formik
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={course}
        onSubmit={values => saveCourse(values)}>
        {({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => (
          <Form
            layout="vertical"
            onSubmit={handleSubmit}
            className="has-actions">
            <Row gutter={16}>
              <Col xs={24} md={10}>
                <Form.Item name="title" label="Title">
                  <Input
                    name="title"
                    type="text"
                    value={values?.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={10}>
                <Form.Item name="startDate" label="Start Date">
                  <DatePicker
                    name="startDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={moment(values.startDate)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={10}>
                <Form.Item name="type" label="Type">
                  <Input
                    name="type"
                    type="text"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={10}>
                <Form.Item name="endDate" label="Start Date">
                  <DatePicker
                    name="endDate"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={moment(values.startDate)}
                  />
                </Form.Item>
              </Col>
            </Row>

            <Typography.Title level={3}>
              Modules
            </Typography.Title>
            <FieldArray
              name="modules">
              {({ insert, remove, push }) => (
                <>
                  <CourseModules
                    modules={values.modules}
                    onPush={push}
                    onRemove={remove}
                    onEdit={index => {
                      setFieldValue(`modules.${index}.isEditing`, true);
                    }}
                    onCreate={() => {
                      push({
                        title: '',
                        lectures: [],
                        isEditing: true
                      });
                    }}
                  />
                  {
                    values.modules?.length > 0 &&
                    values.modules.map((module, index) => (
                      <EditCourseModule
                        fieldNamespace={`modules.${index}`}
                        key={index}
                        module={module}
                        show={module.isEditing}
                        moduleIndex={index}
                        onHide={() => {
                          setFieldValue(`modules.${index}.isEditing`, false);
                        }}
                        onSave={() => {
                          setFieldValue(`modules.${index}.isSaved`, true);
                          setFieldValue(`modules.${index}.isEditing`, false);
                        }}
                      />
                    ))
                  }
                </>
              )}
            </FieldArray>
            <FormSubmitButton text="Save Course" />
          </Form>
        )}
      </Formik>
      }
    </PageContent>
  );
};

export default EditCourse;
