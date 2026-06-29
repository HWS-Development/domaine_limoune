# Domaine Limoune Design System

Source de vérité pour le nouveau site Domaine Limoune. Les pages peuvent ajouter des overrides dans `design-system/domaine-limoune/pages/` si nécessaire.

## Direction

- Positionnement : domaine hôtelier expérientiel, nature premium, hospitalité marocaine contemporaine.
- Référence structurelle : Capella Sydney pour la hiérarchie, les univers, les landing pages et la conversion segmentée.
- À éviter : rendu touristique chargé, vert dominant, promotion agressive, textes flous, animations qui gênent la lecture.

## Couleurs

| Rôle | Hex | Variable |
| --- | --- | --- |
| Ivoire | `#fff8ee` | `--limoune-ivory` |
| Fond sable | `#f6efe3` | `--limoune-bg` |
| Sable | `#ead8be` | `--limoune-sand` |
| Beige chaud | `#d9bea0` | `--limoune-beige` |
| Terracotta doux | `#c97852` | `--limoune-terracotta` |
| Orange Limoune | `#d8763e` | `--limoune-orange` |
| Brun profond | `#3d2518` | `--limoune-brown` |
| Noir doux | `#17120e` | `--limoune-black` |
| Texte secondaire | `#766253` | `--limoune-muted` |

## Typographie

- Titres : serif élégante, grandes tailles, tracking serré, phrases courtes.
- Textes : sans-serif moderne, base 16px minimum, line-height 1.5 à 1.75.
- Ton : clair, premium, sensoriel sans excès, orienté information et conversion.

## Layout

- Mobile-first, aucun scroll horizontal.
- Header sticky avec bouton Réserver toujours visible.
- Pages structurées : hero, promesse, informations pratiques, galerie/collection, CTA, FAQ/contact.
- Largeur max : 1480px pour conserver une impression éditoriale premium.

## Motion

- Animations GPU seulement : transform, opacity, filter.
- Réduction de mouvement respectée via `prefers-reduced-motion`.
- Effets autorisés : reveal doux, zoom hero très lent, flip card 3D, overlays cinématiques, micro-interactions tactiles.
- Pas de surcharge : l’animation sert la hiérarchie, jamais la décoration gratuite.

## SEO

- Une page par univers et par fiche importante.
- H1 unique, metadata par page, alternates multilingues, sitemap, robots, JSON-LD.
- Maillage interne systématique entre séjour, réserve, parc, restaurants, spa, mariages, corporate, offres et contact.

## Conversion

- CTA spécifique par page : séjour, table, soin, mariage, corporate, offre, brochure, contact.
- Formulaires séparés pour mariage, corporate, spa, restaurant et contact adaptatif.
- Tracking prévu pour clics réservation, WhatsApp, formulaires, PDF et CTA.

## Accessibilité

- Contrastes lisibles.
- Focus visible.
- Labels visibles sur formulaires.
- Images avec textes alternatifs.
- Targets interactives minimum 44px.
