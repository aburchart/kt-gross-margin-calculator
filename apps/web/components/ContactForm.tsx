'use client'

import { useState } from 'react'
import { submitLead } from '@/lib/submitLead'
import { BUSINESS_TYPES } from '@/lib/site'
import styles from './ContactForm.module.css'

interface ContactFormProps {
  source?: 'contact-page' | 'salons-page'
  showBusinessType?: boolean
  submitLabel?: string
}

export default function ContactForm({
  source = 'contact-page',
  showBusinessType = true,
  submitLabel = 'Send →',
}: ContactFormProps) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [businessType, setBusinessType] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: string[] = []

    if (!name.trim()) errs.push('Please enter your name.')
    if (!email.trim()) errs.push('Please enter your email address.')
    if (!phone.trim()) errs.push('Please enter your phone number.')
    if (showBusinessType && !businessType) errs.push('Please select your business type.')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (email && !emailRegex.test(email)) {
      errs.push('Please enter a valid email address.')
    }

    setErrors(errs)
    if (errs.length > 0) return

    setStatus('submitting')

    const result = await submitLead({
      source,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      ...(showBusinessType ? { businessType } : {}),
      ...(message.trim() ? { message: message.trim() } : {}),
    })

    if (result.success) {
      setStatus('success')
    } else {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p className={styles.success}>
        Got it. Kari personally reviews every message — expect to hear back within
        1 business day.
      </p>
    )
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <label className={styles.label} htmlFor="contactName">
        Name
        <input
          id="contactName"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label} htmlFor="contactEmail">
        Email
        <input
          id="contactEmail"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      <label className={styles.label} htmlFor="contactPhone">
        Phone
        <input
          id="contactPhone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className={styles.input}
          required
        />
      </label>

      {showBusinessType && (
        <label className={styles.label} htmlFor="contactBusinessType">
          Business type
          <select
            id="contactBusinessType"
            value={businessType}
            onChange={(e) => setBusinessType(e.target.value)}
            className={styles.input}
            required
          >
            <option value="">Select one...</option>
            {BUSINESS_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </label>
      )}

      <label className={styles.label} htmlFor="contactMessage">
        Message <span className={styles.optional}>(optional)</span>
        <textarea
          id="contactMessage"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className={styles.textarea}
          rows={4}
        />
      </label>

      {errors.length > 0 && (
        <ul className={styles.errors}>
          {errors.map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}

      {status === 'error' && (
        <p className={styles.errors}>Something went wrong. Please try again.</p>
      )}

      <button type="submit" className={styles.submit} disabled={status === 'submitting'}>
        {status === 'submitting' ? 'Sending...' : submitLabel}
      </button>
    </form>
  )
}
