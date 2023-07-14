/* eslint-disable react/prop-types */

import { Button, Card, List, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
import CreateStudyPlan from "./components/createStudyPlan";


const StudyPlanList = ({ plans }) => {

    return (
        <div>

            <List
                itemLayout="horizontal"
                grid={{
                    gutter: 30,
                    column: 3,
                }}
                dataSource={plans}

                renderItem={(item) => (
                    <List.Item>
                        <Card
                            extra={
                                <div><a href={`/studyplan/${item.id}`}>Practice</a></div>
                            }
                            title={item.name}>{item.description}</Card>
                    </List.Item>
                )} />
        </div>
    )
}


const StudyPlanListPage = () => {
    const navigate = useNavigate();
    const [plans, setPlans] = useState()
    const [showDrawer, setShowDrawer] = useState()
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
            <Button type="primary" onClick={() => {
                 if (!auth || !auth.userId) {
                    navigate("/auth");
                  }else {
                    setShowDrawer(true)}
                  }
                }>
                New Study Plan
            </Button>
            <CreateStudyPlan open={showDrawer} setOpen={setShowDrawer} ></CreateStudyPlan>
            <StudyPlanList plans={plans}></StudyPlanList>
        </div>
    )
}

export default StudyPlanListPage; 