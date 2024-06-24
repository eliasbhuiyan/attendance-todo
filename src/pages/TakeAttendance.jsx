import { useEffect, useState } from "react";
import { getDatabase, ref, onValue, update } from "firebase/database";

const TakeAttendance = () => {
  const db = getDatabase();
  const [todoList, setTodoList] = useState([]);
  const [result, setResult] = useState(false);
  
  useEffect(() => {
    let arr = [];
    onValue(ref(db, "todo/"), (snapshot) => {
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), id: item.key });
      });
      setTodoList(arr);
    });
  }, [result]);
  console.log(todoList);
  const handelCheck = (e, id) => {
    update(ref(db, "todo/" + id), {
      attendance: e.target.checked,
    });
  };
  return (
    <section className="attendance">
      <div className="container">
        {!result ? (
          <div className="p-10 border rounded-xl">
            <h2 className="text-2xl border-b pb-5">Take Attendance</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start">#</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {todoList.map((item, i) => (
                  <tr key={item.id}>
                    <td>{++i}</td>
                    <td>{item.todoName}</td>
                    <td>
                      <label className="switch m-auto inline-block">
                        <div className="toggle-switch">
                          <input
                            id={item.id}
                            type="checkbox"
                            onChange={(e) => handelCheck(e, item.id)}
                          />
                          <label htmlFor={item.id}></label>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-5">
              <button onClick={() => setResult(true)} className="buttonThree">
                Submit
              </button>
            </div>
          </div>
        ) : (
          <div className="p-10 border rounded-xl">
            <h2 className="text-2xl border-b pb-5">Attendance Result</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-start">#</th>
                  <th>Student Name</th>
                  <th>Attendance</th>
                </tr>
              </thead>
              <tbody>
                {todoList.map((item, i) => (
                  <tr key={item.id}>
                    <td>{++i}</td>
                    <td>{item.todoName}</td>
                    <td>
                      <label className="switch m-auto inline-block">
                        <div className="toggle-switch">
                          {item.attendance ? (
                            <input type="checkbox" checked />
                          ) : (
                            <input type="checkbox" />
                          )}
                          <label></label>
                        </div>
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
};

export default TakeAttendance;
