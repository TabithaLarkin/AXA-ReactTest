import React from 'react';
import { Todo } from '../types';
import Card from './Card';

export default function CardList({ todos }: { todos: Todo[] }) {
  return (
    <>
      {todos.length > 0 ? (
        <div className="todoList">
          {todos.map((item) => (
            <Card key={item.id} todo={item} />
          ))}
        </div>
      ) : (
        <div className="warn">
          <p>No todos were found.</p>
        </div>
      )}
    </>
  );
}
