import { useState, type FormEvent } from 'react'
import { contact } from '../data/portfolio'

export type ContactField = 'name' | 'email' | 'subject' | 'message'

export const contactFields: { id: ContactField; label: string; multiline?: boolean; type?: string; autoComplete?: string }[] = [
  { id: 'name', label: 'Your name', autoComplete: 'name' },
  { id: 'email', label: 'Your email', type: 'email', autoComplete: 'email' },
  { id: 'subject', label: 'Subject' },
  { id: 'message', label: 'Message', multiline: true },
]

function validate(values: Record<ContactField, string>) {
  const errors: Partial<Record<ContactField, string>> = {}
  if (!values.name.trim()) errors.name = 'Add your name so Sai knows who is writing.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) errors.email = 'Enter an email address Sai can reply to, like name@company.com.'
  if (!values.subject.trim()) errors.subject = 'Add a subject, for example the role or the system.'
  if (values.message.trim().length < 12) errors.message = 'Write at least a sentence (12 characters or more).'
  return errors
}

// The contact form's state and validation; submitting opens an email draft addressed to Sai.
export function useContactForm(idPrefix: string) {
  const [values, setValues] = useState<Record<ContactField, string>>({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState<Partial<Record<ContactField, string>>>({})
  const [sent, setSent] = useState(false)

  const update = (field: ContactField, value: string) => {
    setValues((current) => ({ ...current, [field]: value }))
    setErrors((current) => ({ ...current, [field]: undefined }))
    setSent(false)
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validate(values)
    setErrors(nextErrors)
    const firstInvalid = contactFields.find(({ id }) => nextErrors[id])
    if (firstInvalid) {
      document.getElementById(`${idPrefix}-${firstInvalid.id}`)?.focus()
      return
    }
    const body = `${values.message.trim()}\n\n${values.name.trim()}\n${values.email.trim()}`
    window.location.href = `mailto:${contact.email}?subject=${encodeURIComponent(values.subject.trim())}&body=${encodeURIComponent(body)}`
    setSent(true)
  }

  return { values, errors, sent, update, submit }
}
