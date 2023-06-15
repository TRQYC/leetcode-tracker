
import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Tag, Table, Rate, Select } from "antd";
import { masterLeveloptions, tagOptions } from "./consts";

  
const InputCell = ({ inputType, form, ...props }) => {
    const onTagChange = async (value) => {
      console.log("on tag change", value);
      return 
      form.setFieldsValue({
        tags: value,
      });
      console.log(" onTagChange getFieldsValue", form.getFieldsValue(true));
      const values = await form.validateFields();
      console.log("onTagChange validateFields value is ", values);
    };
    //组件需要标签列表
    switch (inputType) {
      case "select":
        return <Select options={masterLeveloptions} {...props} />;
      case "tag":
        return (
          <Select
            mode="tags"
            options={tagOptions}
            onChange={onTagChange}
            {...props}
          />
        );
      default:
        return <Input {...props} />;
    }
  };

  export default InputCell