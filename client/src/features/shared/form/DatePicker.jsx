import React from 'react';
import ReactDatePicker from 'react-datepicker';
import moment from 'moment';

const DatePicker = ({
  onChange,
  value,
  ...props
}) => {

  return (
    <ReactDatePicker
      {...props}
      onChange={onChange}
      selected={moment(value).toDate()} />
  );
};

export default DatePicker;