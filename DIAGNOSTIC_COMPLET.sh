#!/bin/bash
echo "═══════════════════════════════════════════════════════════════════════════════"
echo "🔍 DIAGNOSTIC COMPLET DU SITE"
echo "═══════════════════════════════════════════════════════════════════════════════"
echo ""

echo "📁 PAGES ACTIVES:"
ls -1 pages/*.html | grep -v "_OLD" | wc -l
echo ""

echo "📄 LISTE DES PAGES:"
ls -1 pages/*.html | grep -v "_OLD"
echo ""

echo "🔗 VÉRIFICATION MENU DANS CHAQUE PAGE:"
for page in pages/qui-sommes-nous.html pages/directeur.html pages/but.html pages/contact.html pages/infos-pratiques.html pages/prochains-concerts.html pages/recrutement.html pages/galerie.html pages/repertoires.html; do
    if [ -f "$page" ]; then
        echo "  Vérif: $(basename $page)"
        # Vérifier présence du nouveau menu
        if grep -q "Infos pratiques" "$page"; then
            echo "    ✅ Nouveau menu présent"
        else
            echo "    ❌ ANCIEN menu - À CORRIGER"
        fi
    fi
done
echo ""

echo "✅ DIAGNOSTIC TERMINÉ"
