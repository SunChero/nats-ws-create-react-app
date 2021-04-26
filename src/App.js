import './App.css';
import logo from './logo.svg';
import { connect, StringCodec } from "./nats"

function App() {
  init()
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      
    </div>
  );
}

export default App;

let init = async () =>{

  const nc = await connect({ servers: "ws.nats.server:443" });
  const sc = StringCodec();
  const sub = nc.subscribe("hello");
  (async () => {
    for await (const m of sub) {
      console.log(`something new[${sub.getProcessed()}]: ${sc.decode(m.data)}`);
    }
    console.log("subscription closed");
  })();
  nc.publish("hello", sc.encode("world"));
  nc.publish("hello", sc.encode("again"));
}
