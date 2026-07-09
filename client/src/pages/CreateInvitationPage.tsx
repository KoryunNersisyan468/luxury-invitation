import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useForm, useFieldArray, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Heart,
  Image as ImageIcon,
  BookOpen,
  CalendarDays,
  MapPin,
  Clock,
  Shirt,
  Mail,
  Sparkles,
  Plus,
  Trash2,
  ArrowLeft,
  Eye,
 
} from 'lucide-react'
import { Button, Input, Textarea } from '@/components/ui'
import { FormSection } from '@/forms/FormSection'
import { FieldErrorSummary } from '@/components/forms/FieldErrorSummary'
import { ImageUpload } from '@/components/upload/ImageUpload'
import { invitationService } from '@/api'

import { invitationSchema, type InvitationFormValues } from '@/validation/invitation'
import { notify } from '@/services/notification'
import { INVITATION_CATEGORIES, getCategoryBySlug } from '@/lib/categories'
import { cn } from '@/utils'

const defaultValues: InvitationFormValues = {
  title: '',
  category: '',
  style: '',
  couple: { groom: '', bride: '', groomEn: '', brideEn: '' },
  hero: { image: '', subtitle: '' },
  story: { title: 'Մեր Սիրո Պատմությունը', content: '' },
  weddingDate: '',
  calendar: { monthName: 'Օգոստոս', year: 2026 },
  locations: [
    { id: '1', type: 'ceremony', name: '', nameEn: '', address: '', mapUrl: '', image: '' },
  ],
  timeline: {
    title: 'ՕՐՎԱ ԾՐԱԳԻՐ',
    events: [{ id: '1', time: '', title: '', description: '' }],
  },
  dressCode: {
    title: 'ՀԱԳՈՒՍՏԻ ԿՈԴ',
    description: '',
    images: [],
    colorPalette: ['#4a6741', '#8b7355'],
    guidelines: [''],
  },
  rsvp: { title: 'ՀԱՍՏԱՏԵՔ ՁԵՐ ՆԵՐԿԱՅՈՒԹՅՈՒՆԸ', subtitle: '' },
  final: { title: '', message: '', image: '' },
}

