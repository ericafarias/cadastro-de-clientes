import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListClient from "./pages/listClients/ListClients";
import RegisterClient from "./pages/RegisterClient";
import { AppQueryProvider } from "./provider/queryProvider";
import Home from "./pages/Home";
import "animate.css";

function App() {
    return (
        <AppQueryProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/list" element={<ListClient />} />
                    <Route path="/register" element={<RegisterClient />} />
                </Routes>
            </BrowserRouter>
        </AppQueryProvider>
    );
}

export default App;
