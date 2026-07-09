import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router'
import { HeroSkeleton } from '@/components/ui'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { AdminLayout } from '@/components/admin/AdminLayout'

const HomePage = lazy(() => import('@/pages/HomePage'))
const InvitationListPage = lazy(() => import('@/pages/InvitationListPage'))
const InvitationDetailsPage = lazy(() => import('@/pages/InvitationPage'))
const CreateInvitationPage = lazy(() => import('@/pages/CreateInvitationPage'))
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage'))

const LoginPage = lazy(() => import('@/pages/auth/LoginPage'))
const RegisterPage = lazy(() => import('@/pages/auth/RegisterPage'))
const ForgotPasswordPage = lazy(() => import('@/pages/auth/ForgotPasswordPage'))
const ResetPasswordPage = lazy(() => import('@/pages/auth/ResetPasswordPage'))

const CategoryPage = lazy(() => import('@/pages/categories/CategoryPage'))

const AboutPage = lazy(() => import('@/pages/static/AboutPage'))
const ContactPage = lazy(() => import('@/pages/static/ContactPage'))
const PrivacyPage = lazy(() => import('@/pages/static/PrivacyPage'))
const TermsPage = lazy(() => import('@/pages/static/TermsPage'))

const AdminDashboardPage = lazy(() => import('@/pages/admin/AdminDashboardPage'))
const AdminInvitationsPage = lazy(() => import('@/pages/admin/AdminInvitationsPage'))
const AdminRsvpPage = lazy(() => import('@/pages/admin/AdminRsvpPage'))
const AdminUploadPage = lazy(() => import('@/pages/admin/AdminUploadPage'))
const AdminUsersPage = lazy(() => import('@/pages/admin/AdminUsersPage'))
const AdminSettingsPage = lazy(() => import('@/pages/admin/AdminSettingsPage'))
const ProfilePage = lazy(() => import('@/pages/ProfilePage'))
const DashboardPage = lazy(() => import('@/pages/DashboardPage'))

export function AppRouter() {
  return (
    <Suspense fallback={<HeroSkeleton />}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/invitation" element={<InvitationListPage />} />
        <Route path="/invitation/:id" element={<InvitationDetailsPage />} />
        <Route path="/create" element={<ProtectedRoute><CreateInvitationPage /></ProtectedRoute>} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="/categories/:slug" element={<CategoryPage />} />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminDashboardPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/invitations"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminInvitationsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/rsvps"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminRsvpPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminUploadPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/users"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminUsersPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <ProtectedRoute requireAdmin>
              <AdminLayout>
                <AdminSettingsPage />
              </AdminLayout>
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  )
}
