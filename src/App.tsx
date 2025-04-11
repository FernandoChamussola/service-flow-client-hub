
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ServiceRequestForm from "./components/ServiceRequestForm";
import ProposalsList from "./components/ProposalsList";
import ProposalDetail from "./components/ProposalDetail";
import ServiceProgress from "./components/ServiceProgress";
import ServiceApproval from "./components/ServiceApproval";
import Dashboard from "./components/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/request-service" element={<ServiceRequestForm />} />
          <Route path="/proposals" element={<ProposalsList />} />
          <Route path="/proposal/:id" element={<ProposalDetail />} />
          <Route path="/service/:id" element={<ServiceProgress />} />
          <Route path="/service/:id/approve" element={<ServiceApproval />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
