import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input, DatePicker } from 'formik-antd';
import { Card } from 'antd';
import moment from 'moment';
import PageHeading from '../../shared/components/PageHeading';
import { useDispatch } from 'react-redux';
import courseService from '../course.service';
import { FieldArray, Formik } from 'formik';
import PageContent from '../../shared/components/PageContent';
import 'react-datepicker/dist/react-datepicker.css';
import EditCourseModule from './EditCourseModule';
import CourseModules from './CourseModules';

const EditCourse = () => {
  const { id } = useParams();
  const [modules, setModules] = useState([]);
  const dispatch = useDispatch();
  const [course, setCourse] = useState({
    title: '',
    modules: []
  });

  const removeModule = () => {
    setModules(modules.filter());
  };


  const saveCourse = async course => {
    await courseService.upsert(course);
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
      <PageHeading>
        View/Edit Course: { course.title }
      </PageHeading>

      { course?.id &&
      <Formik
        enableReinitialize={ true }
        validateOnBlur={ false }
        validateOnChange={ false }
        initialValues={ course }
        onSubmit={ values => saveCourse(values) }>
        { ({
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue
        }) => (
          <Form onSubmit={ handleSubmit }>
            <Form.Item name="title" label="Title">
              <Input
                type="text"
                value={ values?.title }
                onChange={ handleChange }
                onBlur={ handleBlur }
              />
            </Form.Item>
            <Form.Item name="type" label="Type">
              <Input
                name="type"
                type="text"
                value={ values.type }
                onChange={ handleChange }
                onBlur={ handleBlur }
              />
            </Form.Item>
            <Form.Item name="startDate" label="Start Date">
              <DatePicker
                name="startDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={moment(values.startDate)}
              />
            </Form.Item>
            <Form.Item name="endDate" label="Start Date">
              <DatePicker
                name="endDate"
                onChange={handleChange}
                onBlur={handleBlur}
                value={moment(values.startDate)}
              />
            </Form.Item>

            <h3>Modules</h3>
            <FieldArray
              name="modules">
              { ({ insert, remove, push }) => (
                <>
                  <CourseModules
                    modules={ values.modules }
                    onPush={ push }
                    onRemove={ remove }
                    onEdit={ index => {
                      setFieldValue(`modules.${ index }.isEditing`, true);
                    } }
                    onCreate={ () => {
                      push({
                        title: '',
                        lectures: [],
                        isEditing: true
                      });
                    } }
                  />

                  {
                    values.modules &&
                    values.modules.length > 0 &&
                    values.modules.map((module, index) => (
                      <EditCourseModule
                        fieldNamespace={ `modules.${ index }` }
                        key={ index }
                        module={ module }
                        show={ module.isEditing }
                        moduleIndex={ index }
                        onHide={ () => {
                          setFieldValue(`modules.${ index }.isEditing`, false);
                        } }
                        onSave={ () => {
                          setFieldValue(`modules.${ index }.isSaved`, true);
                          setFieldValue(`modules.${ index }.isEditing`, false);
                        } }
                      />
                    ))
                  }
                </>
              ) }
            </FieldArray>
          </Form>
        ) }
      </Formik>
      }
    </PageContent>
  );
};

export default EditCourse;
