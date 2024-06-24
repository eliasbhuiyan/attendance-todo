import { useEffect, useState } from "react";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  remove,
  update,
} from "firebase/database";

const AddStudent = () => {
  const [inputData, setInputData] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [realtime, setRealtime] = useState(false);
  const [editTodo, setEditTodo] = useState("");
  const db = getDatabase();
  const handleSubmit = () => {
    set(push(ref(db, "todo/")), {
      todoName: inputData,
      attendance: false,
    }).then(() => {
      setInputData("");
      setRealtime(!realtime);
    });
  };
  const handleDelete = (id) => {
    remove(ref(db, "todo/" + id)).then(() => setRealtime(!realtime));
  };
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "todo/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setTodoList(arr);
    });
  }, [realtime]);
  console.log(todoList);
  const handelEdit = (item) => {
    setEditTodo(item);
  };
  const handelUpdate = () => {
    update(ref(db, "todo/" + editTodo.id), {
      todoName: editTodo.todoName,
    }).then(() => {
      setEditTodo("");
      setRealtime(!realtime);
    });
  };
  return (
    <div className="flex justify-center flex-col items-center h-screen bg-slate-400">
      <h1 className="heading">Student Attendance List</h1>
      <div className="pt-8">
        <input
          value={editTodo ? editTodo.todoName : inputData}
          className="border-2"
          type="text"
          placeholder="Enter Student Name"
          onChange={(e) => {
            editTodo
              ? setEditTodo({ ...editTodo, todoName: e.target.value })
              : setInputData(e.target.value);
          }}
        />
        {editTodo ? (
          <button onClick={handelUpdate} className="button ml-2">
            Update
          </button>
        ) : (
          <button onClick={handleSubmit} className="button ml-2">
            Submit
          </button>
        )}
      </div>

      <div className="mt-8">
        <ul>
          {todoList.map((item, i) => (
            <li key={item.id}>
              <p className="text-2xl">{++i}</p>
              <p className="w-52">{item.todoName}</p>
              <button
                onClick={() => handleDelete(item.id)}
                className="buttonTwo"
              >
                Delete
              </button>
              <button onClick={() => handelEdit(item)} className="buttonThree">
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default AddStudent;
