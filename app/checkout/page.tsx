import { Suspense } from 'react'
import { CheckoutContent } from './checkout-content'
import { Loader2 } from 'lucide-react'

function CheckoutLoading() {
  return (
    <div className='min-h-screen bg-background flex items-center justify-center'>
      <Loader2 size={48} className='text-cyan-electric animate-spin' />
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutLoading />}>
      <CheckoutContent />
    </Suspense>
  )
}
