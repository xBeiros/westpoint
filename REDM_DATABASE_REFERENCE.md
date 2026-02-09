# RedM Datenbank Referenz

Diese Datei dient als Referenz für die RedM VORP Core Datenbankstruktur.

## Übersicht

Die RedM-Datenbank verwendet MariaDB/MySQL und enthält alle Spielerdaten, Items, Jobs und weitere Gameplay-relevante Informationen.

## Wichtige Tabellen

### 1. `users` - Benutzerkonten

Haupttabelle für Spieler-Accounts. Jeder Spieler hat einen Eintrag in dieser Tabelle.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `identifier` | varchar(50) | Primary Key - Steam Identifier (z.B. `steam:11000010bd7ab83`) |
| `group` | varchar(50) | Benutzergruppe (z.B. `admin`, `user`) - Default: `user` |
| `warnings` | int(11) | Anzahl der Verwarnungen - Default: 0 |
| `banned` | tinyint(1) | Bann-Status (0/1) |
| `banneduntil` | int(10) | Unix Timestamp bis wann der Bann gilt - Default: 0 |
| `char` | int(11) | Anzahl der erlaubten Charaktere - Default: 5 |
| `discord_identifier` | varchar(255) | Discord User ID für Verknüpfung mit Laravel |

**Beispiel:**
```sql
identifier: steam:11000010bd7ab83
group: admin
warnings: 0
banned: 0
banneduntil: 0
char: 1
discord_identifier: 871443362912280596
```

**Wichtige Hinweise:**
- `identifier` ist der Primary Key und wird für Verknüpfungen zu `characters` verwendet
- `discord_identifier` wird für die Verknüpfung mit dem Laravel Control Panel verwendet
- Ein `users`-Eintrag kann mehrere `characters` haben

---

### 2. `characters` - Charaktere

Tabelle für alle Spielercharaktere. Jeder Spieler kann mehrere Charaktere haben.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `identifier` | varchar(50) | Foreign Key zu `users.identifier` |
| `steamname` | varchar(50) | Steam-Name des Spielers |
| `charidentifier` | int(11) | Auto-Increment Primary Key - Eindeutige Charakter-ID |
| `group` | varchar(10) | Charakter-Gruppe - Default: `user` |
| `money` | double(11,2) | **Geld** (VORP Core) - Default: 0.00 |
| `gold` | double(11,2) | **Gold** (VORP Core) - Default: 0.00 |
| `rol` | double(11,2) | Bank-Guthaben (RDO) - Default: 0.00 |
| `xp` | int(11) | Erfahrungspunkte - Default: 0 |
| `healthouter` | int(4) | Äußere Gesundheit - Default: 500 |
| `healthinner` | int(4) | Innere Gesundheit - Default: 100 |
| `staminaouter` | int(4) | Äußere Ausdauer - Default: 500 |
| `staminainner` | int(4) | Innere Ausdauer - Default: 100 |
| `hours` | float | Spielstunden - Default: 0 |
| `LastLogin` | date | Letzter Login |
| `inventory` | longtext | JSON-Inventar |
| `slots` | decimal(20,1) | Inventar-Slots - Default: 35.0 |
| `job` | varchar(50) | Job-Name - Default: `unemployed` |
| `joblabel` | varchar(255) | Job-Label - Default: `Unemployed` |
| `meta` | varchar(255) | JSON-Metadaten - Default: `{}` |
| `firstname` | varchar(50) | Vorname |
| `lastname` | varchar(50) | Nachname |
| `character_desc` | mediumtext | Charakterbeschreibung |
| `gender` | varchar(50) | Geschlecht (Male/Female) |
| `age` | int(11) | Alter - Default: 0 |
| `nickname` | varchar(50) | Spitzname |
| `skinPlayer` | longtext | JSON-Skin-Daten |
| `compPlayer` | longtext | JSON-Komponenten-Daten |
| `compTints` | longtext | JSON-Farbtönungen |
| `jobgrade` | int(11) | Job-Rang - Default: 0 |
| `coords` | longtext | JSON-Koordinaten (x, y, z, heading) |
| `status` | varchar(140) | JSON-Status (Hunger, Thirst, etc.) |
| `isdead` | tinyint(1) | Tot-Status (0/1) - Default: 0 |
| `skills` | longtext | JSON-Skills (Mining, Hunting, Crafting, Fishing) |
| `walk` | varchar(50) | Gehstil - Default: `noanim` |
| `gunsmith` | double(11,2) | Waffenschmied-Guthaben - Default: 0.00 |
| `ammo` | longtext | JSON-Munition |
| `discordid` | varchar(255) | Discord ID - Default: `0` |
| `lastjoined` | longtext | JSON-Array der letzten Joins - Default: `[]` |
| `ranchid` | int(10) | Ranch-ID - Default: 0 |

