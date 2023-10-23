import React, { useState, useEffect } from 'react';
import { Todo } from '../types';
import CardList from '../components/CardList';
import Loading from '../components/Loading';

// Home function that is reflected across the site
export default function App() {
  const [state, setState] = useState<{
    query: string;
    items: Todo[];
    filtered: Todo[];
    loaded: boolean;
  }>({ query: '', items: [], filtered: [], loaded: false });

  const fetchTodos = () => {
    // Load the full list of todos from the API
    return fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((d) => setState({ query: '', items: d, filtered: [], loaded: true }));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Current value of the search function
    const filter = e.target.value.toLowerCase();

    // Default to an empty list
    let filtered: Todo[] = [];

    // If a filter has been set, then update to a filtered list
    if (filter !== '') {
      filtered = state.items.filter((todo) => {
        return todo.title.toLowerCase().includes(filter);
      });
    }

    // Update the state with the new list of filtered items
    setState({
      query: e.target.value,
      items: state.items,
      filtered,
      loaded: true
    });
  };

  const items = state.query.length > 0 ? state.filtered : state.items;

  return (
    <>
      {state.loaded ? (
        <>
          <div className="search">
            <form className="search-form" name="search" role="search">
              <input
                id="searchInput"
                type="search"
                name="query"
                autoComplete="off"
                placeholder="Search for a Todo"
                value={state.query}
                onChange={handleChange}
              />
              <button type="submit" disabled>
                <svg viewBox="0 0 512 512">
                  <use href="/img/icons.svg#search" />
                </svg>
              </button>
            </form>
          </div>

          <CardList todos={items} />
        </>
      ) : (
        <Loading />
      )}
    </>
  );
}