export default function CreateInvitationPage() {
  const navigate = useNavigate()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [selectedCategorySlug, setSelectedCategorySlug] = useState('')


  const {
    register,
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<InvitationFormValues>({
    resolver: zodResolver(invitationSchema),
    defaultValues,
  })

  const locations = useFieldArray({ control, name: 'locations' })
  const events = useFieldArray({ control, name: 'timeline.events' })
  const palette = useFieldArray({ control, name: 'dressCode.colorPalette' as never })
  const guidelines = useFieldArray({ control, name: 'dressCode.guidelines' as never })
  const selectedStyle = watch('style')
  const selectedCategory = getCategoryBySlug(selectedCategorySlug)

  const chooseCategory = (slug: string) => {
    const category = getCategoryBySlug(slug)
    if (!category) return
    setSelectedCategorySlug(slug)
    setValue('category', slug, { shouldValidate: true })
    setValue('style', '', { shouldValidate: true })
    setValue('story.title', category.defaults.storyTitle)
    setValue('timeline.title', category.defaults.timelineTitle)
    setValue('rsvp.title', category.defaults.rsvpTitle)
    setValue('dressCode.colorPalette', category.defaults.palette as never)
  }

  const chooseStyle = (style: string) => {
    setValue('style', style, { shouldValidate: true })
  }

  const onSubmit = async (data: InvitationFormValues) => {
    try {
      setIsSubmitting(true)
      const created = await invitationService.create(data)
      notify.success('Հրավերը ստեղծվեց և ուղարկվեց ադմինի հաստատմանը:')
      navigate(created.status === 'APPROVED' ? `/invitation/${created.id}` : '/')
    } catch {
      notify.error('Չհաջողվեց ստեղծել հրավերը: Փորձեք կրկին:')
    } finally {
      setIsSubmitting(false)
    }
  }

  const onError = () => {
    notify.error('Խնդրում ենք լրացնել բոլոր պարտադիր դաշտերը: Տեսեք վերևում մանրամասները:')
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top bar */}
      {/* //<header className="sticky top-0 z-20 bg-card/90 backdrop-blur border-b border-border">
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="w-6" />
          <div className="flex items-center gap-2 text-secondary uppercase tracking-[0.2em] text-xs font-body">
            <Sparkles className="w-3.5 h-3.5" />
            Belle Ame
          </div>
        </div>
      </header> */}

      <main className="max-w-3xl mx-auto px-4 py-10">
        <div className="text-center mb-10">
          <h1 className="heading-section text-primary mb-2">Ստեղծել հրավիրատոմս</h1>
          <p className="text-muted-foreground font-body">
            Նախ ընտրեք միջոցառման տեսակը և դիզայնը, հետո լրացրեք տվյալները։
          </p>
        </div>

        {!selectedCategory && (
          <div className="grid sm:grid-cols-2 gap-4">
            {INVITATION_CATEGORIES.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => chooseCategory(category.slug)}
                className="overflow-hidden rounded-sm border border-border bg-card text-left transition hover:border-primary hover:shadow-sm"
              >
                <img src={category.image} alt="" className="h-36 w-full object-cover" />
                <span className="block p-4">
                  <span className="block font-serif text-xl text-foreground">{category.nameHy}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{category.descriptionHy}</span>
                </span>
              </button>
            ))}
          </div>
        )}

        {selectedCategory && !selectedStyle && (
          <div className="space-y-4">
            <Button type="button" variant="ghost" size="sm" onClick={() => setSelectedCategorySlug('')}>
              <ArrowLeft className="w-4 h-4" />
              Փոխել կատեգորիան
            </Button>
            <div className="grid sm:grid-cols-2 gap-4">
              {selectedCategory.styles.map((style) => (
                <button
                  key={style.slug}
                  type="button"
                  onClick={() => chooseStyle(style.slug)}
                  className={cn('rounded-sm border p-5 text-left transition hover:shadow-sm', style.previewClass)}
                >
                  <span className="block font-serif text-2xl">{style.name}</span>
                  <span className="mt-8 block text-sm opacity-80">{style.description}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedCategory && selectedStyle && (
        <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-6">
          <FieldErrorSummary errors={errors} />
          <div className="flex flex-wrap items-center justify-between gap-3 rounded-sm border border-border bg-card p-4">
            <div>
              <p className="text-sm text-muted-foreground">Կատեգորիա / դիզայն</p>
              <p className="font-medium">
                {selectedCategory.nameHy} / {selectedCategory.styles.find((style) => style.slug === selectedStyle)?.name}
              </p>
            </div>
            <Button type="button" variant="outline" size="sm" onClick={() => chooseStyle('')}>
              Փոխել դիզայնը
            </Button>
          </div>

          {/* Couple */}
          <FormSection icon={Heart} title={selectedCategory.primaryLabels.firstName === 'Փեսա' ? 'Զույգը' : 'Հիմնական տվյալներ'} description="Անունները կերևան հրավիրատոմսի վերնամասում">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input label={`${selectedCategory.primaryLabels.firstName} (հայերեն)`} placeholder="Կարեն" error={errors.couple?.groom?.message} {...register('couple.groom')} />
              <Input label={`${selectedCategory.primaryLabels.secondName} (հայերեն)`} placeholder="Գայանե" error={errors.couple?.bride?.message} {...register('couple.bride')} />
              <Input label={`${selectedCategory.primaryLabels.firstName} (անգլերեն)`} placeholder="KAREN" {...register('couple.groomEn')} />
              <Input label={`${selectedCategory.primaryLabels.secondName} (անգլերեն)`} placeholder="GAYANE" {...register('couple.brideEn')} />
            </div>
          </FormSection>

          {/* Hero */}
          <FormSection icon={ImageIcon} title="Գլխավոր բաժին" description="Առաջին տպավորությունը">
            <Controller
              control={control}
              name="hero.image"
              render={({ field }) => (
                <ImageUpload
                  label="Գլխավոր նկար"
                  value={field.value}
                  onChange={(url) => field.onChange(url)}
                />
              )}
            />
            {errors.hero?.image?.message && (
              <p className="text-sm text-destructive">{errors.hero.image.message}</p>
            )}
            <Input label="Ենթավերնագիր" placeholder="Սիրով հրավիրում ենք..." {...register('hero.subtitle')} />
          </FormSection>

          {/* Story */}
          <FormSection icon={BookOpen} title={selectedCategory.primaryLabels.story}>
            <Input label="Վերնագիր" {...register('story.title')} />
            <Textarea label="Տեքստ" placeholder="Մեր պատմությունը սկսվեց..." {...register('story.content')} />
          </FormSection>

          {/* Date & Calendar */}
          <FormSection icon={CalendarDays} title="Ամսաթիվ և օրացույց">
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="sm:col-span-1">
                <Input type="datetime-local" label={selectedCategory.primaryLabels.date} error={errors.weddingDate?.message} {...register('weddingDate')} />
              </div>
              <Input label="Ամսվա անուն" placeholder="Օգոստոս" error={errors.calendar?.monthName?.message} {...register('calendar.monthName')} />
              <Input type="number" label="Տարի" error={errors.calendar?.year?.message} {...register('calendar.year')} />
            </div>
          </FormSection>

          {/* Locations */}
          <FormSection icon={MapPin} title={selectedCategory.primaryLabels.location} description="Ավելացրեք մեկ կամ մի քանի վայր">
            <div className="space-y-6">
              {locations.fields.map((field, index) => (
                <div key={field.id} className="rounded-sm border border-border p-4 space-y-3 relative">
                  <div className="flex items-center justify-between">
                    <select
                      className="h-9 rounded-sm border border-input bg-card px-3 text-sm"
                      {...register(`locations.${index}.type`)}
                    >
                      <option value="ceremony">Պսակադրություն</option>
                      <option value="reception">Հանդիսություն</option>
                    </select>
                    {locations.fields.length > 1 && (
                      <button type="button" onClick={() => locations.remove(index)} className="text-muted-foreground hover:text-red-500 transition-colors" aria-label="Հեռացնել վայրը">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Input label="Անվանում" placeholder="Սուրբ Գայանե" error={errors.locations?.[index]?.name?.message} {...register(`locations.${index}.name`)} />
                    <Input label="Անվանում (անգլ.)" placeholder="Saint Gayane" {...register(`locations.${index}.nameEn`)} />
                    <Input label="Հասցե" {...register(`locations.${index}.address`)} />
                    <Input label="Քարտեզի հղում" placeholder="https://maps..." {...register(`locations.${index}.mapUrl`)} />
                  </div>
                  <Controller
                    control={control}
                    name={`locations.${index}.image`}
                    render={({ field }) => (
                      <ImageUpload
                        label="Վայրի նկար"
                        value={field.value}
                        onChange={(url) => field.onChange(url)}
                      />
                    )}
                  />
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => locations.append({ id: crypto.randomUUID(), type: 'reception', name: '', nameEn: '', address: '', mapUrl: '', image: '' })}>
                <Plus className="w-4 h-4" />
                Ավելացնել վայր
              </Button>
            </div>
          </FormSection>

          {/* Timeline */}
          <FormSection icon={Clock} title="Օրվա ծրագիր">
            <Input label="Վերնագիր" {...register('timeline.title')} />
            <div className="space-y-4 pt-2">
              {events.fields.map((field, index) => (
                <div key={field.id} className="rounded-sm border border-border p-4 space-y-3 relative">
                  <div className="grid sm:grid-cols-[120px_1fr] gap-3">
                    <Input label="Ժամ" placeholder="15:00" error={errors.timeline?.events?.[index]?.time?.message} {...register(`timeline.events.${index}.time`)} />
                    <Input label="Վերնագիր" placeholder="Պսակադրություն" error={errors.timeline?.events?.[index]?.title?.message} {...register(`timeline.events.${index}.title`)} />
                  </div>
                  <Input label="Նկարագրություն" {...register(`timeline.events.${index}.description`)} />
                  {events.fields.length > 1 && (
                    <button type="button" onClick={() => events.remove(index)} className="absolute top-3 right-3 text-muted-foreground hover:text-red-500 transition-colors" aria-label="Հեռացնել իրադարձությունը">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              ))}
              <Button type="button" variant="outline" size="sm" onClick={() => events.append({ id: crypto.randomUUID(), time: '', title: '', description: '' })}>
                <Plus className="w-4 h-4" />
                Ավելացնել իրադարձություն
              </Button>
            </div>
          </FormSection>

          {/* Dress code */}
          <FormSection icon={Shirt} title="Հագուստի կոդ">
            <Input label="Վերնագիր" {...register('dressCode.title')} />
            <Textarea label="Նկարագրություն" {...register('dressCode.description')} />

            {/* Gallery images */}
            <div className="pt-2">
              <p className="text-sm font-medium text-foreground/80 mb-3">Ոգեշնչման պատկերներ</p>
              <Controller
                control={control}
                name="dressCode.images"
                render={({ field }) => (
                  <ImageUpload
                    multiple
                    label=""
                    value={field.value}
                    onChange={(urls) => field.onChange(urls)}
                  />
                )}
              />
            </div>

            {/* Color palette */}
            <div className="pt-2">
              <p className="text-sm font-medium text-foreground/80 mb-3">Գունապնակ</p>
              <div className="flex flex-wrap gap-3">
                {palette.fields.map((field, index) => (
                  <div key={field.id} className="flex items-center gap-1.5">
                    <Controller
                      control={control}
                      name={`dressCode.colorPalette.${index}` as never}
                      render={({ field: colorField }) => (
                        <input type="color" value={(colorField.value as string) || '#4a6741'} onChange={colorField.onChange} className="h-10 w-12 rounded-sm border border-border cursor-pointer bg-card" aria-label="Ընտրել գույն" />
                      )}
                    />
                    <button type="button" onClick={() => palette.remove(index)} className="text-muted-foreground hover:text-red-500 transition-colors" aria-label="Հեռացնել գույնը">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
                <Button type="button" variant="ghost" size="sm" onClick={() => palette.append('#d4c5b5' as never)}>
                  <Plus className="w-4 h-4" />
                  Գույն
                </Button>
              </div>
            </div>

            {/* Guidelines */}
            <div className="pt-2">
              <p className="text-sm font-medium text-foreground/80 mb-3">Ուղեցույցներ</p>
              <div className="space-y-2">
                {guidelines.fields.map((field, index) => (
                  <div key={field.id} className="flex gap-2 items-center">
                    <Input className="flex-1" placeholder="Օր.՝ Երկար երեկոյան զգեստ" {...register(`dressCode.guidelines.${index}`)} />
                    <button type="button" onClick={() => guidelines.remove(index)} className="text-muted-foreground hover:text-red-500 transition-colors p-2" aria-label="Հեռացնել ուղեցույցը">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <Button type="button" variant="ghost" size="sm" onClick={() => guidelines.append('' as never)}>
                  <Plus className="w-4 h-4" />
                  Ավելացնել ուղեցույց
                </Button>
              </div>
            </div>
          </FormSection>

          {/* RSVP */}
          <FormSection icon={Mail} title="RSVP կարգավորումներ">
            <Input label="Վերնագիր" {...register('rsvp.title')} />
            <Input label="Ենթավերնագիր" {...register('rsvp.subtitle')} />
          </FormSection>

          {/* Final */}
          <FormSection icon={Sparkles} title="Եզրափակիչ բաժին">
            <Input label="Վերնագիր" {...register('final.title')} />
            <Textarea label="Հաղորդագրություն" {...register('final.message')} />
            <Controller
              control={control}
              name="final.image"
              render={({ field }) => (
                <ImageUpload
                  label="Եզրափակիչ նկար"
                  value={field.value}
                  onChange={(url) => field.onChange(url)}
                />
              )}
            />
          </FormSection>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button type="submit" size="lg" className="flex-1" isLoading={isSubmitting}>
              <Eye className="w-4 h-4" />
              Ուղարկել հաստատման
            </Button>
          </div>
        </form>
        )}
      </main>
    </div>
  )
}
