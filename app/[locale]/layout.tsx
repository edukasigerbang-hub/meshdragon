import { NextIntlClientProvider } from 'next-intl'
import { notFound } from 'next/navigation'
import { unstable_setRequestLocale } from 'next-intl/server'
import { Inter } from 'next/font/google'
import '../globals.css'
import ClientLayout from './ClientLayout'

const inter = Inter({ subsets: ['latin'] })

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  unstable_setRequestLocale(locale)

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <div lang={locale} className={inter.className} suppressHydrationWarning>
        <ClientLayout>{children}</ClientLayout>
      </div>
    </NextIntlClientProvider>
  )
}