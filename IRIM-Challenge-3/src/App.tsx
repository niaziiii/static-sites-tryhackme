/* eslint-disable @typescript-eslint/restrict-plus-operands */
import "./App.css";
import Layout from "./layout/Layout";
import "primereact/resources/themes/lara-light-indigo/theme.css";

import "primereact/resources/primereact.min.css";

function App() {
  return (
    <section className="min-h-screen bg-thm-600 text-white !overflow-hidden">
      <Layout />
    </section>
  );
}

export default App;
