/* eslint-disable react/prop-types */

import { Card, List, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import AuthContext from "../shared/context/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
import CreateStudyPlan from "./components/createStudyPlan";


const StudyPlanList = ({plans}) => {
    return  <List
    itemLayout="horizontal"
    grid={{
        gutter: 16,
        column: 4,
      }}
    dataSource={plans}
    renderItem={(item) => (
      <List.Item>
          <Card  extra={<a href={`/studyplan/${item.id}`}>Practice</a>} title={item.name}>{item.description}</Card>
      </List.Item>
    )}
  />
}


const StudyPlanListPage = () => {
    const [plans, setPlans] = useState()
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    if (error) {
        message.error(error)
        clearError()
    }
    console.log("plan is", plans)
    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
    };
    useEffect(() => {
         sendRequest(`/api/studyplan`, "GET", null, authHeaders)
            .then(
                (response) => setPlans(response))
            .catch(err => console.log(err))
    }, [])
   return (
    <div>
        <CreateStudyPlan></CreateStudyPlan>
        <StudyPlanList plans={plans}></StudyPlanList>
    </div>
   )
}

export default StudyPlanListPage; 