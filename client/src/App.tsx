import { Route, Routes } from "react-router";
import ImageCompressor from "./Root/pages/Image-compressor";
import RootLayout from "./Root/RootLayout";
import Tools from "./Root/pages/Tools";
import Home from "./Root/pages/Home";
import About from "./Root/pages/About";
import Contact from "./Root/pages/Contact";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/tools" element={<Tools />} />
          <Route path="/tools/image-compressor" element={<ImageCompressor />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </>
  );
}
