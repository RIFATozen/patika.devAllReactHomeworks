import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [all, setAll] = useState([
    { id: 1, content: "Learn JavaScript", isChecked: true },
    { id: 1, content: "Learn React", isChecked: false },
    { id: 1, content: "Have a life!", isChecked: false },
  ]);

  const [todos, setTodos] = useState([...all]);
  const [active, setActive] = useState(
    all.filter((item) => item.isChecked === false)
  );
  const [completed, setCompleted] = useState(
    all.filter((item) => item.isChecked === true)
  );
  const [add, setAdd] = useState({ id: 1, content: "", isChecked: false });

  const [page, setPage] = useState("All");

  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    setActive(all.filter((item) => item.isChecked === false));
    setCompleted(all.filter((item) => item.isChecked === true));
  }, [all]);

  const onChangeInput = (e) => {
    all.forEach((item) => {
      if (item.content === e.target.value) {
        setAdd({ id: item.id + 1, content: e.target.value, isChecked: false });
      } else {
        setAdd({ id: 1, content: e.target.value, isChecked: false });
      }
    });
  };
  const handleKeyDown = (event) => {
    if (event.key === "Enter" && event.target.value !== "") {
      event.preventDefault();
      if (page === "Completed") {
        setTodos([...todos]);
      } else {
        setTodos([...todos, add]);
      }
      setAll([...all, add]);
      event.target.value = "";
    } else if (event.key === "Enter" && event.target.value === "") {
      event.preventDefault();
      setTodos(todos);
    }
  };
  const strikeOut = (event) => {
    const newTodos = todos.map((item, index) => {
      if (event.target.name === index.toString()) {
        setAll(
          all.map((it) => {
            if (item.content === it.content) {
              if (item.id === it.id) {
                return { ...it, isChecked: !item.isChecked };
              } else {
                return it;
              }
            } else {
              return it;
            }
          })
        );
        return { ...item, isChecked: !item.isChecked };
      } else {
        return item;
      }
    });

    setTodos(newTodos);
  };

  const onActive = () => {
    setPage("Active");
    setTodos(active);
  };
  const onAll = () => {
    setPage("All");
    setTodos(all);
  };
  const onCompleted = () => {
    setPage("Completed");
    setTodos(completed);
  };

  const remove = (e) => {
    const filtered = todos.filter(
      (item, index) => e.target.name !== index.toString()
    );
    const thrash = todos.filter((x) => !filtered.includes(x));

    const newArray = all.filter((x) => !thrash.includes(x));

    if (page === "All") {
      setTodos(filtered);
      setAll(filtered);
    } else if (page === "Active") {
      setTodos(filtered);
      setAll(newArray);
    } else if (page === "Completed") {
      setTodos(filtered);
      setAll(newArray);
    }
  };

  const clearAll = () => {
    const filtered = all.filter((item) => item.isChecked === false);
    setTodos(filtered);
    setAll(filtered);
  };
  const onToggle = () => {
    const newtg = all.map((item) => {
      if (toggle === false) {
        return { ...item, isChecked: true };
      } else {
        return { ...item, isChecked: false };
      }
    });
    setAll(newtg);
    if (page === "All") {
      setTodos(newtg);
    } else if (page === "Active") {
      setTodos((!toggle && []) || newtg);
    } else if (page === "Completed") {
      setTodos((toggle && []) || newtg);
    }

    setToggle(!toggle);
  };

  return (
    <>
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <form>
            <input
              onChange={onChangeInput}
              onKeyDown={handleKeyDown}
              className="new-todo"
              placeholder="What needs to be done?"
              autoFocus
            />
          </form>
        </header>

        {Boolean(all.length) && (
          <>
            <section className="main">
              <input
                className="toggle-all"
                type="checkbox"
                onChange={onToggle}
                checked={toggle}
              />
              <label onClick={onToggle} htmlFor="toggle-all">
                Mark all as complete
              </label>

              <ul className="todo-list">
                {todos.map((item, index) => (
                  <li
                    className={(item.isChecked && "completed") || ""}
                    key={index}
                  >
                    <div className="view">
                      <input
                        className="toggle"
                        name={index}
                        checked={item.isChecked}
                        onChange={strikeOut}
                        type="checkbox"
                      />
                      <label>{item.content}</label>
                      <button
                        className="destroy"
                        onClick={remove}
                        name={index}
                      ></button>
                    </div>
                  </li>
                ))}
              </ul>
            </section>

            <footer className="footer">
              <span className="todo-count">
                <strong>{active.length}</strong>
                items left
              </span>

              <ul className="filters">
                <li>
                  <a
                    onClick={onAll}
                    href="#/"
                    className={(page === "All" && "selected") || ""}
                  >
                    All
                  </a>
                </li>
                <li>
                  <a
                    onClick={onActive}
                    href="#/"
                    className={(page === "Active" && "selected") || ""}
                  >
                    Active
                  </a>
                </li>
                <li>
                  <a
                    onClick={onCompleted}
                    href="#/"
                    className={(page === "Completed" && "selected") || ""}
                  >
                    Completed
                  </a>
                </li>
              </ul>

              <button className="clear-completed" onClick={clearAll}>
                {(Boolean(completed.length) && "Clear completed") || ""}
              </button>
            </footer>
          </>
        )}
      </section>

      <footer className="info">
        <p>Click to edit a todo</p>
        <p>
          Created by <a href="https://d12n.me/">Dmitry Sharabin</a>
        </p>
        <p>
          Part of <a href="http://todomvc.com">TodoMVC</a>
        </p>
      </footer>
    </>
  );
}

export default App;
