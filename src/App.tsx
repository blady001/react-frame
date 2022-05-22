import './App.css';
import Editor from './components/Editor/Editor';

function App() {
  return (
    <div className="App">
      <h1>Reactframe</h1>
      <Editor />
    </div>
  );
}

export default App;

// DEFAULT CODE (for preview purposes)
// function App() {
//   return (
//     <div className="App">
//       {/* <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header> */}
//       <Editor />
//     </div>
//   );
// }