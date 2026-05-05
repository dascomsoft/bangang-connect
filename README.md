

 🌍 Bangang Connect(VERSION WEB EN COURS)

Plateforme communautaire pour la diaspora Bangang (Cameroun 🇨🇲 & Monde 🌍)

##  À propos

**Bangang Connect** est une plateforme communautaire conçue pour rassembler et connecter la diaspora Bangang du Cameroun et du monde entier.

### Problématiques
- Manque de centralisation des communautés  
- Difficulté à organiser des réunions par secteur  
- Absence de communication en temps réel  
- Faible visibilité des événements locaux  
- Pas de monétisation des initiatives  

### Solutions
- Plateforme unifiée et structurée par régions et diaspora  
- Chat temps réel avec notifications push  
- Système de boost pour les événements  
- Monétisation via annonces sponsorisées et boosts  

---

## 📊 Statistiques clés

| Métrique | Valeur |
|----------|--------|
| Communautés supportées | 10 régions du Cameroun + 20 pays diaspora |
| Rôles utilisateurs | Super Admin, Village Chief, Community Chief, Sector President, Member |
| Latence chat | < 50ms |
| Notifications push | Mobile & Desktop |
| Modération | Signalement + suppression automatique |

---

## 🏗️ Architecture

### Backend
- Next.js 15 (App Router)  
- MongoDB Atlas  
- Socket.io (temps réel)  
- JWT (authentification)  
- Cloudinary (images)  
- Web Push (notifications)  

### Frontend
- Tailwind CSS  
- TypeScript  
- React Hooks  
- Context API  
- Mobile-first design  

### Base de données
- Users (auth, rôles, photos)  
- Communities (villes/pays)  
- Sectors (réunions)  
- Events (création, boost, participants)  
- Ads (annonces sponsorisées)  
- Messages (chat temps réel)  
- Comments (commentaires + signalements)  

---

## 👥 Système de rôles

| Rôle | Privilèges | Dashboard |
|------|------------|-----------|
| 👑 Super Admin | Contrôle total | `/dashboard/admin` |
| 🏘️ Village Chief | Supervision globale | `/dashboard/village` |
| 🌍 Community Chief | Gestion ville/pays | `/dashboard/community` |
| 👤 Sector President | Gestion secteur | `/dashboard/president` |
| 👥 Member | Participation | `/dashboard` |

---

## ✨ Fonctionnalités

- 🔐 **Authentification** : inscription par téléphone (+237), JWT, RBAC  
- 💬 **Chat temps réel** : Socket.io, notifications push, modération  
- 📅 **Événements** : création, boost, compteur participants, commentaires  
- 📢 **Annonces** : sponsorisation, modération, commentaires publics  
- 🌍 **Communautés** : gestion par régions et diaspora  
- 👑 **Administration** : dashboards, CRUD utilisateurs, statistiques temps réel  
- 🖼️ **Médias** : Cloudinary, optimisation automatique, avatars par défaut  

---

## 🚀 Installation

### Prérequis
- Node.js >= 18  
- MongoDB Atlas (ou local)  
- npm ou yarn  

### Étapes
```bash
git clone https://github.com/your-username/bangang-connect.git
cd bangang-connect
npm install
cp .env.example .env.local
npm run seed
npm run dev
```

---

## 🔐 Sécurité
- JWT stateless  
- bcrypt pour mots de passe  
- RBAC par rôle  
- Rate limiting anti-spam  
- Validation des inputs (Zod)  
- Cookies HTTP-only  
- CORS configuré  
- Sanitization des données  

---

## 📈 Performance
- Lazy loading  
- Optimisation images (Cloudinary)  
- Indexation MongoDB  
- Pagination messages (100 max)  
- WebSocket temps réel  
- CDN pour assets  

---

## 📊 Roadmap

### ✅ Version 1.0 (MVP EN COURS DE REALISATION)
- Authentification par téléphone  
- Chat temps réel  
- CRUD communautés/secteurs  
- Événements + boost  
- Annonces sponsorisées  
- Dashboard admin  
- Notifications push  

### ⏳ Version 1.1
- Messages vocaux  
- Partage d’images  
- Recherche dans le chat  
- Mode sombre  
- Export conversations  

### 🔮 Version 2.0
- App mobile (React Native)  
- Appels audio/vidéo  
- Paiements intégrés (Orange Money, MTN Money)  
- IA pour modération auto  
- Statistiques avancées  

---



