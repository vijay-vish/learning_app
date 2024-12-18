import { useState } from "react";

function Todo() {
    const [list, setList] = useState([]);
    const [flag, setFlag] = useState(false);
    const [inputData, setInputData] = useState('')
    const [updatedValue, setUpdatedValue] = useState("");
    const [edit, setEdit] = useState('')
    const onSubmit = () => {
        if (inputData) {
            setList([...list, inputData])
        }

    }
    const filterData = (preIndex) => {
        const newData = list.filter((data, index) => index !== preIndex)
        setList(newData)
    }
    const update = (index) => {
        setEdit(index);
    }
    return <>
        <input type="text" placeholder="Enter something" onChange={(e) => setInputData(e.target.value)} />
        <button onClick={onSubmit}>Add</button>
        <div>
            <ul>
                {list.map((data, index) => <>
                    <div style={{ display: "flex", margin: "10px" }}>
                        <li key={index}>
                            <input id={`input${index}`} style={{ border: "none" }} disabled={index !== edit} type="text" value={data} />
                        </li>
                        <button style={{ marginLeft: "20px" }} onClick={() => { filterData(index) }}>Remove</button>
                        <button id={`update${index}`} style={{ marginLeft: "20px" }} onClick={() => {
                            update(index);
                        }}>Update</button>
                    </div>
                </>)}
            </ul>
        </div>
    </>
}

export default Todo;