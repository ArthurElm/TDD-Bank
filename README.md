# Sujet 

## Bank
- Retirer                                  
- Deposer                                  
- Consulter le solde                      
- Virement                                  
- Consulter l'historique des opérations     
- Ajouter une opération (en fonction de l'action effectuée)
- Faire un prêt                            
- Gerer les devises                         
- Ouvrir un compte                          
- Cloturer un compte                        
- Modifier un compte                       
- Gerer ses béneficiaries (WIP)                

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

## NB
Nous avons commencé la partie pour les bénéficiares mais nous avons manqué de temps. Nous avons souhaité laisser nos pistes de réflexion.

Pour la ligne notée comme non couverte pas les tests (ligne 147), le cas ou le tableau d'opérations renvoyée par la méthode getOperations ne fonctionne pas dans le expect().
