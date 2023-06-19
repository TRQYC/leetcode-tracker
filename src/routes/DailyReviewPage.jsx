

import React, { useContext, useEffect, useRef, useState } from "react";
import { Form, Input, Tag, Table, Rate, Select, message, Spin, Button} from "antd";
import { Grid } from "@mui/material";
import { Typography, Stack } from "@mui/material";
import AuthContext from "../../shared/context/auth-context";
import useHttpClient from "../../shared/hooks/http-hook";
import { EditableSelect } from "./editableSelect";
import EditableCell from "./editableCell";
import { EditableContext } from "./editableContext";
import {
  tagOptions,
  proficiencyOptions,
  topicOptions,
  difficultyOptions,
  reviewOptions,
} from "./consts";
const { Option } = Select;

const onValuesChange = (changedValues, allValues) => {
  console.log("onValuesChange", changedValues, allValues);
};

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false} onValuesChange={onValuesChange}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};


function StudyPlan({studyPlanName}) {
  const [dataSource, setDataSource] = useState();
  dataSource && console.log("dataSoruce is", dataSource);
  const auth = useContext(AuthContext);
  console.log("render dashbaord", auth);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + auth.token,
  };
  if (error) {
    message.error(error);
    clearError();
  }

  useEffect(() => {
    auth.isLoggedIn &&
      sendRequest("/api/practice/dailyreview" , "GET", undefined, authHeaders)
        .then((data) => {
          setDataSource(data.data);
        })
        .catch(() => {
          console.log(error);
          message.error(error);
          clearError();
          setDataSource(null);
        });
  }, [auth]);

  const defaultColumns = [
    {
        title: "time",
        dataIndex: "time",
        width: "15%",
        render: (_, record) => {
          return (
            <div>
              <a href={record.url} target="_blank">
                {record.questionId + " " + record.title}
              </a>
            </div>
          );
        },
    },
    {
      title: "title",
      dataIndex: "title",
      width: "15%",
      render: (_, record) => {
        return (
          <div>
            <a href={record.url} target="_blank">
              {record.questionId + " " + record.title}
            </a>
          </div>
        );
      },

      onFilter: (value, record) =>
        record.questionId.include(value) || record.title.include(value),
      // sorter: (a, b) => a.title < b.title,
    },
    {
      title: "status",
      dataIndex: "status",
      width: "15%",
      filters: difficultyOptions,
    },
  ];

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  const columns = defaultColumns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        inputType: col.inputType,
        options: col.options,
        save,
      }),
    };
  });

  return (
    <div>
      <Table
        rowKey={(record) => record.title} //todo 改成id
        components={components}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default QuestionList;
