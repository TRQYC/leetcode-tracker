import { message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
import QuestionTable from "./dashboard/Table";

const StudyPlanDetailPage = () => {
    //当前所有plan下拉框
    //下面就是展示plan的table
    const [plan, setPlan] = useState()
    const {planId} = useParams();
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    if (error) {
        message.error(error)
        clearError()
    }
    console.log("plan is", plan)
    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
    };
    useEffect(() => {
        planId && sendRequest(`/api/studyplan/${planId}`, "GET", null, authHeaders)
            .then(
                (response) => setPlan(response))
            .catch(err => console.log(err))
    }, [])
    return (
        <div>
            {plan && <p>{plan.name} {plan.description}</p>}
            {plan && plan.patterns.map(pattern => 
            <div  key={pattern.name}>
                <h3>{pattern.name}</h3>
                <QuestionTable dataSource={pattern.questions} shownColums={['Title', 'Difficulty', 'Topic', 'Last Submitted']}/>
            </div>
            
            )}
        </div>
    )
}

export default StudyPlanDetailPage; 