**Beispiel:**
```sql
identifier: steam:11000010bd7ab83
steamname: xBeiros
charidentifier: 3
group: user
money: 959506.40
gold: 1000.00
rol: 0.00
firstname: Joe
lastname: Jenkins
discordid: 871443362912280596
```

**Wichtige Hinweise:**
- `identifier` + `charidentifier` bilden einen Unique Index
- `money` und `gold` sind die Hauptwährungen in VORP Core (kein `cash` oder `black_money`)
- `discordid` kann für die Verknüpfung mit Laravel verwendet werden (Fallback, wenn nicht in `users.discord_identifier`)
- `coords` enthält JSON: `{"x":1433.82, "y":-1294.89, "z":77.80, "heading":269.29}`
- `status` enthält JSON: `{"Hunger":806, "Thirst":640, "Metabolism":-388}`
- `skills` enthält JSON: `{"Mining":{"Level":1, "Exp":0, "Label":"Beginner", "MaxLevel":5, "NextLevel":100}, ...}`

---

### 3. `items` - Items

Tabelle für alle verfügbaren Items im Spiel.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `item` | varchar(50) | Primary Key - Item-Name (z.B. `water`, `bandage`) |
| `label` | varchar(50) | Anzeigename des Items |
| `limit` | int(11) | Maximales Stack-Limit - Default: 1 |
| `can_remove` | tinyint(1) | Kann entfernt werden (0/1) - Default: 1 |
| `type` | varchar(50) | Item-Typ (z.B. `item_standard`) |
| `usable` | tinyint(1) | Kann verwendet werden (0/1) |
| `id` | int(11) | Auto-Increment Unique Index |
| `groupId` | int(10) UNSIGNED | Foreign Key zu `item_group.id` - Default: 1 |
| `metadata` | longtext | JSON-Metadaten - Default: `{}` |
| `desc` | varchar(5550) | Item-Beschreibung - Default: `nice item` |
| `degradation` | int(11) | Abnutzungszeit in Minuten (0 = keine) - Default: 0 |
| `weight` | decimal(20,2) | Gewicht - Default: 0.25 |

**Beispiel:**
```sql
item: water
label: Water
limit: 10
can_remove: 1
type: item_standard
usable: 1
groupId: 1
```

**Wichtige Hinweise:**
- `item` ist der Primary Key (nicht `id`)
- `groupId` verweist auf `item_group` für Kategorisierung
- Items werden über VORP Core Events hinzugefügt: `TriggerEvent('vorp_inventory:addItem', playerId, itemName, quantity)`

---

### 4. `item_group` - Item-Gruppen

Kategorisierung von Items.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | int(10) UNSIGNED | Primary Key - Auto-Increment |
| `description` | varchar(255) | Beschreibung der Gruppe |

**Standard-Gruppen:**
- 1: default
- 2: medical
- 3: foods
- 4: tools
- 5: weapons
- 6: ammo
- 7: documents
- 8: animals
- 9: valuables
- 10: horse
- 11: herbs

---

### 5. `jobs` - Jobs

Tabelle für alle verfügbaren Jobs.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `name` | varchar(50) | Primary Key - Job-Name (z.B. `emerald_ranch`) |
| `label` | varchar(50) | Anzeigename (z.B. `Emerald Ranch`) |

