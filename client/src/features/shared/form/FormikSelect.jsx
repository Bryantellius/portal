import React from "react";
import Select from "react-select";

const FormikSelect = ({
  field,
  form,
  options,
  isMulti = false,
}) => {
  const onChange = option => {
    form.setFieldValue(
      field.name,
      isMulti
        ? option.map(item => item.value)
        : option.value
    );
  };

  const getValue = () => {
    if (options) {
      return isMulti
        ? options.filter(option => field.value.indexOf(option.value) >= 0)
        : options.find(option => option.value?.toString() === field.value?.toString());
    } else {
      return isMulti ? [] : '';
    }
  };

  return (
    <Select
      name={field.name}
      value={getValue()}
      onChange={onChange}
      options={options}
      isMulti={isMulti}
    />
  );
};

export default FormikSelect;