import { lazy, Suspense } from 'react';
import { useAuth } from '../context/authContext';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Register from '../pages/Register';
import Home from '../pages/Home';
import AdminPanel from '../pages/AdminPanel';
import Blog from '../pages/Blog';
import Layout from '../components/Layout';
import MyPost from '../pages/MyPost';

const Login = lazy(() => import('../pages/Login'));

function ProtectedRoute({ children, roles }: any) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/login" replace />;

  if (roles && !roles.some((role: any) => user.role?.includes(role))) {
    console.log(user.role);
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-bold mb-2">Access Denied</h2>
        <p>You do not have permission to view this page.</p>
      </div>
    );
  }

  return children;
}

// export default function Router() {
//   return (
//     <BrowserRouter>
//       <Suspense
//         fallback={
//           <div className="flex items-center justify-center h-screen bg-gray-100">
//             <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
//           </div>
//         }
//       >
//         <Routes>
//           <Route path="/" element={<Navigate to="/home" replace />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//
//           <Route
//             path="/home"
//             element={
//               <ProtectedRoute>
//                 <Home />
//               </ProtectedRoute>
//             }
//           />
//
//           <Route
//             path="/admin"
//             element={
//               <ProtectedRoute>
//                 <AdminPanel />
//               </ProtectedRoute>
//             }
//           />
//
//           <Route
//             path="/blog"
//             element={
//               <ProtectedRoute>
//                 <Blog />
//               </ProtectedRoute>
//             }
//           />
//         </Routes>
//       </Suspense>
//     </BrowserRouter>
//   );

export default function Router() {
  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="w-16 h-16 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          </div>
        }
      >
        <Routes>
          {/* Redirect root to home */}
          <Route path="/" element={<Navigate to="/home" replace />} />

          {/* Public routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected routes with Layout */}
          <Route
            element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/home" element={<Home />} />
            <Route path="/admin" element={<AdminPanel />} />
            <Route path="/blog" element={<Blog />} />

            {/* FIXED: wrap element, not Route */}
            <Route
              path="/my-post"
              element={
                <ProtectedRoute roles={['ADMIN', 'AUTHOR']}>
                  <MyPost />
                </ProtectedRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
