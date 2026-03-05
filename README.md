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

## Publieke informatiepagina's

De home is uitgebreid met extra pagina's voor oriëntatie en sales:

- `/wat-is-het`
- `/wat-kan-het`
- `/waarom`
- `/hoe`
- `/wanneer`
- `/kosten`

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

## Firebase CLI setup

In deze repository is Firebase CLI geconfigureerd met:

- `.firebaserc` (project: `grondi-core`)
- `firebase.json` (Firestore/Storage rules + emulators)
- `firestore.rules`
- `firestore.indexes.json`
- `storage.rules`

Belangrijke commando's:

```bash
npm run firebase:emulators
npm run firebase:deploy:rules
```

Let op: Firestore rules deploy werkt direct; Storage rules deploy vereist dat Firebase Storage
éénmalig is geactiveerd in de Firebase Console (project `grondi-core`).

## Testen

```bash
npm run lint
npm run test:run
npm run test:e2e
npm run build
```

## CI (GitHub Actions)

Bij elke push/PR naar `main` draait automatisch:

- Lint
- Unit tests (Vitest)
- E2E smoke test (Playwright)
- Production build

Workflowbestand: `.github/workflows/ci.yml`.

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

## Update log

- 2026-03-04: Homepagina herwerkt naar een samenhangender dashboard-opzet met compacte hero, statuspaneel en snelle start.
- 2026-03-04: Dark mode stabilisatie uitgevoerd (snellere theme-apply + expliciete `color-scheme`) en contrast van formuliercontrols verbeterd.
- 2026-03-04: Logo visueel vernieuwd voor professionelere uitstraling.

## Productrichting na MVP

- Weersafhankelijke planning
- KPI dashboard per vestiging
- GPS route optimalisatie
- AI fotoherkenning en voorraadvoorspelling
- Audit export (CSV/PDF)