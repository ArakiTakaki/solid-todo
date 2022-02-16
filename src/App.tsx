import type { Component } from 'solid-js';

import './App.css';
import { Button } from './components/Button';
import { Text } from './components/Text';
import { Todo } from './pages/Todo';
import { localStorageTodoRepository } from './repository/todoRepository';
import { createExampleTodo } from './stores/todo';
import { pushTask } from './usecases/todo';

const App: Component = () => {
  const handleMockTodo = () => {
    const task = createExampleTodo();
    pushTask(task.title, task);
  }
  
  return (
    <div>
      <p>
        <Todo
          restoreRepository={localStorageTodoRepository.restore}
          saveRepository={localStorageTodoRepository.save}
        />
      </p>
      <Text />
      <Button onClick={handleMockTodo}>
        追加
      </Button>
    </div>
  );
};

export default App;
