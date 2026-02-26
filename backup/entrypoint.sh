#!/bin/sh

set -eu

cat > /etc/crontabs/root <<EOF
${BACKUP_CRON} DB_HOST=${DB_HOST} DB_PORT=${DB_PORT} DB_USER=${DB_USER} DB_NAME=${DB_NAME} PGPASSWORD=${PGPASSWORD} BACKUP_RETENTION_DAYS=${BACKUP_RETENTION_DAYS:-7} /usr/local/bin/backup.sh >> /var/log/backup.log 2>&1
EOF

echo "[$(date)] Backup container started. Schedule: ${BACKUP_CRON}"
echo "[$(date)] Retention: ${BACKUP_RETENTION_DAYS:-7} days"

DB_HOST=${DB_HOST} DB_PORT=${DB_PORT} DB_USER=${DB_USER} DB_NAME=${DB_NAME} PGPASSWORD=${PGPASSWORD} \
  /usr/local/bin/backup.sh

crond -f -l 2
