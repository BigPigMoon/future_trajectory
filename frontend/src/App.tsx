import { Navbar } from "./components/Navbar";
import { AboutObject } from "./pages/AboutObject";
import { NotFound } from "./pages/NotFound";
import { YaMap } from "./pages/YaMap";
import { Routes, Route } from "react-router-dom";
import { Charts } from "./pages/Сharts";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<NotFound />} />

        <Route path="/" element={<YaMap />} />
        <Route path="/charts" element={<Charts />} />
        <Route path="/about/:id" element={<AboutObject />} />
      </Routes>
    </>
  );
}

export default App;