**Beispiel:**
```sql
name: emerald_ranch
label: Emerald Ranch
```

---

### 6. `job_grades` - Job-Ränge

Ränge/Grade für jeden Job.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | int(11) | Primary Key - Auto-Increment |
| `job_name` | varchar(50) | Foreign Key zu `jobs.name` |
| `grade` | int(11) | Rang-Nummer (0 = niedrigster) |
| `grade_label` | varchar(50) | Anzeigename des Rangs |
| `salary` | int(11) | Gehalt - Default: 0 |
| `skin_male` | longtext | JSON-Skin für Männer |
| `skin_female` | longtext | JSON-Skin für Frauen |

**Beispiel:**
```sql
job_name: emerald_ranch
grade: 0
grade_label: Rancharbeiter
salary: 0
```

---

### 7. `bank_users` - Bank-Konten

Bank-Konten für Spielercharaktere.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | int(11) | Primary Key - Auto-Increment |
| `name` | varchar(50) | Bank-Name (z.B. `Valentine`, `Rhodes`) |
| `identifier` | varchar(50) | Foreign Key zu `users.identifier` |
| `charidentifier` | int(11) | Charakter-ID |
| `money` | double(22,2) | Geld auf dem Konto - Default: 0.00 |
| `gold` | double(22,2) | Gold auf dem Konto - Default: 0.00 |
| `items` | longtext | JSON-Items im Bankschließfach - Default: `[]` |
| `invspace` | int(11) | Inventar-Platz - Default: 10 |

**Beispiel:**
```sql
name: Valentine
identifier: steam:11000013f840d53
charidentifier: 1
money: 100.00
gold: 0.00
```

---

### 8. `wagons` - Wagen

Tabelle für Spieler-Wagen.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | int(11) | Primary Key - Auto-Increment |
| `identifier` | varchar(40) | Spieler-Identifier |
| `charid` | int(11) | Charakter-ID |
| `selected` | int(11) | Ausgewählter Wagen (0/1) - Default: 0 |
| `model` | varchar(50) | Wagen-Modell |
| `name` | varchar(50) | Wagen-Name |
| `items` | longtext | JSON-Items im Wagen - Default: `{}` |

---

### 9. `stagecoaches` - Kutschen

Tabelle für Spieler-Kutschen.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `identifier` | varchar(40) | Spieler-Identifier |
| `charid` | int(11) | Charakter-ID |
| `name` | varchar(255) | Kutsche-Name |
| `stagecoach` | varchar(255) | Kutsche-Modell |

---

### 10. `stables` - Pferde

Tabelle für Spieler-Pferde.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | int(11) | Primary Key - Auto-Increment |
| `identifier` | varchar(50) | Spieler-Identifier |
| `charidentifier` | int(11) | Charakter-ID |
| `name` | varchar(30) | Pferd-Name |
| `modelname` | varchar(70) | Pferd-Modell |
| `type` | varchar(11) | Typ (z.B. `horse`, `cart`) |
| `status` | longtext | JSON-Status |
| `xp` | int(11) | Erfahrung - Default: 0 |
| `injured` | int(11) | Verletzt-Status - Default: 0 |
| `gear` | longtext | JSON-Ausrüstung |
| `isDefault` | int(11) | Standard-Pferd (0/1) - Default: 0 |
| `inventory` | longtext | JSON-Inventar |

---

### 11. `character_inventories` - Charakter-Inventare

Detailliertes Inventar-System für Charaktere.

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `character_id` | int(11) | Charakter-ID |
| `inventory_type` | varchar(100) | Inventar-Typ - Default: `default` |
| `item_crafted_id` | int(11) | Foreign Key zu `items_crafted.id` |
| `item_name` | varchar(50) | Item-Name - Default: `item` |
| `amount` | int(11) | Anzahl |
| `created_at` | timestamp | Erstellungszeit - Default: `current_timestamp()` |
| `degradation` | int(11) | Abnutzung |
| `percentage` | int(11) | Prozentsatz |

---

### 12. `whitelist` - Whitelist

