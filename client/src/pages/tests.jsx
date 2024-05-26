import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export const Tests = () => {
    async function getTests() {
        axios.get('http://localhost:3000/tests').then((res) => {
            setTests(res.data.tests);
        })
        .catch((err) => {
            alert(err);
        })
    }

    const [tests, setTests] = useState([]);
    const [title, setTitle] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        getTests();
      }, [])

    const teacher = localStorage.getItem("teacher");

    const data = {
        title: title,
    } ;

    async function addNewTest() {
        axios.post('http://localhost:3000/tests', data).then(() => {
            navigate('/tests');
            setTitle('');
            getTests();
        })
        .catch((err) => {
            alert(err);
        })
    }

    async function deleteTest(id) {
        axios.delete(`http://localhost:3000/tests/${id}`).then(() => {
            navigate('/tests');
            getTests();
        })
        .catch((err) => {
            alert(err);
        })
    }

    return (teacher === "true") ? 
    (
        <div className="body">
            <Link to='/' className='btnExit'>Exit</Link>
            <h1>Tests Teacher</h1>
            <br></br>
            <div>
                <input type="text" name="newTest" id="newTest" value={title} style={{marginRight: "16px",}} onChange={(e) => setTitle(e.target.value)}/>
                <button className='btnAddTest' onClick={addNewTest}>Add Test</button>
            </div>
            <div>
                {tests.map((test, index) => (
                    <div style={{display: "flex", alignItems: "center", marginBottom: "16px"}}>
                        <div className="title">{index + 1}. {test.title}</div>
                        <button id={test._id} className='btnDeleteTest' onClick={(e) => deleteTest(e.target.id)}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    ) :
    (
        <div className="body">
            <Link to='/' className='btnExit'>Exit</Link>
            <h1>Tests User</h1>
            <br></br>
            {tests.map((test, index) => (
                <div className="title" style={{marginBottom: "16px"}}>{index + 1}. {test.title}</div>
            ))}
        </div>
    );
};