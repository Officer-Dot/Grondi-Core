# Grondi-Core

GrondiCore is een operationeel kernplatform met 4 hoofdpijlers:

- Objecten
- Planning
- Assets
- Taken

Stack:

- Next.js + TypeScript + Tailwind
- Firebase Auth + Firestore + Storage
- GitHub workflow + Vercel deployment

## MVP scope

Deze eerste MVP bevat:

- Login
- Objecten aanmaken
- Taken aanmaken
- Planning board (drag & drop)
- Urenregistratie
- Foto upload

## Core structuur

- Objecten: historie, foto’s, taken, status, onderhoudslog
- Planning: medewerker/machine toewijzing en route-overzicht
- Assets: onderhoudsinterval, storingen, QR, uren, status
- Taken: beschrijving, checklist, foto’s, materiaalgebruik, auditlog

## Rollen (RBAC)

- Medewerker: taken, foto upload, uren, status
- Planner: planning, taken, koppelingen
- Beheerder: assets, objecten, rapportages
- Admin: rechten, vestigingen, abonnementen

## Multi-tenant architectuur

Tenant-gebaseerde structuur:

- `/tenants/{tenantId}/users/{userId}`
- `/tenants/{tenantId}/objects/{objectId}`
- `/tenants/{tenantId}/assets/{assetId}`
- `/tenants/{tenantId}/tasks/{taskId}`
- `/tenants/{tenantId}/timeEntries/{entryId}`

## Local setup

1. Installeer dependencies:

   ```bash
   npm install
   ```

2. Maak lokaal env bestand:

   ```bash
   copy .env.example .env.local
   ```

3. Vul Firebase waarden in `.env.local`.

4. Start development server:

   ```bash
   npm run dev
   ```

## Testen

```bash
npm run lint
npm run test:run
npm run build
```

## GitHub

```bash
git init
git add .
git commit -m "Initial GrondiCore MVP"
git remote add origin https://github.com/Officer-Dot/Grondi-Core
git branch -M main
git push -u origin main
```

## Vercel

1. Project: https://vercel.com/officer-dots-projects/grondi-core
2. Koppel de GitHub repository `Officer-Dot/Grondi-Core`.
3. Zet alle `NEXT_PUBLIC_FIREBASE_*` variabelen (inclusief `NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID`) in Project Settings.
4. Deploy vanaf `main`.

## Productrichting na MVP

- Weersafhankelijke planning
- KPI dashboard per vestiging
- GPS route optimalisatie
- AI fotoherkenning en voorraadvoorspelling
- Audit export (CSV/PDF)