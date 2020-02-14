<?php
// errors
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('log_errors', TRUE);
ini_set('error_log', 'tmp/error.log');

// local
if ($_SERVER['SERVER_NAME'] === 'localhost') {
  define('DB_HOST', 'localhost');
  define('DB_USERNAME', 'root');
  define('DB_PASSWORD', '');
  define('DB_NAME', 'valentinesday_db');
  define('ENV', 'DEV');

// prod
} else {
  define('DB_HOST', 'localhost');
  define('DB_USERNAME', 'valentinesday_db');
  define('DB_PASSWORD', 'CrNoBOfXQpQ9WRnw');
  define('DB_NAME', 'valentinesday_db');
  define('ENV', 'PROD');
}
