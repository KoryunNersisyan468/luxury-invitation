import { useEffect, useState } from 'react'
import { adminService } from '@/api/admin'
import { EmptyState } from '@/components/EmptyState'
import { notify } from '@/services/notification'
import type { User } from '@/types'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setUsers(await adminService.getUsers())
      } catch (err) {
        notify.error(err instanceof Error ? err.message : 'Failed to load users.')
      } finally {
        setIsLoading(false)
      }
    }
    void loadUsers()
  }, [])

  return (
    <div className="space-y-6">
      <div>
        <h2 className="heading-section text-foreground">Users Management</h2>
        <p className="text-sm text-muted-foreground">View registered users and roles</p>
      </div>

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading users...</p>
      ) : users.length === 0 ? (
        <EmptyState title="No users" message="No registered users were found." />
      ) : (
        <div className="overflow-x-auto rounded-sm border border-border">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-3 text-left font-medium">Email</th>
                <th className="p-3 text-left font-medium">Role</th>
                <th className="p-3 text-left font-medium">Created</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-border">
                  <td className="p-3">{user.email}</td>
                  <td className="p-3">{user.role}</td>
                  <td className="p-3 text-muted-foreground">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
