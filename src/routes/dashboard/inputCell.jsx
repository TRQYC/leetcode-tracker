/* eslint-disable react/prop-types */

import { Input, Select } from "antd";
import React from "react";

  
const InputCell = ({ inputType, options, ...props }) => {
    const onTagChange = async (value) => {
      console.log("on tag change", value);
      //todo 这里
      // form.setFieldsValue({
      //   tags: value,
      // });
      // console.log(" onTagChange getFieldsValue", form.getFieldsValue(true));
      // const values = await form.validateFields();
      // console.log("onTagChange validateFields value is ", values);
    };
    //组件需要标签列表
    switch (inputType) {
      case "select":
        return <Select options={options} {...props} />;
      case "tag":
        return (
          <Select
            mode="tags"
            options={options}
            onChange={onTagChange}
            {...props}
          />
        );
      default:
        return <Input {...props} />;
    }
  };

  export default InputCell