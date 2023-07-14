import { Button, message } from "antd";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../shared/context/auth-context";
import useHttpClient from "../shared/hooks/http-hook";
import CreateStudyPlan from "./components/createStudyPlan";
import QuestionTable from "./dashboard/Table";

const StudyPlanDetailPage = () => {
    //当前所有plan下拉框
    //下面就是展示plan的table
    const [plan, setPlan] = useState()
    const { planId } = useParams();
    const [showDrawer, setShowDrawer] = useState(false)
    const auth = useContext(AuthContext);
    const { error, sendRequest, clearError } = useHttpClient();
    let editingPatterns;
    if (plan) {
        editingPatterns = plan.patterns.map(pattern => {
            if (pattern.questions) {
                console.log("questions is", pattern.questions)
                const questionIds = pattern.questions.map(question => {if (question) return question.frontendQuestionId})
                return {name:pattern.name, questionIds:questionIds.join(',')}
            }
        })
    } 
    const editingPlan = {...plan, patterns: editingPatterns}
    console.log("render plan detail, plan is ", plan)
    console.log("editing plan is ", editingPlan)
    //注意，这里与展示的plan共享questions。
    if (error) {
        console.log("error is", error)
        message.error(error)
        clearError()
    }
   
    const authHeaders = {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
    };
    useEffect(() => {
        planId && sendRequest(`/api/studyplan/${planId}`, "GET", null, authHeaders)
            .then(
                (response) => setPlan(response))
            .catch(err => console.log("shit", err))
    }, [])

    return (
        <div>
            <h1>Description</h1>
            {plan && plan.creatorUserId === auth.userId && <Button type="primary" onClick={() => {setShowDrawer(true)}}>
                Edit StudyPlan
            </Button>}
            <CreateStudyPlan open={showDrawer} setOpen={setShowDrawer} plan={editingPlan}></CreateStudyPlan>
            {plan && <p>{plan.name} {plan.description}</p>}
            <h1>Questions</h1>
            {plan && plan.patterns.map(pattern =>
                <div key={pattern.name}>
                    <h3>{pattern.name}</h3>
                    <QuestionTable dataSource={pattern.questions} shownColums={['Title', 'Difficulty', 'Topic', 'Last Submitted']} />
                </div>

            )}
        </div>
    )
}

export default StudyPlanDetailPage; 