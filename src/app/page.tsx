"use client";
import HomePage from "@/components/homepage";
import { enableReactTracking } from "@legendapp/state/config/enableReactTracking";
import { observer } from "@legendapp/state/react";

enableReactTracking({
  warnUnobserved: true,
});

const App = observer(function App() {
  return <HomePage />;
});

export default App;
