#!/bin/bash
echo "🔍 DIAGNOSTIC COMPLET DES PROBLÈMES D'AFFICHAGE"
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""

echo "1. Vérification des fichiers CSS et JS:"
for file in css/style.css css/responsive.css js/main.js; do
    if [ -f "$file" ]; then
        echo "  ✅ $file ($(wc -l < $file | tr -d ' ') lignes)"
    else
        echo "  ❌ MANQUANT: $file"
    fi
done
echo ""

echo "2. Vérification des liens vers CSS/JS dans index.html:"
grep -E "href=.*\.css|src=.*\.js" index.html | sed 's/.*href="\|.*src="\|".*//g' | while read link; do
    [ -f "$link" ] && echo "  ✅ $link" || echo "  ❌ CASSÉ: $link"
done
echo ""

echo "3. Vérification des liens vers CSS/JS dans les pages:"
for page in pages/qui-sommes-nous.html pages/contact.html pages/galerie.html; do
    echo "  Page: $(basename $page)"
    grep -oE '\.\./css/[^"]+\.css|\.\./js/[^"]+\.js' "$page" | while read link; do
        filepath="${link#../}"
        [ -f "$filepath" ] && echo "    ✅ $link" || echo "    ❌ CASSÉ: $link"
    done
done
echo ""

echo "4. Test de chargement des pages principales:"
for page in index.html pages/qui-sommes-nous.html pages/contact.html pages/galerie.html pages/recrutement.html; do
    if [ -f "$page" ]; then
        size=$(wc -c < "$page" | tr -d ' ')
        [ $size -gt 100 ] && echo "  ✅ $page ($size bytes)" || echo "  ⚠️  $page TROP PETIT ($size bytes)"
    else
        echo "  ❌ MANQUANT: $page"
    fi
done
echo ""

echo "✅ Diagnostic terminé"
