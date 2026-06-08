import { createHashRouter, Navigate, redirect } from 'react-router';
import { App } from './App';
import { HomePage } from './pages/Home';
import ExecutionPage from './pages/Execution';
import { LoginPage } from './pages/LoginPage';
import { RouteErrorFallback } from './components/ui/RouteErrorFallback';
import { isLoggedIn } from './lib/session';

/** Auth guard — redirects to /login if no session. */
function requireAuth() {
  if (!isLoggedIn()) return redirect('/login');
  return null;
}

export const router = createHashRouter([
  // Public login route
  { path: '/login', Component: LoginPage },

  // Protected app routes
  {
    path: '/',
    Component: App,
    errorElement: <RouteErrorFallback />,
    loader: requireAuth,
    children: [
      { index: true, Component: HomePage, errorElement: <RouteErrorFallback /> },
      { path: 'execution/:id', Component: ExecutionPage, errorElement: <RouteErrorFallback /> },
      { path: '*', element: <Navigate to="/" replace /> },
    ],
  },
]);
