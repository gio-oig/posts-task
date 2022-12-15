import { Route, Routes } from "react-router-dom";
import Home from "./pages/home/home";
import Post from "./pages/post/post";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:id" element={<Post />} />
      </Routes>
    </div>
  );
}

export default App;
