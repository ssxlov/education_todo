import React from 'react';
import './App.css';
import TodoList from "./app/Containers/TodoList/TodoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/*todo place your todo header here */}
      </header>
      <section>
        <TodoList />
      </section>
    </div>
  );
}

export default App;
