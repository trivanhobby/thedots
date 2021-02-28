import React from "react";
import "./App.css";
import { Button, Card, Form } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function Intent({ intent, index, removeIntent }) {
  return (
    <div
      className="intent"
      
    >
      <span>{intent.raw}</span>
      <div>
        <Button variant="outline-danger" onClick={() => removeIntent(index)}>✕</Button>
      </div>
    </div>
  );
}

function FormIntent({ addIntent }) {
  const [value, setValue] = React.useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addIntent(value);
    setValue("");
  };

  return (    
    <Form onSubmit={handleSubmit}> 
    <Form.Group>
      <Form.Label><b>Добавить</b></Form.Label>
      <Form.Control type="text" className="input" value={value} onChange={e => setValue(e.target.value)} placeholder="Я ..." />
    </Form.Group>
    <Button variant="primary mb-3" type="submit">
      Submit
    </Button>
  </Form>
  );
}

function App() {
  const [state, setState] = React.useState([
  ]);

  const refreshIntents = () => {
    fetch('/intents')
      .then(res => res.json())
      .then(setState)
  }

  const addIntent = text => {
    fetch('/intent', {
      method: 'POST',
      body: JSON.stringify({ "intent": text }),
      headers: { 'Content-Type': 'application/json' },
    })
      .then(res => refreshIntents())
  };

  const removeIntent = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setState(newTodos);
  };

  refreshIntents()
  return (
    <div className="app">
      <div className="container">
        <h1 className="text-center mb-4">Todo List</h1>
        <p>Я съела ...</p>
        <p>Я начала принимать ...</p>
        <p>Голод ...</p>
        <FormIntent addIntent={addIntent} />
        <div>
          {state.map((item, index) => (
            <Card>
              <Card.Body>
                <Intent
                key={index}
                index={index}
                intent={item}
                removeIntent={removeIntent}
                />
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;