import React from 'react';
import { Card } from 'react-bootstrap';
import { getNamespacedFieldName } from '../../../utils/helpers';
import { FieldArray } from 'formik';
import ActionButton from '../../shared/components/ActionButton';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import VideoAssociationList from './VideoAssociationList';
import LineBreak from '../../shared/components/LineBreak';

const QuizEditor = ({
  fieldNamespace,
  quiz
}) => {
  return (
    <Card>
      <Card.Body>
        <Card.Title>
          <h2>Quiz</h2>
        </Card.Title>

        <fieldset className="fieldset">
          <legend>
            Videos
          </legend>
          <FieldArray name={getNamespacedFieldName(fieldNamespace, 'videos')}>
            {({ insert, remove, push }) => (
              <>
                <ActionButton
                  size="sm"
                  className="mb-2"
                  icon={faPlusCircle}
                  onClick={() => {
                    push({ title: '', url: '' });
                  }}>
                  Add Video
                </ActionButton>

                <LineBreak />
                <VideoAssociationList
                  videos={quiz.videos}
                  fieldNamespace={getNamespacedFieldName(fieldNamespace, 'videos')} />
              </>
            )}
          </FieldArray>
        </fieldset>
      </Card.Body>
    </Card>
  );
};

export default QuizEditor;