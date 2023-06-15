import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Form, Input, Tag, Table, Rate, Select, message } from "antd";
import { Typography, Stack } from "@mui/material";
import AuthContext from "../../shared/context/auth-context";
import useHttpClient from "../../shared/hooks/http-hook";
import { EditableSelect } from "./editableSelect";
import EditableCell from "./editableCell";
import { EditableContext } from "./editableContext";
import { masterLeveloptions, tagOptions } from './consts';
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



function Expanded({ exerciseLogs }) {
  return (
    <p
      style={{
        margin: 0,
      }}
    >
      {exerciseLogs.map((log) => (
        <Typography>
          {log.exerciseResult} @{log.createdAt}{" "}
        </Typography>
      ))}
    </p>
  );
}




function ExerciseRecordTable() {
  const [dataSource, setDataSource] = useState();
  dataSource && console.log("dataSoruce is", dataSource);
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const authHeaders  = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + auth.token,
  }
  let showData; 
  function onChange(pagination, filters, sorter, extra) {
    console.log('params', pagination, filters, sorter, extra);
    showData = [];
    
  }
  useEffect(() => {
    sendRequest("/api/exercise_records", "GET", undefined, authHeaders).then((data) => {setDataSource(data.data)}).catch(() => {
      console.log(error)
      message.error(error)
      clearError()
      setDataSource(null)
    });
  }, []);

  const save = (values, record) => {
    const row = {
      ...record,
      ...values,
    };
    console.log("save", values, record)
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row._id === item._id);
    console.log("find the index is", index);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    sendRequest('/api/exercise_records/'+record._id, "PATCH", JSON.stringify(values), authHeaders).then(() => {setDataSource(newData); message.info("update success")})
  };
  const defaultColumns = [
    {
      title: "title",
      dataIndex: "title",
      width: "15%",
      render: (_, record) => {
        console.log("render title", record);
        return (
          <div>
            <a href={record.url} target="_blank">{record.title}</a>
            <Tag color="orange">{record.difficulty}</Tag>
          </div>
        );
      },
      // onFilter: (value, record) => !record.title.include(value),
      // sorter: (a, b) => a.title < b.title,
    },
    {
      title: "LastSubmission",
      width: "13%",
      // dataIndex: '',
      render: (_, record) => (
        <Stack spacing={1} direction="row">
          <Typography>
            {record.lastSubmitted}
          </Typography>
          {record.lastSubmissionList && record.lastSubmissionList.map((state) => (
            <Typography variant="body2" component="p">
              {state}
            </Typography>
          ))}
        </Stack>
      ),
    },
    {
      title: "tag",
      editable: true,
      width: "15%",
      inputType: "tag",
      dataIndex: "tags",
      onFilter: (value, record) => {console.log(record.tags.indexOf(value)); return record.tags.indexOf(value) >= 0},
      render: (_, record) => (
        <div>
          {record.tags && record.tags.length > 0 ? (
            record.tags.map((tag, index) => (
              <Tag key={index} color="orange">
                {tag}
              </Tag>
            ))
          ) : (
            <br />
          )}
        </div>
      ),
      filters: tagOptions, 
      filterSearch: true, 
    },
    {
      title: "MasterLevel",
      width: "5%",
      dataIndex: "masterLevel",
      editable: true,
      inputType: "select",
      onFilter: (value, record) => record.masterLevel === value,
      sorter: (a, b) => a-b,
      filters: masterLeveloptions,
    },
    {
      title: "Note",
      dataIndex: "note",
      editable: true,
      InputType: "text",
      render: (_, record) => <p>{record.note ? record.note : <br />}</p>,
    },
    {
      title: "Rounds",
      dataIndex: "exerciseRounds",
      width: "5%",
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
        save, 
      }),
    };
  });

  return (
    <div>
      <Button>Filter</Button>
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

export default ExerciseRecordTable;
