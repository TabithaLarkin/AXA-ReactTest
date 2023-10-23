import React, { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Todo, User } from '../types';
import Loading from '../components/Loading';

export default function Todo() {
  const location = useLocation();
  let todo: Todo | null = null;

  // try to use the already loaded todo information from the home page.
  if (location.state?.todo != null) {
    todo = location.state?.todo;
  }

  const [state, setState] = useState<{
    todo: Todo | null;
    user: User | null;
    notExists: boolean;
  }>({ todo, user: null, notExists: false });

  const { id } = useParams();

  const fetchTodoInfo = async () => {
    let fetchedTodo = state.todo;
    // If the todo hasn't been loaded from the previous page, then retrieve it from the api
    if (fetchedTodo == null) {
      let failure = false;
      fetchedTodo = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
        .then((res) => {
          if (res.status !== 200) {
            failure = true;
            return null;
          }

          return res.json();
        })
        .catch(() => (failure = true));

      setState({ todo: fetchedTodo, user: null, notExists: failure });
    }
    // If the loaded todo has a user then load the user as well.
    if (fetchedTodo?.userId != null) {
      // Load the user associated with the Todo
      return fetch(`https://jsonplaceholder.typicode.com/users/${fetchedTodo?.userId}`)
        .then((res) => res.json())
        .then((user) => setState({ todo: fetchedTodo, user, notExists: false }));
    }
  };

  useEffect(() => {
    fetchTodoInfo();
  }, []);

  return (
    <>
      {state.notExists ? (
        <div className="warn">
          <h2>404</h2>
          <p>A todo with the id {id} was not found.</p>
        </div>
      ) : (
        <>
          {state.user == null && state.todo == null ? (
            <Loading />
          ) : (
            <>
              {state.todo != null && (
                <>
                  <header className="todo-header">
                    <div className="complete-icon">{state.todo.completed ? '✔' : '❌'}</div>
                    <h2>{state.todo.title}</h2>
                  </header>
                  <div className="todo-detail">
                    <p>Todo Id: {state.todo.id}</p>
                    <h3>Todo Owner</h3>
                    <p>{state.user ? state.user.name : 'Loading user details...'}</p>
                  </div>
                </>
              )}
            </>
          )}
        </>
      )}
      <Link to="/" className="return-link">
        ← Return to the Todo List
      </Link>
    </>
  );
}
