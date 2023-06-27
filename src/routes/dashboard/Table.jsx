/* eslint-disable react/prop-types */
import {
  Form,
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

function QuestionTable({ dataSource, shownColums}) {
  //dataSource && console.log("dataSoruce is", dataSource);
  const auth = useContext(AuthContext);
  const {error, sendRequest, clearError } = useHttpClient();
  const [site, setSite] = useState('en');
  const authHeaders = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + auth.token,
  };
  if (error) {
    console.log("error is ", error)
    message.error(error);
    clearError();
  }

  const loadConfig = () => {
    auth.isLoggedIn &&
      sendRequest("/api/users", "GET", undefined, authHeaders)
        .then((data) => {
          data.site && setSite(data.site)
        })
        .catch(() => {
        });
  };

  useEffect(loadConfig, [])

  const save = (values, record) => {
    sendRequest(
      "/api/practice/" + record._id,
      "PATCH",
      JSON.stringify(values),
      authHeaders
    ).then(() => {
      //todo reload page 
      message.info("update success");
    });
  };

  const EditableComponent = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
 
  const defaultColumns = [
    {
      title: "Title",
      dataIndex: "title",
      width: "15%",
      sorter: (a, b) => a.questionId - b.questionId,
      render: (_, record) => {
        const url = (site == "en" ? `https://leetcode.com/problems/${record.titleSlug}`: `https://leetcode.cn/problems/${record.titleSlug}`)
        return (
          <div>
            <a href={url} target="_blank" rel="noreferrer">
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
      width: "15%",
      dataIndex: "topicTags",
      render: (_, record) => {
        return (
          <div>
            {record.topicTags &&
              record.topicTags.map((tag, index) => (
                <Tag key={index} color="orange">
                  {tag}
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
      title: "Tag",
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


  let columns = defaultColumns.map((col) => {
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
  if (shownColums && shownColums.length > 0) {
 columns = columns.filter(column => shownColums.indexOf(column.title) != -1)
  }
 
  return (
    <div>
      <Table
        rowKey={(record) => record.title} //todo 改成id
        components={EditableComponent}
        rowClassName={() => "editable-row"}
        bordered
        dataSource={dataSource}
        columns={columns}
      />
    </div>
  );
}

export default QuestionTable;
