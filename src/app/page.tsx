"use client";
import HomePage from "@/components/homepage";
import { observer } from "@legendapp/state/react";

const App = observer(function App() {
  return <HomePage />;
});

export default App;
