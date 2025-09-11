import { BrowserRouter, Route, Routes } from "react-router-dom";
import GameMapList from "@/screens/GameMapList/GameMapList";
import { QueryClientProvider } from "@tanstack/react-query";
import "@/main.css";
import queryClient from "@/common/query/client.ts";
import NadeList from "@/screens/NadeList/NadeList.tsx";
import NadeDetails from "@/screens/NadeDetails/NadeDetails.tsx";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GameMapList />} />
          <Route path="/map/:id" element={<NadeList />} />
          <Route path="/nades/:id" element={<NadeDetails />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
