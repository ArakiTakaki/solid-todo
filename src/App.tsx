import type { Component } from 'solid-js';

import './App.css';
import { Todo } from './pages/Todo';
import { localStorageTodoRepository } from './repository/todoRepository';

const App: Component = () => {
  return (
    <div>
      <Todo
        restoreRepository={localStorageTodoRepository.restore}
        saveRepository={localStorageTodoRepository.save}
      />
    </div>
  );
};

export default App;
