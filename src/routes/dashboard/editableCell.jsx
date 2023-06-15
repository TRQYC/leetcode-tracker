import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Tag, Table, Rate, Select } from "antd";
import InputCell from "./inputCell";
import { EditableContext } from "./editableContext";

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  inputType,
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