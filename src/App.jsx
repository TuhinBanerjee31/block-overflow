import { BrowserRouter, Routes, Route } from "react-router-dom";
import { WalletProvider } from "./context/WalletContext";
import Header from "./custom/Header";
import QuestionsPage from "./pages/QuestionsPage";
import AnswerPage from "./pages/AnswersPage";
import ManagePage from "./pages/ManagePage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "./custom/Footer";
import NotFound from "./pages/NotFound";
import { PageTransition } from "./custom/page-transition";

function App() {
  const toastOptions = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  return (
    <WalletProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen bg-gray-100">
          <ToastContainer {...toastOptions} />
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route
                path="/"
                element={
                  <PageTransition>
                    <QuestionsPage />
                  </PageTransition>
                }
              />
              <Route
                path="/answer"
                element={
                  <PageTransition>
                    <AnswerPage />
                  </PageTransition>
                }
              />
              <Route
                path="/manage"
                element={
                  <PageTransition>
                    <ManagePage />
                  </PageTransition>
                }
              />
              <Route
                path="*"
                element={
                  <PageTransition>
                    <NotFound />
                  </PageTransition>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;
