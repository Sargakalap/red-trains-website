# Firestore Security Rules Setup

A permission error jelentkezik, mert a Firestore Security Rules nem engedik meg az üzenetek olvasását.

## Megoldás

Az üzenetek most már a felhasználó dokumentumában tárolódnak, ezért egyszerűbb Security Rules szükséges.

## Hogyan állítsd be a Security Rules-t?

1. Menj a **Firebase Console**-ra: https://console.firebase.google.com
2. Válaszd ki a projekted: **red-trains**
3. A bal oldali menüből válaszd: **Firestore Database**
4. Kattints a **Rules** lapra
5. Töröld az összes jelenlegi tartalmat és másold be az alábbi kódot:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Admin check function (case-insensitive)
    function isAdmin() {
      return request.auth != null && request.auth.token.email.lower() == "sargakalapos@icloud.com"; 
    }
    
    // users collection rules
    match /users/{userId} {
      // CREATE: Admin OR the user themselves can create (fixes auto-signin issue)
      allow create: if isAdmin() || (request.auth != null && request.auth.uid == userId);
      
      // READ/UPDATE: Users can read/update their own document
      allow read, update: if request.auth != null && request.auth.uid == userId;
      
      // ADMIN: Can read, update, and delete all user documents
      allow read, update, delete: if isAdmin();
    }
    
    // messages collection rules
    match /messages/{messageId} {
      // CREATE: Any authenticated user can send messages
      allow create: if request.auth != null;
      
      // READ/DELETE: Only admin can read and delete messages
      allow read, delete: if isAdmin();
    }

    // articles collection - admin can create/update/delete, public can read
    match /articles/{articleId} {
      // Anyone (including unauthenticated) can read articles
      allow read: if true;
      // Only admin can create/update/delete
      allow create, update, delete: if isAdmin();
    }
  }
}
  }
}
```

## 6. Lépés: Mentés

Kattints a **Publish** gombra a módosítások mentéséhez.

## Mi történt?

- Az **üzeneteket** most már a felhasználó dokumentumában (`users/{userId}.messages`) tároljuk
- Felhasználók **olvashatják és módosíthatják** a **saját dokumentumukat**, beleértve az üzeneteiket
- Az **adminok** bárki dokumentumát módosíthatják, így üzeneteket tudnak küldeni a felhasználóknak
- Az admin által küldött üzenetek a `users/{userId}.messages` arrayben tárolódnak
- Régi `messages` collection továbbra is használható az admin-felhasználó párbeszédhez

## Tesztelés

Miután beállítottad az új Security Rules-t:
1. Jelentkezz ki és vissza az alkalmazásban
2. Az üzenetek most már láthatóak lesznek az adminnak küldött üzenetek között
3. Az adminok tudnak üzeneteket küldeni a felhasználóknak