Tabelle für Whitelist-Einträge (optional, kann leer sein).

| Spalte | Typ | Beschreibung |
|--------|-----|--------------|
| `id` | int(11) | Primary Key - Auto-Increment |
| `identifier` | varchar(50) | Unique Index - Spieler-Identifier |
| `status` | tinyint(1) | Whitelist-Status |
| `firstconnection` | tinyint(1) | Erste Verbindung - Default: 1 |
| `discordid` | varchar(255) | Discord ID - Default: `0` |

**Wichtige Hinweise:**
- Diese Tabelle kann leer sein
- Für die Verknüpfung mit Laravel sollte primär `users.discord_identifier` verwendet werden
- Falls `whitelist` leer ist, direkt in `users` nach `discord_identifier` suchen

---

## Wichtige Beziehungen

### Users → Characters
- `users.identifier` → `characters.identifier` (1:N)
- Ein User kann mehrere Charaktere haben
- Charaktere werden über `charidentifier` eindeutig identifiziert

### Users → Discord
- `users.discord_identifier` wird für die Verknüpfung mit Laravel verwendet
- Fallback: `characters.discordid` (wenn `users.discord_identifier` leer ist)

### Items → Item Groups
- `items.groupId` → `item_group.id` (N:1)
- Items werden in Gruppen kategorisiert

### Jobs → Job Grades
- `job_grades.job_name` → `jobs.name` (N:1)
- Jeder Job kann mehrere Ränge haben

### Characters → Bank Users
- `bank_users.identifier` → `users.identifier` (N:1)
- `bank_users.charidentifier` verweist auf `characters.charidentifier`

---

## VORP Core spezifische Felder

### Geld & Währung
- **`characters.money`**: Hauptwährung (Geld)
- **`characters.gold`**: Sekundärwährung (Gold)
- **`characters.rol`**: Bank-Guthaben (RDO)
- **KEIN** `cash` oder `black_money` (ESX-spezifisch)

### Items
- Items werden über VORP Core Events hinzugefügt:
  ```lua
  TriggerEvent('vorp_inventory:addItem', playerId, itemName, quantity)
  ```
- Inventar wird in `characters.inventory` (JSON) oder `character_inventories` gespeichert

### Spieler-Operationen
- **Revive**: `TriggerEvent('vorp:resurrectPlayer', playerId)`
- **Geld setzen**: Direktes Update in `characters.money` oder `characters.gold`
- **Bank**: Über `bank_users` Tabelle oder ESX-Fallback (falls verfügbar)

---

## Laravel Integration

### Datenbankverbindung
```php
DB::connection('redm')
```

### Wichtige Queries

**User über Discord finden:**
```php
$redmUser = DB::connection('redm')
    ->table('users')
    ->where('discord_identifier', $discordId)
    ->first();
```

**Alle Charaktere eines Users:**
```php
$characters = DB::connection('redm')
    ->table('characters')
    ->where('identifier', $redmUser->identifier)
    ->orderBy('charidentifier', 'asc')
    ->get();
```

**Geld setzen:**
```php
DB::connection('redm')
    ->table('characters')
    ->where('charidentifier', $charId)
    ->update(['money' => $amount]);
```

**Gold setzen:**
```php
DB::connection('redm')
    ->table('characters')
    ->where('charidentifier', $charId)
    ->update(['gold' => $amount]);
```

---

## Weitere Tabellen (Kurzreferenz)

- `banks`: Bank-Standorte
- `boates`: Boote
- `herbalists`: Kräuterkundler-Standorte
- `horse_complements`: Pferde-Ausrüstung
- `housing`: Häuser
- `items_crafted`: Hergestellte Items
- `jail`: Gefängnis-Einträge
- `loadout`: Waffen-Ausrüstung
- `mailbox_mails`: Post
- `outfits`: Outfits
- `rooms`: Räume
- `societa`: Gesellschaften

---

## Änderungshistorie

- **2026-02-09**: Erstellt basierend auf `redm.sql` Export
- VORP Core Integration (kein ESX)
- Geld/Gold statt Cash/Black Money

