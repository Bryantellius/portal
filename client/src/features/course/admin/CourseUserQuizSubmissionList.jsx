import React, { useEffect, useState } from 'react';
import { Typography } from 'antd';
import DataTable from '../../shared/dataTable/DataTable';
import { columnDefinitions } from '../../user/user.config';
import quizService from '../../quiz/quiz.service';

const { userQuizSubmissions } = columnDefinitions;


const CourseUserQuizSubmissionList = ({
  userId
}) => {
  const [submissions, setSubmissions] = useState([]);

  const columns = userQuizSubmissions;

  useEffect(() => {
    const fetchSubmissions = async () => {
      const submissions = await quizService.fetchSubmissionsByUserId(userId);

      setSubmissions(submissions);
    };

    fetchSubmissions();
  }, [userId]);

  return (
    <>
      <Typography.Title level={5}>
        Quiz Submissions
      </Typography.Title>

      {
        <DataTable
          columns={columns}
          data={submissions}
          loading={!(submissions && submissions?.length)} />
      }
    </>
  );
};

export default CourseUserQuizSubmissionList;