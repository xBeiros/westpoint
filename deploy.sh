#!/bin/bash

# Deployment Script für Forge
# Setzt generierte wayfinder-Dateien zurück, bevor der Merge durchgeführt wird

set -e  # Beende bei Fehlern

echo "Resetting wayfinder-generated files before merge..."

# Liste der generierten Dateien
GENERATED_FILES=(
    "resources/js/routes/index.ts"
    "resources/js/routes/news/index.ts"
    "resources/js/routes/password/index.ts"
    "resources/js/routes/players/index.ts"
    "resources/js/routes/presentation/index.ts"
    "resources/js/routes/rulebook/index.ts"
    "resources/js/routes/test/fivem/index.ts"
    "resources/js/routes/two-factor/index.ts"
    "resources/js/actions/App/Http/Controllers/Settings/index.ts"
)

# Liste der zu entfernenden Dateien (ProfileController, etc.)
REMOVE_FILES=(
    "resources/js/actions/App/Http/Controllers/Settings/ProfileController.ts"
    "resources/js/routes/profile/index.ts"
)

# Hole die neuesten Änderungen vom Remote
echo "Fetching latest changes from remote..."
git fetch origin

# Entferne spezifisch die generierten Dateien aus dem Git-Index (falls sie getrackt sind)
echo "Removing generated files from Git index..."
for file in "${GENERATED_FILES[@]}"; do
    git rm --cached -f "$file" 2>/dev/null || true
done

# Entferne ProfileController und andere zu löschende Dateien aus dem Git-Index
echo "Removing ProfileController files from Git index..."
for file in "${REMOVE_FILES[@]}"; do
    git rm --cached -f "$file" 2>/dev/null || true
done

# Entferne alle lokalen Änderungen und nicht getrackte Dateien
echo "Resetting local changes..."
git reset --hard HEAD
git clean -fd

# Entferne spezifisch die generierten Dateien lokal, falls sie existieren
echo "Removing generated files locally..."
for file in "${GENERATED_FILES[@]}"; do
    rm -f "$file"
done

# Entferne ProfileController und andere zu löschende Dateien lokal
echo "Removing ProfileController files locally..."
for file in "${REMOVE_FILES[@]}"; do
    rm -f "$file"
done

# Stashe alle verbleibenden Änderungen, falls vorhanden
echo "Stashing any remaining changes..."
git stash || true

# Führe Pull durch mit Strategie, die Konflikte vermeidet
echo "Pulling latest changes..."
BRANCH=$(git rev-parse --abbrev-ref HEAD)
git pull origin "$BRANCH" --no-edit || {
    echo "Pull failed, attempting to resolve conflicts..."
    # Falls Pull fehlschlägt, versuche mit Merge-Strategie
    git merge origin/"$BRANCH" --strategy-option=theirs || {
        echo "Merge failed, resetting to remote state..."
        git reset --hard origin/"$BRANCH"
    }
}

echo "Deployment preparation complete. Files reset and repository updated."

