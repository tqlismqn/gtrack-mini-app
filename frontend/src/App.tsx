import React from "react";

export default function App(): JSX.Element {
  return (
    <div className="app-shell">
      <header className="app-header">
        <h1>Drivers Management v2.8</h1>
        <p>Frontend scaffold is ready. Implement split layout in later steps.</p>
      </header>
      <main className="app-content">
        <section className="placeholder left">Drivers table will appear here.</section>
        <section className="placeholder right">Driver detail card will appear here.</section>
      </main>
    </div>
  );
}
