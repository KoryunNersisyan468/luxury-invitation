import { useEffect, useState } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Button, Input } from '@/components/ui'
import { notify } from '@/services/notification'
import { adminService, type InvitationCategoryRecord, type InvitationTemplateRecord } from '@/api/admin'

export default function AdminSettingsPage() {
  const { user, refreshUser } = useAuth()
  const [categories, setCategories] = useState<InvitationCategoryRecord[]>([])
  const [templates, setTemplates] = useState<InvitationTemplateRecord[]>([])
  const [categoryDraft, setCategoryDraft] = useState({ slug: '', name: '' })
  const [templateDraft, setTemplateDraft] = useState({ category: 'wedding', style: '', name: '' })

  const loadContent = async () => {
    try {
      const [categoryData, templateData] = await Promise.all([
        adminService.getCategories(),
        adminService.getTemplates(),
      ])
      setCategories(categoryData)
      setTemplates(templateData)
    } catch (err) {
      notify.error(err instanceof Error ? err.message : 'Failed to load category settings.')
    }
  }

  useEffect(() => {
    void loadContent()
  }, [])

  const handleRefreshProfile = async () => {
    try {
      await refreshUser()
      notify.success('Profile refreshed.')
    } catch {
      notify.error('Failed to refresh profile.')
    }
  }

  const saveCategory = async () => {
    if (!categoryDraft.slug || !categoryDraft.name) return
    await adminService.saveCategory(categoryDraft)
    setCategoryDraft({ slug: '', name: '' })
    await loadContent()
    notify.success('Category saved.')
  }

  const saveTemplate = async () => {
    if (!templateDraft.category || !templateDraft.style || !templateDraft.name) return
    await adminService.saveTemplate(templateDraft)
    setTemplateDraft({ category: 'wedding', style: '', name: '' })
    await loadContent()
    notify.success('Template saved.')
  }

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h2 className="heading-section text-foreground">Settings</h2>
        <p className="text-sm text-muted-foreground">Account and platform settings</p>
      </div>

      <section className="rounded-sm border border-border bg-card p-6 space-y-4">
        <h3 className="font-serif text-lg">Account</h3>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">Email</dt>
            <dd className="font-medium">{user?.email}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Role</dt>
            <dd className="font-medium capitalize">{user?.role?.toLowerCase()}</dd>
          </div>
        </dl>
        <Button variant="outline" size="sm" onClick={handleRefreshProfile}>
          Refresh profile
        </Button>
      </section>

      <section className="rounded-sm border border-border bg-card p-6 space-y-4">
        <h3 className="font-serif text-lg">API Configuration</h3>
        <dl className="space-y-3 text-sm">
          <div>
            <dt className="text-muted-foreground">API Base URL</dt>
            <dd className="font-mono text-xs break-all">
              {import.meta.env.VITE_API_URL ?? 'http://localhost:5000/api'}
            </dd>
          </div>
          <div>
            <dt className="text-muted-foreground">JWT Expiry</dt>
            <dd>Configured on server (default 2h, no refresh token)</dd>
          </div>
        </dl>
      </section>

      <section className="rounded-sm border border-border bg-card p-6 space-y-4">
        <h3 className="font-serif text-lg">Categories</h3>
        <div className="grid sm:grid-cols-[1fr_1fr_auto] gap-3">
          <Input label="Slug" value={categoryDraft.slug} onChange={(e) => setCategoryDraft((prev) => ({ ...prev, slug: e.target.value }))} />
          <Input label="Name" value={categoryDraft.name} onChange={(e) => setCategoryDraft((prev) => ({ ...prev, name: e.target.value }))} />
          <Button type="button" className="self-end" onClick={saveCategory}>Save</Button>
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <span key={category.id ?? category.slug} className="rounded-sm bg-muted px-2 py-1 text-xs">
              {category.name} ({category.slug})
            </span>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6 space-y-4">
        <h3 className="font-serif text-lg">Templates</h3>
        <div className="grid sm:grid-cols-[1fr_1fr_1fr_auto] gap-3">
          <Input label="Category" value={templateDraft.category} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, category: e.target.value }))} />
          <Input label="Style" value={templateDraft.style} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, style: e.target.value }))} />
          <Input label="Name" value={templateDraft.name} onChange={(e) => setTemplateDraft((prev) => ({ ...prev, name: e.target.value }))} />
          <Button type="button" className="self-end" onClick={saveTemplate}>Save</Button>
        </div>
        <div className="grid sm:grid-cols-2 gap-2">
          {templates.map((template) => (
            <div key={template.id ?? `${template.category}-${template.style}`} className="rounded-sm border border-border px-3 py-2 text-sm">
              <p className="font-medium">{template.name}</p>
              <p className="text-xs text-muted-foreground">{template.category} / {template.style}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="rounded-sm border border-border bg-card p-6">
        <h3 className="font-serif text-lg mb-2">Platform limitations</h3>
        <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
          <li>No refresh token support — re-login when JWT expires</li>
          <li>No OAuth / social login on backend</li>
          <li>No password reset endpoint</li>
          <li>Template preview editing stores metadata; visual rendering is driven by the frontend style configs</li>
        </ul>
      </section>
    </div>
  )
}
