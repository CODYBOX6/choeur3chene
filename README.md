# 🎵 Site Web - Chœur des Trois-Chêne

Site web moderne et responsive créé pour le Chœur des Trois-Chêne (fondé en 1950).

## 📸 Images récupérées du site original

Les images suivantes ont été automatiquement récupérées de l'ancien site :

✅ **Images principales :**
- `assets/choeur-hero.png` - Photo de groupe du chœur (image principale page d'accueil)
- `assets/choeur-groupe.png` - Photo de groupe (backup)
- `assets/favicon.ico` - Icône du site (smileys)
- `assets/logo.svg` - Logo SVG du chœur
- `assets/smiley-faces-vinyl-sticker.jpg` - Logo smileys original
- `assets/p021_1_02.jpg` - Illustration personnages dansants
- `assets/verre.gif` - Animation verres pour les verrées
- `assets/planning-2024.png` - Planning des répétitions 2024
- `assets/chene-bourg-historique.png` - Photo vintage de Chêne-Bourg

## 📷 Ajouter vos propres photos de concerts

Pour ajouter des photos de vos concerts à la galerie :

1. **Placez vos photos** dans le dossier `assets/galerie/`
2. **Nommez-les de façon descriptive**, par exemple :
   - `concert-cimarosa-2023-1.jpg`
   - `concert-noel-2022.jpg`
   - `repetition-janvier-2024.jpg`

3. **Modifiez le fichier** `pages/galerie.html` :
   - Remplacez les `<div class="image-placeholder">` par vos vraies images
   - Exemple :
   ```html
   <!-- AVANT (placeholder) -->
   <div class="image-placeholder">
       <i class="fas fa-image"></i>
   </div>
   
   <!-- APRÈS (vraie image) -->
   <img src="../assets/galerie/concert-cimarosa-2023-1.jpg" 
        alt="Concert Cimarosa 2023">
   ```

## 🚀 Lancement du site

### Option 1 : Serveur Python (recommandé pour les tests)
```bash
cd "/chemin/vers/choeur3chene"
python3 -m http.server 8080
```
Puis ouvrez : http://localhost:8080

### Option 2 : Déploiement en ligne
- **GitHub Pages** (gratuit)
- **Netlify** (gratuit, drag & drop)
- **Serveur web classique** (FTP vers votre hébergeur)

## 📱 Structure du site

```
choeur3chene/
├── index.html              # Page d'accueil
├── css/
│   ├── style.css          # Styles principaux
│   └── responsive.css     # Styles responsive
├── js/
│   └── main.js            # Interactions JavaScript
├── assets/
│   ├── *.png, *.jpg       # Images du site
│   ├── logo.svg           # Logo
│   └── favicon.ico        # Icône du navigateur
└── pages/
    ├── qui-sommes-nous.html    # Histoire du chœur
    ├── directeur.html          # Le directeur
    ├── comite.html             # Le comité
    ├── contact.html            # Formulaire de contact
    ├── recrutement.html        # Rejoignez-nous
    ├── soprani.html            # Pupitre soprani
    ├── planning.html           # Planning 2024-2025
    └── galerie.html            # Galerie photos
```

## ✨ Fonctionnalités principales

- ✅ Design moderne et responsive (mobile, tablette, desktop)
- ✅ Menu hamburger mobile
- ✅ Formulaire de contact avec validation
- ✅ Galerie photos avec filtres et lightbox
- ✅ Timeline interactive de l'histoire
- ✅ Planning détaillé et interactif
- ✅ Animations fluides au scroll
- ✅ Optimisé pour le SEO
- ✅ Accessibilité (navigation clavier, ARIA)

## 🎨 Personnalisation

### Couleurs
Les couleurs sont définies dans `css/style.css` :
```css
:root {
    --primary-color: #2c3e50;    /* Bleu foncé */
    --secondary-color: #e74c3c;  /* Rouge */
    --accent-color: #f39c12;     /* Orange */
}
```

### Contenu
- **Coordonnées** : Modifier dans toutes les pages (email, téléphone)
- **Horaires** : Mettre à jour dans `pages/planning.html`
- **Membres du comité** : `pages/comite.html`
- **Liste des choristes** : `pages/soprani.html`, etc.

## 📧 Contact

- **Email** : c3chene@gmail.com
- **Téléphone** : 022 349 24 44
- **Adresse** : Salle place Favre, Chêne-Bourg, Genève

## 📝 Notes importantes

1. **Images manquantes** : Les photos de concerts spécifiques de l'ancien site n'étaient pas accessibles. Ajoutez vos propres photos dans `assets/galerie/`

2. **Favicon** : L'icône utilise le logo smileys. Pour un favicon personnalisé, remplacez `assets/favicon.ico`

3. **Responsive** : Le site s'adapte automatiquement à toutes les tailles d'écran

4. **Navigateurs supportés** : Chrome, Firefox, Safari, Edge (versions récentes)

---

🎵 **Site créé avec ❤️ pour le Chœur des Trois-Chêne** 🎵

# choeur3chene
