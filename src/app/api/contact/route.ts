// Saves to website_leads in the Brand Radar Supabase project; the schema is
// in that repo (supabase/migrations/20261012000000_website_leads.sql).

import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, inquiryType, message, referralCode } = body

    // Honeypot field: only bots fill it. Answer as if it worked so they move on.
    if (referralCode) {
      return NextResponse.json({ success: true, message: 'Message sent successfully' })
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      )
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)
    const { error } = await supabase
      .from('website_leads')
      .insert({
        source: 'contact',
        name,
        email,
        company: company || null,
        inquiry_type: inquiryType,
        message,
      })

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to save message. Please try again.' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, message: 'Message sent successfully' })
  } catch {
    return NextResponse.json(
      { error: 'Invalid request body' },
      { status: 400 }
    )
  }
}
