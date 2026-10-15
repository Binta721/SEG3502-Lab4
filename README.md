# SEG3502 — Laboratoire 4

Ce laboratoire d'architecture et de conception logicielle porte sur Angular, les formulaires réactifs et le routage. L'application valide des coordonnées et les affiche sur une deuxième page.

## Technologies et structure

Angular 22.2 (22.2.2 dans package-lock.json), TypeScript 6, Angular Router, Reactive Forms, HTML et CSS. Les composants sont standalone, sans NgModule. Les tests utilisent le builder @angular/build:unit-test, Vitest et jsdom.

| Fichier ou dossier | Rôle |
| --- | --- |
| src/main.ts | Démarrage |
| src/index.html | Document HTML en français |
| src/app/app.ts et app.html | Racine et router-outlet |
| src/app/app.config.ts | Configuration et provideRouter |
| src/app/app.routes.ts | Routes |
| src/app/app.routes.spec.ts | Tests du routage et de l'intégration |
| src/app/contact.ts | Interface Contact |
| src/app/contact-data.ts et .spec.ts | Service partagé et tests |
| src/app/contact-form/ | Formulaire, styles et tests |
| src/app/contact-result/ | Résultats, styles et tests |
| angular.json, tsconfig*.json | Configuration de compilation et de test |
| package.json, package-lock.json | Scripts et dépendances |

## Prérequis et installation

Les dépendances verrouillées exigent Node.js `^22.22.3`, `^24.15.0` ou `>=26.0.0`. Node 22.16.0 est trop ancien. Le champ packageManager indique npm 11.13.0 ; cette contribution a été vérifiée avec npm 10.9.2 et un runtime temporaire Node 24.15.0.

Depuis la racine :

```bash
node --version
npm --version
npm ci
npm start
```

Ouvrir http://localhost:4200/. npm ci installe les versions verrouillées. Aucun backend ni aucune base de données ne sont nécessaires.

## Formulaire et validations

- Prénom et nom obligatoires avec Validators.required.
- Téléphone facultatif ; exactement 10 chiffres si renseigné, premier et quatrième non nuls. Motif : `^[1-9][0-9]{2}[1-9][0-9]{6}$`.
- Téléphone valide : `6135550123`. Invalides : `0135550123`, `6130550123`, `613555012`.
- Courriel facultatif, validé avec Validators.email si renseigné.

Une soumission invalide marque les champs comme touchés pour afficher les erreurs, sans transmettre les données ni naviguer. Une soumission valide enregistre les quatre valeurs dans le service avant de naviguer vers /resultat. Les champs facultatifs vides sont enregistrés comme chaînes vides.

## Service partagé

ContactData est injectable avec providedIn: 'root'. L'interface Contact contient firstName, lastName, phone et email, tous de type string. setContact() enregistre les données et remplace un contact précédent. getContact() renvoie le contact ou null avant toute soumission.

Le stockage est uniquement en mémoire : un rechargement perd les données. Aucun stockage persistant n'est utilisé.

## Routage et résultats

| URL | Comportement |
| --- | --- |
| / | Redirection vers /formulaire |
| /formulaire | Formulaire |
| /resultat | Résultats |
| URL inconnue | Redirection vers /formulaire |

provideRouter(routes) active le routage ; router-outlet affiche les pages. Le formulaire injecte le Router pour naviguer après validation.

La page de résultats récupère le contact avec getContact() et affiche les quatre valeurs exactes dans un tableau HTML avec caption, thead, tbody et en-têtes scope="col". Les cellules facultatives restent vides lorsque les champs sont vides. Le conteneur permet le défilement horizontal sur petit écran.

Sans données, un message invite à remplir le formulaire. Le bouton « Retour au formulaire » fonctionne avec ou sans contact. Le formulaire est recréé vide au retour ; le service conserve le dernier contact jusqu'à une nouvelle soumission ou un rechargement.

## Tests et compilation

```bash
npm test
npm test -- --watch=false
npm run build
npm run watch
```

npm test lance les tests interactifs ; --watch=false effectue une seule exécution. npm run build compile en production ; npm run watch compile en continu en développement.

Les tests couvrent le service (absence initiale, enregistrement, récupération, remplacement), les champs obligatoires, les téléphones valides et invalides, le courriel facultatif, l'enregistrement avant navigation, le refus d'une soumission invalide, le tableau, les champs facultatifs vides et l'absence de contact. RouterTestingHarness vérifie les redirections, l'accès aux pages, une soumission avec le véritable service et Router, ainsi que le bouton de retour.

Les tests jsdom ne remplacent pas une vérification visuelle dans un navigateur.

### Résultats de la vérification de finalisation

L'installation `npm ci --no-audit --no-fund` a réussi. La compilation de production et les 25 tests répartis dans 5 fichiers ont réussi avec Node 24.15.0 et npm 10.9.2. Pour employer ce runtime temporaire sans modifier les dépendances du projet, les commandes exécutées étaient :

```bash
npm exec --yes --package=node@24.15.0 -c "npm run build"
npm exec --yes --package=node@24.15.0 -c "npm test -- --watch=false"
```

Avec une version de Node compatible déjà installée, les commandes ordinaires ci-dessus suffisent. Les vérifications visuelles et manuelles ci-dessous restent à effectuer.

### Vérifications manuelles avant remise

1. Démarrer avec npm start ; vérifier la redirection de / vers /formulaire.
2. Soumettre un formulaire vide : erreurs visibles et aucune navigation.
3. Essayer les téléphones invalides ci-dessus et un courriel comme adresse-invalide.
4. Soumettre quatre valeurs valides et comparer chaque cellule aux valeurs saisies.
5. Refaire avec téléphone et courriel vides.
6. Utiliser le bouton de retour à la souris et au clavier.
7. Recharger /resultat : vérifier le message d'absence de données et le retour.
8. Vérifier sur écran étroit la lisibilité, le défilement horizontal et le focus clavier.

## Répartition des responsabilités

- **Développeuse 1 (partenaire)** : création du projet, formulaire réactif initial, validations et première interface. Le commit 8064ee0 (Implement contact form and result page) contient également le service, les routes, la première page de résultats et les tests de création.
- **Développeuse 2** : vérification et typage du service, vérification du routage existant, correction et amélioration des résultats, bouton de retour, tests complémentaires et d'intégration, compilation et documentation. Le code fonctionnel du formulaire et les routes existantes sont conservés.

## Versionnement et remise

Les changements sont préparés sur feat/verification-finalisation. Aucun commit, push ou merge n'est effectué automatiquement.

Conserver les sources, tests, README et fichier de verrouillage. node_modules/, dist/, .angular/cache/ et coverage/ sont ignorés par .gitignore et ne doivent pas être ajoutés. Aucun énoncé détaillé supplémentaire n'a été trouvé dans le dépôt ; vérifier les modalités de remise sur la plateforme du cours.
