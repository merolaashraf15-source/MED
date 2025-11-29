# Online Medicine Order System - Design Guidelines

## Design Approach

**Selected Approach:** Design System (Material Design principles)
**Rationale:** Healthcare applications require trust, clarity, and functional efficiency. Material Design provides excellent form patterns, clear visual hierarchy, and appropriate feedback mechanisms for transactional interfaces.

**Design Principles:**
- Clinical cleanliness with approachable warmth
- Trust-building through professional presentation
- Clear information hierarchy for quick scanning
- Accessible form design with strong validation feedback

---

## Typography

**Font Families:**
- Primary: 'Inter' or 'Poppins' (clean, modern, highly legible)
- Headings: 600-700 weight
- Body: 400 weight
- Labels/Meta: 500 weight

**Hierarchy:**
- Page Titles: text-4xl md:text-5xl font-semibold
- Section Headings: text-2xl md:text-3xl font-semibold
- Card Titles: text-xl font-semibold
- Body Text: text-base
- Labels: text-sm font-medium uppercase tracking-wide
- Meta/Helper Text: text-sm

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 4, 6, 8, 12, 16 for consistent rhythm
- Component padding: p-6 to p-8
- Section spacing: py-12 md:py-16
- Card gaps: gap-6 md:gap-8
- Form field spacing: space-y-6

**Container Structure:**
- Max width: max-w-6xl mx-auto
- Page padding: px-6 md:px-8
- Form containers: max-w-2xl mx-auto

---

## Component Library

### Navigation Header
- Full-width with subtle shadow
- Logo/brand on left, navigation links center/right
- Height: h-16 to h-20
- Sticky positioning for easy access
- Include: "Home" | "Order Medicine" | "View Orders" links

### Homepage Hero
- Height: 60vh minimum with centered content
- Two-column layout on desktop (text left, supporting visual right)
- Primary CTA button: "Order Medicine Now"
- Secondary CTA: "View Order History"
- Trust indicators below CTAs: "Fast Delivery • Verified Medicines • Secure Orders"

### Homepage Features Section
- Three-column grid (grid-cols-1 md:grid-cols-3)
- Feature cards with icon, title, short description
- Features: "Easy Ordering" | "Quick Delivery" | "Trusted Pharmacy"
- Cards with rounded corners (rounded-xl), subtle elevation

### Order Form
- Single-column centered layout
- Card container with generous padding (p-8)
- Field structure per input:
  - Label with required indicator (*)
  - Input field with border, focus state with ring
  - Helper text below if needed
  - Error message space
- Input fields: Full width, rounded-lg, border-2, h-12
- Textarea for medicine details: h-32
- Submit button: Full width on mobile, auto width on desktop, positioned right
- Success confirmation message: Card with checkmark icon

### Orders Display Page
- Page header with title and count badge
- Grid layout: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Order cards with:
  - Order number/ID prominently displayed
  - Customer name and phone
  - Medicine details
  - Timestamp
  - Status badge (rounded-full pill shape)
- Empty state: Centered card with icon and "No orders yet" message

### Buttons
- Primary: px-6 md:px-8, py-3, rounded-lg, font-medium
- Secondary: Same size, outlined variant
- Icon buttons: Square with icon centered
- All buttons: Clear hover states with slight scale/shadow

### Form Validation
- Real-time validation on blur
- Error states: Red border (border-red-500), error icon, error message below
- Success states: Subtle checkmark icon in field
- Required field indicators: Asterisk (*) in red

### Cards
- Rounded corners: rounded-xl
- Subtle shadow: shadow-md with hover:shadow-lg transition
- Padding: p-6 to p-8
- White background with subtle border option

---

## Images

**Hero Section Image:**
- Modern, professional medical/pharmacy imagery
- Placement: Right side of hero on desktop, background overlay on mobile
- Style: Clean, bright, trustworthy aesthetic
- Suggested: Pharmacist with digital tablet, medicine bottles in organized shelving, or abstract medical pattern
- Treatment: Subtle gradient overlay for text readability

**Feature Icons:**
- Use Heroicons (outline style) via CDN
- Size: w-12 h-12
- Icons needed: ShoppingCart, Truck, ShieldCheck

**Empty State Illustration:**
- Placement: Orders page when no orders exist
- Simple icon or illustration of clipboard/prescription pad
- Keep minimal and professional

---

## Interactions

**Animations:** Minimal, purposeful only
- Page transitions: Smooth fade-in for content sections
- Button hovers: Subtle scale (scale-105) or shadow increase
- Form submission: Loading spinner on button
- Card hovers: Gentle shadow lift (hover:shadow-lg)

**No Animations Needed:**
- Scroll effects
- Complex transitions
- Background movements

---

## Accessibility

- All form inputs with proper labels and aria-attributes
- Focus states clearly visible with ring-2 styling
- Sufficient contrast ratios for all text
- Error messages programmatically associated with fields
- Skip navigation link for keyboard users