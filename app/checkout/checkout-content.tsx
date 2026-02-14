'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Shield,
  Lock,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Eye,
  EyeOff,
} from 'lucide-react'
import { useAuth } from '@/components/providers/auth-provider'
import { api } from '@/lib/api'
import { Navigation } from '@/components/shared/navigation'
import { Footer } from '@/components/shared/footer'

interface Plan {
  id: number
  slug: string
  name: string
  description: string
  price: number
  price_yearly?: number
  features?: string[]
}

interface CardData {
  cardNumber: string
  cardName: string
  expiryMonth: string
  expiryYear: string
  cvv: string
}

export function CheckoutContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, isAuthenticated } = useAuth()

  const [plan, setPlan] = useState<Plan | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [cardData, setCardData] = useState<CardData>({
    cardNumber: '',
    cardName: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
  })
  const [showCvv, setShowCvv] = useState(false)
  const [billingAddress, setBillingAddress] = useState({
    fullName: user?.first_name || '',
    email: user?.email || '',
    country: '',
    state: '',
    city: '',
    zipCode: '',
  })
  const [acceptTerms, setAcceptTerms] = useState(false)

  const planSlug = searchParams.get('plan')
  const interval = searchParams.get('interval') || 'monthly'

  useEffect(() => {
    if (!isAuthenticated) {
      router.push(`/auth/login?redirect=/checkout?plan=${planSlug}&interval=${interval}`)
      return
    }

    const fetchPlan = async () => {
      if (!planSlug) {
        setError('No plan selected')
        setIsLoading(false)
        return
      }

      try {
        const response = await api.get<Plan>(`/subscription-plans/${planSlug}`)
        if (response.status === 'success' && response.data) {
          setPlan(response.data)
        } else {
          setError('Plan not found')
        }
      } catch (err) {
        console.error('Failed to fetch plan:', err)
        setError('Failed to load plan details')
      } finally {
        setIsLoading(false)
      }
    }

    fetchPlan()
  }, [planSlug, interval, isAuthenticated, router])

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    let formattedValue = value

    if (name === 'cardNumber') {
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim()
    } else if (name === 'expiryMonth' || name === 'expiryYear') {
      formattedValue = value.replace(/\D/g, '')
    } else if (name === 'cvv') {
      formattedValue = value.replace(/\D/g, '')
    }

    setCardData(prev => ({
      ...prev,
      [name]: formattedValue
    }))
  }

  const handleBillingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setBillingAddress(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validateCard = () => {
    if (!cardData.cardNumber || cardData.cardNumber.replace(/\s/g, '').length !== 16) {
      setError('Please enter a valid 16-digit card number')
      return false
    }
    if (!cardData.cardName.trim()) {
      setError('Please enter the cardholder name')
      return false
    }
    if (!cardData.expiryMonth || !cardData.expiryYear) {
      setError('Please enter the expiry date')
      return false
    }
    if (!cardData.cvv || cardData.cvv.length < 3) {
      setError('Please enter a valid CVV')
      return false
    }
    if (!billingAddress.fullName.trim() || !billingAddress.email.trim()) {
      setError('Please fill in all billing details')
      return false
    }
    if (!acceptTerms) {
      setError('Please accept the terms and conditions')
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')

    if (!validateCard()) {
      return
    }

    setIsProcessing(true)

    try {
      const response = await api.post('/payments/process', {
        plan_id: plan?.id,
        interval: interval === 'yearly' ? 'yearly' : 'monthly',
        card_number: cardData.cardNumber.replace(/\s/g, ''),
        card_name: cardData.cardName,
        expiry_month: cardData.expiryMonth.padStart(2, '0'),
        expiry_year: `20${cardData.expiryYear}`,
        cvv: cardData.cvv,
        billing_address: billingAddress,
      })

      if (response.status === 'success') {
        router.push('/dashboard?payment=success')
      } else {
        setError(response.message || 'Payment processing failed')
      }
    } catch (err: any) {
      console.error('Payment error:', err)
      setError(err.message || 'An error occurred while processing your payment')
    } finally {
      setIsProcessing(false)
    }
  }

  if (isLoading) {
    return (
      <div className='min-h-screen bg-background flex items-center justify-center'>
        <Loader2 size={48} className='text-cyan-electric animate-spin' />
      </div>
    )
  }

  if (!plan) {
    return (
      <div className='min-h-screen bg-background'>
        <Navigation />
        <div className='flex items-center justify-center min-h-[60vh]'>
          <div className='text-center'>
            <AlertCircle size={48} className='text-red-400 mx-auto mb-4' />
            <h1 className='text-2xl font-black text-white mb-2'>Error</h1>
            <p className='text-slate-400 mb-6'>{error || 'Plan not found'}</p>
            <Link href='/pricing' className='glow-button inline-block'>
              Back to Pricing
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  const displayPrice = plan.price
  const totalAmount = displayPrice

  return (
    <div className='min-h-screen bg-background'>
      <Navigation />

      <div className='py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto'>
        <Link
          href='/pricing'
          className='inline-flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors'
        >
          <ArrowLeft size={16} /> Back to Pricing
        </Link>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Checkout Form */}
          <div className='lg:col-span-2'>
            <div className='card-modern p-8'>
              <h1 className='text-3xl font-black text-white uppercase tracking-tighter mb-2'>
                Secure Checkout
              </h1>
              <p className='text-slate-400 text-sm mb-8'>
                Complete your purchase securely below. Your payment information is encrypted and secure.
              </p>

              {error && (
                <div className='mb-6 p-4 rounded-lg bg-red-500/10 border border-red-500/20 flex items-start gap-3'>
                  <AlertCircle size={20} className='text-red-400 flex-shrink-0 mt-0.5' />
                  <p className='text-sm text-red-300'>{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className='space-y-8'>
                {/* Card Information Section */}
                <div>
                  <h2 className='text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2'>
                    <Lock size={16} className='text-cyan-electric' />
                    Card Information
                  </h2>

                  <div className='space-y-4'>
                    {/* Card Number */}
                    <div>
                      <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>
                        Card Number
                      </label>
                      <input
                        type='text'
                        name='cardNumber'
                        placeholder='1234 5678 9012 3456'
                        value={cardData.cardNumber}
                        onChange={handleCardChange}
                        maxLength={19}
                        required
                        className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all'
                      />
                    </div>

                    {/* Cardholder Name */}
                    <div>
                      <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>
                        Cardholder Name
                      </label>
                      <input
                        type='text'
                        name='cardName'
                        placeholder='John Doe'
                        value={cardData.cardName}
                        onChange={handleCardChange}
                        required
                        className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all'
                      />
                    </div>

                    {/* Expiry and CVV */}
                    <div className='grid grid-cols-2 gap-4'>
                      <div>
                        <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>
                          Expiry Date
                        </label>
                        <div className='flex gap-2'>
                          <input
                            type='text'
                            name='expiryMonth'
                            placeholder='MM'
                            max='12'
                            value={cardData.expiryMonth}
                            onChange={handleCardChange}
                            maxLength={2}
                            required
                            className='w-1/2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all'
                          />
                          <span className='text-white text-xl'>/</span>
                          <input
                            type='text'
                            name='expiryYear'
                            placeholder='YY'
                            value={cardData.expiryYear}
                            onChange={handleCardChange}
                            maxLength={2}
                            required
                            className='w-1/2 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all'
                          />
                        </div>
                      </div>
                      <div>
                        <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>
                          CVV
                        </label>
                        <div className='relative'>
                          <input
                            type={showCvv ? 'text' : 'password'}
                            name='cvv'
                            placeholder='123'
                            value={cardData.cvv}
                            onChange={handleCardChange}
                            maxLength={4}
                            required
                            className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all'
                          />
                          <button
                            type='button'
                            onClick={() => setShowCvv(!showCvv)}
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white transition-colors'
                          >
                            {showCvv ? <EyeOff size={16} /> : <Eye size={16} />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Billing Address Section */}
                <div>
                  <h2 className='text-sm font-black text-white uppercase tracking-widest mb-6 flex items-center gap-2'>
                    <Shield size={16} className='text-lime-bio' />
                    Billing Address
                  </h2>

                  <div className='space-y-4'>
                    {/* Full Name */}
                    <div>
                      <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>
                        Full Name
                      </label>
                      <input
                        type='text'
                        name='fullName'
                        placeholder='John Doe'
                        value={billingAddress.fullName}
                        onChange={handleBillingChange}
                        required
                        className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all'
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className='block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2'>
                        Email Address
                      </label>
                      <input
                        type='email'
                        name='email'
                        placeholder='john@example.com'
                        value={billingAddress.email}
                        onChange={handleBillingChange}
                        required
                        className='w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all'
                      />
                    </div>

                    {/* Country, State, City */}
                    <div className='grid grid-cols-2 gap-4'>
                      <input
                        type='text'
                        name='country'
                        placeholder='Country'
                        value={billingAddress.country}
                        onChange={handleBillingChange}
                        required
                        className='px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all text-sm'
                      />
                      <input
                        type='text'
                        name='state'
                        placeholder='State/Province'
                        value={billingAddress.state}
                        onChange={handleBillingChange}
                        required
                        className='px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all text-sm'
                      />
                    </div>

                    <div className='grid grid-cols-2 gap-4'>
                      <input
                        type='text'
                        name='city'
                        placeholder='City'
                        value={billingAddress.city}
                        onChange={handleBillingChange}
                        required
                        className='px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all text-sm'
                      />
                      <input
                        type='text'
                        name='zipCode'
                        placeholder='ZIP Code'
                        value={billingAddress.zipCode}
                        onChange={handleBillingChange}
                        required
                        className='px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-slate-600 focus:outline-none focus:border-cyan-electric focus:ring-1 focus:ring-cyan-electric transition-all text-sm'
                      />
                    </div>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className='flex items-start gap-3 p-4 rounded-lg bg-white/5 border border-white/10'>
                  <input
                    type='checkbox'
                    id='terms'
                    checked={acceptTerms}
                    onChange={(e) => setAcceptTerms(e.target.checked)}
                    className='mt-1 w-4 h-4 rounded border-white/20 text-cyan-electric focus:ring-2 focus:ring-cyan-electric'
                  />
                  <label htmlFor='terms' className='text-xs text-slate-400'>
                    I agree to the{' '}
                    <Link href='/terms' className='text-cyan-electric hover:underline'>
                      Terms and Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href='/privacy' className='text-cyan-electric hover:underline'>
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type='submit'
                  disabled={isProcessing}
                  className='w-full py-3 rounded-lg glow-button font-black uppercase tracking-widest text-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2'
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={16} className='animate-spin' />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      <Shield size={16} />
                      Complete Purchase
                    </>
                  )}
                </button>

                <p className='text-center text-[10px] text-slate-500 flex items-center justify-center gap-2'>
                  <Lock size={12} />
                  Your payment information is secure and encrypted
                </p>
              </form>
            </div>
          </div>

          {/* Order Summary */}
          <div className='lg:col-span-1'>
            <div className='card-modern p-8 sticky top-20'>
              <h3 className='text-sm font-black text-white uppercase tracking-widest mb-6 border-b border-white/10 pb-4'>
                Order Summary
              </h3>

              <div className='space-y-4 mb-6'>
                <div>
                  <p className='text-slate-500 text-xs uppercase tracking-widest mb-2'>Plan</p>
                  <p className='text-xl font-black text-white'>{plan.name}</p>
                  <p className='text-xs text-slate-400 mt-1'>{plan.description}</p>
                </div>

                <div className='pt-4 border-t border-white/10'>
                  <p className='text-slate-500 text-xs uppercase tracking-widest mb-2'>Billing Cycle</p>
                  <p className='text-sm font-bold text-white capitalize'>{interval}</p>
                </div>

                {plan.features && plan.features.length > 0 && (
                  <div className='pt-4 border-t border-white/10'>
                    <p className='text-slate-500 text-xs uppercase tracking-widest mb-3'>Includes</p>
                    <ul className='space-y-2'>
                      {plan.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className='flex items-start gap-2 text-xs text-slate-300'>
                          <CheckCircle2 size={14} className='text-lime-bio flex-shrink-0 mt-0.5' />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className='space-y-3 border-t border-white/10 pt-6'>
                <div className='flex justify-between items-center'>
                  <span className='text-slate-400 text-sm'>Subtotal</span>
                  <span className='text-white font-bold'>${displayPrice.toFixed(2)}</span>
                </div>
                <div className='flex justify-between items-center'>
                  <span className='text-slate-400 text-sm'>Tax</span>
                  <span className='text-white font-bold'>$0.00</span>
                </div>
                <div className='flex justify-between items-center pt-3 border-t border-white/10 text-lg font-black'>
                  <span className='text-white'>Total</span>
                  <span className='text-cyan-electric'>${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className='mt-6 p-4 rounded-lg bg-cyan-electric/10 border border-cyan-electric/20'>
                <p className='text-[10px] text-white font-bold uppercase tracking-widest mb-2'>
                  ✓ Secure Payment
                </p>
                <p className='text-xs text-slate-300'>
                  Your payment is processed securely. Refunds available within 30 days.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
