'use client';

import { FormEvent, useState } from 'react';
import { useTranslations } from 'next-intl';

export function ContactForm() {
  const t = useTranslations('contactPage.form');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('loading');

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
        }),
      });

      if (!response.ok) {
        setStatus('error');
        return;
      }

      form.reset();
      setStatus('success');
    } catch {
      setStatus('error');
    }
  }

  const inputClass =
    'w-full border border-foreground/15 bg-background px-4 py-3 text-sm text-foreground placeholder:text-foreground/40 focus:outline-none focus:border-foreground/40 transition-colors';

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <label className="block space-y-2">
          <span
            className="text-xs uppercase tracking-[0.2em] text-foreground/50"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {t('name')}
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={inputClass}
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          />
        </label>

        <label className="block space-y-2">
          <span
            className="text-xs uppercase tracking-[0.2em] text-foreground/50"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {t('email')}
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          />
        </label>
      </div>

      <label className="block space-y-2">
        <span
          className="text-xs uppercase tracking-[0.2em] text-foreground/50"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {t('phone')}
        </span>
        <input
          name="phone"
          type="tel"
          autoComplete="tel"
          className={inputClass}
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        />
      </label>

      <label className="block space-y-2">
        <span
          className="text-xs uppercase tracking-[0.2em] text-foreground/50"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {t('message')}
        </span>
        <textarea
          name="message"
          required
          rows={6}
          className={`${inputClass} resize-y min-h-[140px]`}
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          placeholder={t('messagePlaceholder')}
        />
      </label>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={status === 'loading'}
          className="inline-flex items-center justify-center border border-foreground/40 px-6 py-3 text-xs uppercase tracking-[0.3em] hover:bg-foreground hover:text-background transition-colors disabled:opacity-50 disabled:pointer-events-none"
          style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
        >
          {status === 'loading' ? t('sending') : t('submit')}
        </button>

        {status === 'success' && (
          <p
            className="text-sm text-foreground/70"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {t('success')}
          </p>
        )}
        {status === 'error' && (
          <p
            className="text-sm text-red-600 dark:text-red-400"
            style={{ fontFamily: 'var(--font-ibm-plex-mono)' }}
          >
            {t('error')}
          </p>
        )}
      </div>
    </form>
  );
}
