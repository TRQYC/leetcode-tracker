/* eslint-disable react/prop-types */
import { Form } from "antd";
import React, { useContext, useEffect, useRef, useState } from "react";
import { EditableContext } from "./editableContext";
import InputCell from "./inputCell";

const EditableCell = ({
  editable,
  children,
  dataIndex,
  record,
  inputType,
  options,
  save,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  useEffect(() => {
    if (editing) {
      if (inputRef.current) {
        inputRef.current.focus();
      } else {
        console.log("shit, input Ref is null");
      }
    }
  }, [editing]);
  //console.log("form is", form)

  const toggleEdit = () => {
    console.log("start edit, set Field value", dataIndex, record[dataIndex]);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
    setEditing(!editing);
  };

  const onBlur = () => {
    console.log("onBlur, toggleDiting");
    form.validateFields().then((values) => {save(values, record); toggleEdit();});
    
  };

  let childNode = children;

  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
      >
        <InputCell
          inputType={inputType}
          ref={inputRef}
          onBlur={onBlur}
          form={form}
          options={options}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  return <td {...restProps}>{childNode}</td>;
};

export default EditableCell;
