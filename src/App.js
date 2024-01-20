import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [user, setUser] = useState([]);
  const [newName, SetName] = useState("");
  const [newEmail, SetEmail] = useState("");
  const [newWebsite, SetWebsite] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, []);

  //Post method
  function addUser() {
    const name = newName.trim();
    const email = newEmail.trim();
    const website = newWebsite.trim();
    if (name && email && website) {
      fetch("https://jsonplaceholder.typicode.com/users", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          website,
        }),
        headers: {
          "Content-Type": "application/json;charset=UTF-8",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setUser([...user, data]);
          SetName("");
          SetEmail("");
          SetWebsite("");
        });
    }
  }

  function onchangeHandler(id, key, value) {
    setUser((user) => {
      return user.map((e) => {
        return e.id === id ? { ...user, [key]: value } : user;
      });
    });
  }

  //update method
  function updateUsers(id) {
    const updateUser = user.find((e) => e.id === id);
    console.log(updateUser);
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        updateUser,
      }),
    }).then((res) => res.json());
  }

  //delete method
  function deleteUsers(id) {
    fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        setUser((user) => {
          return user.filter((e) => e.id !== id);
        });
      });
  }

  return (
    <div className="App">
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>Website</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user.map((e) => {
            return (
              <tr key={e.id}>
                <td>{e.id}</td>
                <td>{e.name}</td>
                <td
                  contentEditable="true"
                  onChange={(value) => onchangeHandler(e.id, "email", value)}
                >
                  {e.email}
                </td>
                <td
                  contentEditable="true"
                  onChange={(value) => onchangeHandler(e.id, "website", value)}
                >
                  {e.website}
                </td>
                <td>
                  <button
                    className="button button1"
                    onClick={() => updateUsers(e.id)}
                  >
                    Update
                  </button>
                  <button
                    className="button button2"
                    onClick={() => deleteUsers(e.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td>
              <input
                value={newName}
                onChange={(e) => {
                  SetName(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                value={newEmail}
                onChange={(e) => {
                  SetEmail(e.target.value);
                }}
              />
            </td>
            <td>
              <input
                value={newWebsite}
                onChange={(e) => {
                  SetWebsite(e.target.value);
                }}
              />
            </td>
            <td>
              {" "}
              <button className="button button3" onClick={addUser}>
                Add User
              </button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}

export default App;
