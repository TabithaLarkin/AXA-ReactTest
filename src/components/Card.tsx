import React from 'react';
import { Todo } from '../types';
import { Link } from 'react-router-dom';

export default function Card({ todo }: { todo: Todo }) {
  // Maximum displayed length of the title
  const titleMaxLength = 20;

  // Trim the title down to 20 characters, only appending the elipsis if the title is less than the maximum length.
  const trimmed =
    todo.title.substring(0, titleMaxLength).trim() +
    (todo.title.length > titleMaxLength ? '...' : '');

  const linkUrl = `/todo/${todo.id}`;

  return (
    // Pass the state of the todo through to the details page. This saves another fetch from the API.
    <Link
      to={linkUrl}
      state={{ todo }}
      id={`todo-${todo.id}`}
      className={`todo ${todo.completed ? 'completed' : ''}`}
      title={todo.title}
    >
      <h2>#{todo.id}</h2>
      <p>{trimmed}</p>
    </Link>
  );
}
