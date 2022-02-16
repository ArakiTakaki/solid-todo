import type { Component } from 'solid-js';

import styles from './App.module.css';
import { Todo } from './pages/Todo';
import { localStorageTodoRepository } from './repository/todoRepository';
import { createExampleTodo } from './stores/todo';
import { pushTask } from './usecases/todo';

const App: Component = () => {
  const handleMockTodo = () => {
    const task = createExampleTodo();
    pushTask(task);
  }
  
  return (
    <div class={styles.App}>
      <p>
        <Todo
          restoreRepository={localStorageTodoRepository.restore}
          saveRepository={localStorageTodoRepository.save}
        />
      </p>
      <button onClick={handleMockTodo}>
        add todo
      </button>
    </div>
  );
};

export default App;
