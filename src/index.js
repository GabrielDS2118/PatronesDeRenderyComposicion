import React from 'react';
import ReactDOM from 'react-dom';
// import App from './App/index.js';
import './index.css';

function App({ gretting, name }) {
  return (
    <h1>
      !{gretting} {name}
    </h1>
  );
}

function withWhatever(WrappedComponent) {
  return function componenteDeVerdad(props) {
    return (
      <>
        <WrappedComponent {...props} />
        <p>Estoy aprendiendo HOC</p>
      </>
    );
  };
}

const AppWithWhatever = withWhatever(App);

ReactDOM.render(
  <AppWithWhatever gretting="Buenos días" name="Maritzita" />,
  document.getElementById('root')
);
