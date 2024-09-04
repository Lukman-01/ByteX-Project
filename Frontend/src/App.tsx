import "@rainbow-me/rainbowkit/styles.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { WagmiProvider } from "wagmi";
import { config } from "../config";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DashboardContent from "./components/Content";
import TrackingPage from "./components/TrackingPage";

const queryClient = new QueryClient();
{
  /* <LandingPage /> */
}
function App() {
  return (
    <>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitProvider modalSize="wide">
            <Router>
              <Routes>
                <Route path="/dashboard" element={<DashboardContent />} />
                <Route path="/tracking" element={<TrackingPage />} />
              </Routes>
            </Router>
          </RainbowKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </>
  );
}

export default App;
