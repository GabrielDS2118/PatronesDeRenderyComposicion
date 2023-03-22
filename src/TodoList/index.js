import React from 'react';
import './TodoList.css';

function TodoList(props) {
  const renderType = props.children || props.render;
  return (
    <section className="TodoList-container">
      {props.err && props.onError()}
      {props.loading && props.onLoading()}
      {!props.loading && !props.todos.length && props.onEmptyTodos()}
      {props.searchValue &&
        !props.searchedTodos.length &&
        props.onEmptySearchTodos()}
      {props.searchedTodos.map(renderType)}
    </section>
  );
}

export { TodoList };
