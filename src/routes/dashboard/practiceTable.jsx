import { Grid } from "@mui/material";
import {
  Button,
  Form,
  Spin,
  Table,
  Tag,
  Tooltip,
  message
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../../shared/context/auth-context";
import useHttpClient from "../../shared/hooks/http-hook";
import {
  difficultyOptions,
  proficiencyOptions,
  reviewOptions,
  tagOptions,
  topicOptions,
} from "./consts";
import EditableCell from "./editableCell";
import { EditableContext } from "./editableContext";


const onValuesChange = (changedValues, allValues) => {
  console.log("onValuesChange", changedValues, allValues);
};

// eslint-disable-next-line no-unused-vars, react/prop-types
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

// function Expanded({ exerciseLogs }) {
//   return (
//     <p
//       style={{
//         margin: 0,
//       }}
//     >
//       {exerciseLogs.map((log) => (
//         <Typography>
//           {log.exerciseResult} @{log.createdAt}{" "}
//         </Typography>
//       ))}
//     </p>
//   );
// }

function PracticeTable() {
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
  const loadData = () => {
    auth.isLoggedIn &&
      sendRequest("/api/practice", "GET", undefined, authHeaders)
        .then((data) => {
          setDataSource(data.data);
        })
        .catch(() => {
          console.log(error);
          message.error(error);
          clearError();
          setDataSource(null);
        });
  };
  const handleSyncPractices = async () => {
    auth.isLoggedIn &&
      sendRequest("/api/practice/sync", "POST", undefined, authHeaders)
        .then(() => {
          message.info("sync success");
          loadData();
        })
        .catch(() => {
          console.log(error);
          message.error(error);
          clearError();
        });
  };

  useEffect(() => {
    loadData();
  }, [auth]);

  const save = (values, record) => {
    const row = {
      ...record,
      ...values,
    };
    console.log("save", values, record);
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row._id === item._id);
    console.log("find the index is", index);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    sendRequest(
      "/api/practice/" + record._id,
      "PATCH",
      JSON.stringify(values),
      authHeaders
    ).then(() => {
      setDataSource(newData);
      message.info("update success");
    });
  };
  const defaultColumns = [
    {
      title: "title",
      dataIndex: "title",
      width: "15%",
      render: (_, record) => {
        return (
          <div>
            <a href={record.url} target="_blank" rel="noreferrer">
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
      title: "Difficulty",
      dataIndex: "difficulty",
      width: "3%",
      filters: difficultyOptions,
    },
    {
      title: "Topic",
      width: "10%",
      render: (_, record) => {
        return (
          <div>
            {record.topicTags &&
              record.topicTags.map((tag, index) => (
                <Tag key={index} color="orange">
                  {tag.name}
                </Tag>
              ))}
          </div>
        );
      },
      filters: topicOptions,
      filterSearch: true,
      onFilter: (value, record) => {
        console.log("topics", record.topicTags);
        return (
          record.topicTags &&
          record.topicTags.some((x) => x.name.indexOf(value) >= 0)
        );
      },
    },
    {
      title: "Last Submitted",
      width: "10%",
      sorter: (a, b) => a.lastSubmittedAt - b.lastSubmittedAt,
      // dataIndex: '',
      render: (_, record) => {
        return <div>{record.lastSubmittedAtTime}</div>;
      },
    },

    {
      title: "tag",
      editable: true,
      width: "15%",
      inputType: "tag",
      options: tagOptions,
      dataIndex: "tags",
      onFilter: (value, record) => {
        console.log(record.tags.indexOf(value));
        return record.tags.indexOf(value) >= 0;
      },
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
      title: "Review",
      dataIndex: "review",
      width: "10%",
      inputType: "select",
      options: reviewOptions,
      editable: true,
      filters: reviewOptions,
      render: (_, record) => (
        <div>{record.review ? <div>{record.review} </div> : <br />}</div>
      ),
    },
    {
      title: () => {
        return (
          <Tooltip
            title="-2:Unable to solve 
           -1:Partial understanding 0: Able to solve 1:Consistently solved 2: Fully mastered"
          >
            <span> Proficiency</span>
          </Tooltip>
        );
      },
      width: "3%",
      dataIndex: "proficiency",
      editable: true,
      inputType: "select",
      options: proficiencyOptions,
      onFilter: (value, record) => record.proficiency === value,
      sorter: (a, b) => a - b,
      render: (_, record) => (
        <div>{record.proficiency ? record.proficiency : <br />}</div>
      ),
      filters: proficiencyOptions,
    },
    {
      title: "Note",
      dataIndex: "note",
      editable: true,
      InputType: "text",
      render: (_, record) => <p>{record.note ? record.note : <br />}</p>,
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
      <Spin spinning={isLoading}>
        <Grid container justifyContent="flex-middle">
          <Grid item>
            <Button variant="contained" onClick={handleSyncPractices}>
              Sync Practices
            </Button>
          </Grid>
        </Grid>
      </Spin>

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

export default PracticeTable;
