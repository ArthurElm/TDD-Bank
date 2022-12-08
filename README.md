# Sujet 

## Bank
- Retirer                                   diminue solde
- Deposer                                   ajouter solde
- ### Consulter le solde                      check solde avec card & code
- Virement                                  ajoute solde chez userX diminuer chez userY
- Consulter l'historique des opérations     
- Faire un prêt                             check solde sufisant
- Gerer les devises                         
- Ouvrir un compte                          créer user
- Cloturer un compte                        supp user
- Gerer plusieurs banques                   new bank diff users
- Modifier un compte                        modif user
- Gerer ses béneficiaries                   nouvelle propiété 

1 - TDD (coverage 100%)
2 - Code clean
3 - Cohérence

TESTS UNIQUEMENT
Faire fonction class ...

POUR DIMANCHE

## Commandes utilisées pour le projets
    npm init -y  // initialise projet -> créer package.json
    npm add typescript // Ajout typescript

### Jest
    Doc : https://jestjs.io/fr/docs/getting-started
    npm add jest ts-jest // ajout jest
    npm install --save-dev jest typescript ts-jest @types/jest
    npx ts-jest config:init

    touch banque.spec.ts // créer le fichier

### Lancer test
    npm test

### Lancer test with coverage
    npx jest --coverage

