# Supabase + Stripe Setup Guide

## 1. Supabase Project Setup

### Create project
1. Go to [supabase.com](https://supabase.com) → New Project
2. Copy your **Project URL** and **anon public key** from Settings → API
3. Copy your **service_role key** (keep this secret — server only)

### Run the schema
1. Go to SQL Editor in your Supabase dashboard
2. Paste the contents of `supabase/schema.sql`
3. Click **Run** — this creates the `users` and `contact_messages` tables, the auto-trigger, and RLS policies

### Configure email verification (OTP codes)
This is critical — by default Supabase sends magic links, but we use 6-digit OTP codes.

1. Go to **Authentication → Email Templates → Confirm signup**
2. Replace the default template with:

```html
<h2>Verify your Polymarket Bot account</h2>
<p>Your verification code is:</p>
<h1 style="font-size: 32px; letter-spacing: 8px; font-family: monospace;">{{ .Token }}</h1>
<p>This code expires in 24 hours.</p>
```

3. Go to **Authentication → Providers → Email**
4. Make sure **Confirm email** is enabled
5. Set **OTP Expiry** to your preference (default 3600 seconds = 1 hour)

### Configure auth settings
1. Go to **Authentication → URL Configuration**
2. Set **Site URL** to your production domain (e.g. `https://yourdomain.com`)
3. Add `http://localhost:5173` to **Redirect URLs** for local dev

### Update your .env
```
PUBLIC_SUPABASE_URL=https://xxxxx.supabase.co
PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

---

## 2. Stripe Setup

### Create product
You don't need to create a product manually — the checkout API endpoint creates one dynamically. But you need:

1. Go to [dashboard.stripe.com](https://dashboard.stripe.com)
2. Get your **Secret Key** and **Publishable Key** from Developers → API Keys
3. Use **test mode keys** (`sk_test_...` / `pk_test_...`) for development

### Set up webhook
1. Go to Developers → Webhooks → Add endpoint
2. Endpoint URL: `https://yourdomain.com/api/webhook`
   - For local dev, use [Stripe CLI](https://stripe.com/docs/stripe-cli):
     ```bash
     stripe listen --forward-to localhost:5173/api/webhook
     ```
     This prints a `whsec_...` signing secret — use that as `STRIPE_WEBHOOK_SECRET`
3. Select events: **checkout.session.completed**
4. Copy the **Signing secret** (`whsec_...`)

### Update your .env
```
STRIPE_SECRET_KEY=sk_test_xxx
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_WEBHOOK_SECRET=whsec_xxx
```

---

## 3. User Flow Summary

```
┌─────────────┐     ┌──────────────┐     ┌─────────────┐     ┌──────────────┐
│  /register  │ ──▸ │  Enter OTP   │ ──▸ │  /pricing   │ ──▸ │   Stripe     │
│  email +    │     │  from email  │     │  click Pay  │     │   Checkout   │
│  password   │     │  (6 digits)  │     │             │     │              │
└─────────────┘     └──────────────┘     └─────────────┘     └──────┬───────┘
                                                                     │
                                          ┌──────────────┐           │
                                          │  /pricing    │ ◂─────────┘
                                          │  ?success=   │   webhook fires
                                          │  true        │   has_paid = true
                                          │              │
                                          │  ✅ Account  │
                                          │  Validated   │
                                          └──────────────┘
```

### What happens at each step:

1. **Sign up** → `supabase.auth.signUp()` creates auth user → trigger creates `public.users` row → Supabase sends OTP email
2. **Verify OTP** → `supabase.auth.verifyOtp()` confirms email → user is now authenticated → redirect to /pricing
3. **Pay** → Frontend calls `POST /api/checkout` with userId + email → creates Stripe Checkout Session → user redirected to Stripe
4. **Stripe webhook** → Stripe sends `checkout.session.completed` to `POST /api/webhook` → server updates `has_paid = true` in Supabase
5. **User returns** → lands on `/pricing?success=true` → sees "Account Validated" banner → Nav shows green "Validated" badge

### Login (returning user):
- `supabase.auth.signInWithPassword()` → fetch profile → if `has_paid === true` → home, else → /pricing

---

## 4. Testing Locally

```bash
# Terminal 1: run the app
npm run dev

# Terminal 2: forward Stripe webhooks
stripe listen --forward-to localhost:5173/api/webhook
```

Use Stripe test card: `4242 4242 4242 4242` with any future date and any CVC.

---

## 5. Production Deployment

When deploying (Vercel, Netlify, etc.):

1. Set all env vars in your hosting provider's dashboard
2. Switch Stripe keys from `sk_test_` to `sk_live_`
3. Create a production webhook endpoint in Stripe pointing to your live domain
4. Update Supabase Site URL to your production domain
