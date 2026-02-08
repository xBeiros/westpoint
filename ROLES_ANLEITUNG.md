# Rollen-Berechtigungen Anleitung

## Welche Berechtigungen gibt es?

### Spieler-Berechtigungen:
- `admin.players.view` - Spieler anzeigen
- `admin.players.kick` - Spieler kicken
- `admin.players.ban` - Spieler bannen
- `admin.players.warn` - Spieler warnen
- `admin.players.dm` - Nachricht senden
- `admin.players.revive` - Spieler wiederbeleben

### Rollen-Berechtigungen:
- `admin.roles.view` - Rollen anzeigen
- `admin.roles.create` - Rollen erstellen
- `admin.roles.edit` - Rollen bearbeiten
- `admin.roles.delete` - Rollen löschen

### Wildcard-Berechtigung:
- `*` - Alle Berechtigungen (Super-Admin)

## Wie bekomme ich Berechtigungen?

### Schritt 1: Initial-Setup (Einmalig)

Führe den Seeder aus, um die Standard-Rollen zu erstellen:

```bash
php artisan db:seed --class=RoleSeeder
```

Dies erstellt folgende Rollen:
- **admin**: Alle Berechtigungen
- **moderator**: Eingeschränkte Berechtigungen
- **superadmin**: Alle Berechtigungen (*)

### Schritt 2: Rolle in RedM-Datenbank zuweisen

1. Öffne deine RedM-Datenbank
2. Finde deinen Spieler in der `users` Tabelle
3. Setze das `group` Feld auf eine der erstellten Rollen (z.B. `admin` oder `superadmin`)

**SQL-Beispiel:**
```sql
UPDATE users SET `group` = 'admin' WHERE identifier = 'dein_identifier';
```

### Schritt 3: Im Dashboard verwenden

Nachdem du die Rolle in der RedM-Datenbank zugewiesen hast:
1. Logge dich im Dashboard ein (mit Discord)
2. Gehe zu "Administrativ" > "Rollen"
3. Du kannst jetzt Rollen verwalten, wenn deine Rolle die entsprechenden Berechtigungen hat

## Manuelle Rolle erstellen (SQL)

Falls du eine Rolle manuell in der Datenbank erstellen möchtest:

```sql
INSERT INTO roles (name, description, permissions, created_at, updated_at)
VALUES (
    'admin',
    'Administrator mit allen Berechtigungen',
    '["admin.players.view","admin.players.kick","admin.players.ban","admin.players.warn","admin.players.dm","admin.players.revive","admin.roles.view","admin.roles.create","admin.roles.edit","admin.roles.delete"]',
    NOW(),
    NOW()
);
```

## Wichtige Hinweise

1. **Die Rolle muss existieren**: Die `group` in der RedM `users` Tabelle muss mit einem `name` in der Laravel `roles` Tabelle übereinstimmen.

2. **Wildcard-Berechtigung**: Wenn eine Rolle `*` als Berechtigung hat, hat sie automatisch alle Berechtigungen.

3. **Sicherheit**: Du kannst nur Berechtigungen setzen, die du selbst hast. Wenn du z.B. keine `admin.roles.edit` Berechtigung hast, kannst du keine Rollen bearbeiten.

4. **Initial-Setup Problem**: Beim ersten Setup musst du die Admin-Rolle manuell in der Datenbank erstellen oder den Seeder ausführen, da du sonst keine Berechtigung hast, Rollen zu erstellen.

## Troubleshooting

**Problem**: "Du hast keine Berechtigung, Rollen zu bearbeiten"

**Lösung**: 
1. Prüfe, ob deine `group` in der RedM-Datenbank mit einer Rolle in der `roles` Tabelle übereinstimmt
2. Prüfe, ob diese Rolle die benötigten Berechtigungen hat (`admin.roles.edit` oder `*`)
3. Führe den Seeder aus, um die Standard-Rollen zu erstellen

**Problem**: "Keine Berechtigung" beim Erstellen von Rollen

**Lösung**: 
1. Erstelle die Admin-Rolle manuell in der Datenbank (siehe SQL-Beispiel oben)
2. Oder führe den Seeder aus: `php artisan db:seed --class=RoleSeeder`



