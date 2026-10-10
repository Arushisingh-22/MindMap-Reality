import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext';
import { ProgressProvider } from './contexts/ProgressContext';
import { Layout } from './layouts/Layout';

// Pages
import { Home } from './pages/Home';
import { Explore } from './pages/Explore';
import { Subjects } from './pages/Subjects';
import { ConceptDetail } from './pages/ConceptDetail';
import { InteractiveLab } from './pages/InteractiveLab';
import { Quiz } from './pages/Quiz';
import { Progress } from './pages/Progress';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { NotFound } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ProgressProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="explore" element={<Explore />} />
                <Route path="subjects" element={<Subjects />} />
                <Route path="concept/:conceptId" element={<ConceptDetail />} />
                <Route path="lab" element={<InteractiveLab />} />
                <Route path="quiz" element={<Quiz />} />
                <Route path="progress" element={<Progress />} />
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<SignUp />} />
                <Route path="forgot-password" element={<ForgotPassword />} />
                <Route path="reset-password" element={<ResetPassword />} />
                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ProgressProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default App;
