# Change Order ROM Helper

A beginner-friendly Next.js MVP for preparing rough-order-of-magnitude (ROM) change order pricing packages.

## MVP Features

- Input project information:
  - Project name
  - Client name
  - Change order number
  - Date
  - Subject/title
  - Scope description
  - Exclusions
  - Assumptions
- Add pricing rows for:
  - Labor
  - Material
  - Equipment
- Automatic calculations for:
  - Labor subtotal
  - Material subtotal
  - Equipment subtotal
  - Direct cost subtotal
  - Markup amount and percentage
  - Contingency amount and percentage
  - Final ROM total
- Generated output previews:
  - Pricing sheet preview
  - Cover letter draft
  - Printable summary page
- Export to PDF via browser print (`Print / Save as PDF`).

## Tech Stack

- Next.js (App Router)
- React
- TypeScript
- Local component state only (no auth, no database)

## Project Structure

```text
app/
  globals.css            # Global app and print styles
  layout.tsx             # Root layout + metadata
  page.tsx               # Main page, state management, app composition
components/
  PreviewPane.tsx        # Pricing preview, cover letter draft, summary page
  PricingTable.tsx       # Reusable table for labor/material/equipment rows
  ProjectInfoForm.tsx    # Project and narrative fields
  TotalsPanel.tsx        # Markup/contingency inputs and totals display
lib/
  calculations.ts        # Pure total and currency helper functions
  types.ts               # Shared TypeScript types
```

## Getting Started

### 1) Install dependencies

```bash
npm install
```

### 2) Run in development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 3) Create a production build (optional)

```bash
npm run build
npm run start
```

## How to Export PDF

1. Fill out your project details and pricing rows.
2. Click **Print / Save as PDF**.
3. In your browser print dialog, choose **Save as PDF**.

## Notes

- This is version 1 and intentionally simple.
- Data is kept in local state and will reset on page refresh.
