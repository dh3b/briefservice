#!/bin/sh

set -eu

TIMESTAMP=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/backups"
FILENAME="${BACKUP_DIR}/briefservice_${TIMESTAMP}.sql.gz"
KEEP_DAYS="${BACKUP_RETENTION_DAYS:-7}"

echo "[$(date)] Starting backup..."

pg_dump -h "$DB_HOST" -p "$DB_PORT" -U "$DB_USER" "$DB_NAME" \
  | gzip > "$FILENAME"

echo "[$(date)] Backup saved: $FILENAME ($(du -h "$FILENAME" | cut -f1))"

# Remove backups older than KEEP_DAYS
find "$BACKUP_DIR" -name "*.sql.gz" -mtime +"$KEEP_DAYS" -delete
echo "[$(date)] Cleaned backups older than ${KEEP_DAYS} days."
