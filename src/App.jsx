import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import ModalPeriodo from "./components/ModalPeriodo";
import Tabela from "./components/Tabela";
import { useState } from "react";

function App() {
    const [update, setUpdate] = useState(0);

    const handleUpdate = () => setUpdate((up) => up + 1);

    return (
        <div className="App">
            <h1>CRUD Período</h1>

            <ModalPeriodo handleUpdate={handleUpdate} />

            <Tabela key={update} handleUpdate={handleUpdate} />
        </div>
    );
}

export default App;
