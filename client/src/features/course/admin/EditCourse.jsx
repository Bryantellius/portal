import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from 'formik-antd';
import { useDispatch } from 'react-redux';
import courseService from '../course.service';
import { FieldArray, Formik } from 'formik';
import 'react-datepicker/dist/react-datepicker.css';
import EditCourseModule from './EditCourseModule';
import CourseModuleList from './CourseModuleList';
import { Col, PageHeader, Row, Typography } from 'antd';
import { useHistory } from 'react-router';
import FormSubmitButton from '../../shared/components/FormSubmitButton';
import CourseIterationList from './CourseIterationList';
import EditCourseIteration from './EditCourseIteration';
import PageContent from '../../shared/components/PageContent';

const EditCourse = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const [courseDefinition, setCourseDefinition] = useState(getCourseDefinitionTemplate());
  const [modules, setModules] = useState([]);
  const [courses, setCourses] = useState([]);

  const saveCourse = async course => {
    course.modules = course.modules?.map(module => module.id);

    const saved = await courseService.upsert(course);

    history.push('/admin/courses');
  };

  useEffect(() => {
    const fetchData = async () => {
      const course = await courseService.fetchById(id);

      setCourseDefinition(course);

      const modules = await courseService.fetchModulesForCourse(course?.id);

      setModules(modules);

      const courseSchedule = await courseService.fetchCourseSchedule(course?.id);

      setCourses(courseSchedule);
    };

    fetchData();
  }, [id, dispatch]);

  return (
    <PageContent className="page-content">
      <PageHeader
        title="View/Edit Course:"
        subTitle={`${courseDefinition.title}`}>
      </PageHeader>

      {courseDefinition?.id &&
      <Formik
        enableReinitialize={true}
        validateOnBlur={false}
        validateOnChange={false}
        initialValues={{
          title: courseDefinition?.title,
          type: courseDefinition?.type,
          description: courseDefinition?.description,
          modules: modules,
          courses: courses
        }}
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
              <Col
                xs={24}
                md={10}>
                <Form.Item
                  name="title"
                  label="Title">
                  <Input
                    name="title"
                    type="text"
                    value={values?.title}
                    onChange={handleChange}
                    onBlur={handleBlur} />
                </Form.Item>
              </Col>
              <Col
                xs={24}
                md={10}>
                <Form.Item
                  name="type"
                  label="Type">
                  <Input
                    name="type"
                    type="text"
                    value={values.type}
                    onChange={handleChange}
                    onBlur={handleBlur} />
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
                  <CourseModuleList
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
                    }} />
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
                        }} />
                    ))
                  }
                </>
              )}
            </FieldArray>

            <FieldArray name={'courses'}>
              {({ insert, remove, push }) => (
                <>
                  <Typography.Title level={3}>
                    Schedule
                  </Typography.Title>
                  <CourseIterationList
                    courseIterations={values.courses}
                    onCreate={() => push(getCourseIterationTemplate())}
                    onDelete={index => remove(index)} />

                  {
                    values.courses?.length > 0 && values.courses.map((course, courseIndex) => (
                      <EditCourseIteration
                        show={values.courses[courseIndex]?.isEditing}
                        onSave={() => setFieldValue(`courses.${courseIndex}.isEditing`, false)}
                        onHide={() => setFieldValue(`courses.${courseIndex}.isEditing`, false)}
                        key={courseIndex}
                        courseIndex={courseIndex}
                        fieldNamespace={`courses.${courseIndex}`}
                        course={course} />
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

const getCourseDefinitionTemplate = () => {
  return {
    courses: [],
    title: '',
    type: '',
    description: '',
    id: null,
    modules: []
  };
};

const getCourseIterationTemplate = () => {
  return {
    courseUsers: [],
    startDate: new Date(),
    endDate: new Date(),
    instructorId: null,
    courseDefinitionId: null
  };
};

export default EditCourse;
