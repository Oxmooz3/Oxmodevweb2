# 🚀 Guide de Déploiement OxmoDevWeb

## 📋 Prérequis
- Compte GitHub créé
- Compte Vercel créé (avec connexion GitHub)
- Git installé sur ta machine

## 🗂️ Étape 1: Initialiser Git et GitHub

### 1.1 Initialiser le dépôt Git
```bash
cd "/Users/utilisateur/Desktop/Site AI /Site vitrine portfolio"
git init
git add .
git commit -m "Initial commit - Site OxmoDevWeb"
```

### 1.2 Créer le dépôt GitHub
1. Va sur [GitHub.com](https://github.com)
2. Clique sur "New repository"
3. Nom : `oxmodevweb` (ou ton choix)
4. Description : `Site web de création de sites web avec IA`
5. Public ✅
6. NE PAS cocher "Add a README file"
7. Clique sur "Create repository"

### 1.3 Connecter local au distant
```bash
git remote add origin https://github.com/TON_USERNAME/oxmodevweb.git
git branch -M main
git push -u origin main
```

## 🌐 Étape 2: Déployer sur Vercel

### 2.1 Importer sur Vercel
1. Va sur [Vercel.com](https://vercel.com)
2. Connecte-toi avec ton compte GitHub
3. Clique sur "Add New Project"
4. Choisis "Import Git Repository"
5. Sélectionne ton dépôt `oxmodevweb`

### 2.2 Configuration Vercel
- **Framework Preset** : Other
- **Root Directory** : `./`
- **Build Command** : Laisse vide (site statique)
- **Output Directory** : Laisse vide
- **Install Command** : Laisse vide
- **Environment Variables** : Laisse vide pour l'instant

### 2.3 Déployer
- Clique sur "Deploy"
- Vercel va analyser et déployer ton site
- Attends quelques minutes

## 🔧 Étape 3: Configuration EmailJS (Important)

### 3.1 Domaines autorisés sur EmailJS
1. Va sur [EmailJS.com](https://www.emailjs.com/)
2. Connecte-toi à ton compte
3. Va dans "Email Services" → ton service
4. Ajoute ces domaines :
   - `localhost` (pour tests locaux)
   - `ton-domaine.vercel.app` (une fois déployé)
   - `ton-domaine-personnel.com` (si tu en as un)

### 3.2 Variables d'environnement Vercel
1. Dans Vercel → ton projet → Settings → Environment Variables
2. Ajoute :
   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=tEsjcoIN9xW4nqheR
   ```

## 📱 Étape 4: Personnalisation (Optionnel)

### 4.1 Domaine personnalisé
1. Dans Vercel → Settings → Domains
2. Ajoute ton domaine personnalisé
3. Configure les DNS selon les instructions Vercel

### 4.2 Optimisations
- Activer "Automatic Deployments" pour les pushes git
- Configurer "Analytics" pour les statistiques
- Ajouter "Protect Branch" pour la branche main

## 🧪 Tests de validation

### Test local
```bash
# Serveur local
python3 -m http.server 8000
# Ouvre http://localhost:8000
```

### Test production
- Ovre `https://ton-domaine.vercel.app`
- Teste toutes les fonctionnalités
- Vérifie le formulaire EmailJS

## 🔄 Workflow de mise à jour

### Pour faire des modifications :
```bash
# 1. Modifier les fichiers
# 2. Commiter
git add .
git commit -m "Description des modifications"

# 3. Pusher
git push origin main

# 4. Vercel déploie automatiquement
```

## 📊 Monitoring

### Vercel Analytics
- Visiteurs uniques
- Pages vues
- Performance
- Erreurs

### GitHub Actions (optionnel)
- Tests automatiques
- Validation du code
- Déploiement conditionnel

## 🛡️ Sécurité

### Bonnes pratiques
- Ne jamais exposer de clés secrètes
- Utiliser les variables d'environnement
- Activer HTTPS (automatique sur Vercel)
- Surveiller les logs d'erreurs

## 📞 Support

### Liens utiles
- [Documentation Vercel](https://vercel.com/docs)
- [Documentation GitHub](https://docs.github.com)
- [Documentation EmailJS](https://www.emailjs.com/docs/)

### En cas de problème
1. Vérifie les logs Vercel
2. Check la console du navigateur
3. Valide la configuration EmailJS

---

🎉 **Félicitations !** Ton site OxmoDevWeb sera bientôt en ligne !

Une fois déployé, tu auras :
- 🌐 Site en production sur Vercel
- 📊 Statistiques et monitoring
- 🔄 Déploiements automatiques
- 🛡️ HTTPS et sécurité intégrée
