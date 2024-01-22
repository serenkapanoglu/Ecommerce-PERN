\echo 'Delete and recreate lipsticks db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lipsticks;
CREATE DATABASE lipsticks;
\connect lipsticks

\i lipsticks-schema.sql
\i lipsticks-seed.sql

\echo 'Delete and recreate lipsticks_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE lipsticks_test;
CREATE DATABASE lipsticks_test;
\connect lipsticks_test

\i lipsticks-schema.sql