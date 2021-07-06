import React, { useEffect, useState } from 'react';
import { Avatar, Button, Card, Comment, Form, Input, List } from 'antd';
import exerciseService from './exercise.service';
import { useSelector } from 'react-redux';

const ExerciseComments = ({
  exercise,
  comments
}) => {
  const [allComments, setAllComments] = useState([]);

  useEffect(() => {
    if (!allComments?.length) {
      if (comments?.length) {
        const formattedComments = comments.map(comment => {
          return {
            ...comment,
            content: comment.text,
            author: `${comment.user?.firstName} ${comment.user?.lastName}`,
            avatar: comment.user?.avatarUrl
              ? <Avatar src={comment.user?.avatarUrl} />
              : <></>
          };
        });

        setAllComments(formattedComments);
      }
    }
  }, [comments?.length]);

  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const user = useSelector(state => state.auth.user);

  const handleChange = e => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    await exerciseService.addComment(user?.id, exercise?.id, comment);

    setAllComments([
      ...allComments,
      {
        author: `${user?.firstName} ${user?.lastName}`,
        content: comment,
        avatar: user?.avatarUrl
          ? <Avatar src={user?.avatarUrl} />
          : <></>
      }
    ]);

    setIsSubmitting(false);
    setComment('');
  };

  return (
    <Card>
      <Card.Meta title="Comments/Feedback" />

      {allComments?.length > 0 && <CommentList comments={allComments} />}

      <Comment
        avatar={
          <Avatar
            src={user?.avatarUrl || 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'}
            alt={`${user?.firstName} ${user?.lastName}`} />
        }
        content={
          <Editor
            onChange={handleChange}
            onSubmit={handleSubmit}
            submitting={isSubmitting}
            value={comment} />
        } />
    </Card>
  );
};

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'comments' : 'comment'}`}
    itemLayout="horizontal"
    renderItem={({ content, avatar, author }) => <Comment
      content={content}
      avatar={avatar}
      author={author} />} />
);

const Editor = ({
  onChange,
  onSubmit,
  submitting,
  value
}) => (
  <>
    <Form.Item>
      <Input.TextArea
        rows={4}
        onChange={onChange}
        value={value} />
    </Form.Item>
    <Form.Item>
      <Button
        htmlType="submit"
        loading={submitting}
        onClick={onSubmit}
        type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

export default ExerciseComments;