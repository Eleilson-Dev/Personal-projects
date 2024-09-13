const { Pool } = require('pg');

const pool = new Pool({
  connectionString:
    'postgresql://hamburgueria_db_owner:0z2DlsuOckNj@ep-cold-hill-a5ee4859.us-east-2.aws.neon.tech/hamburgueria_db?sslmode=require',
  ssl: {
    rejectUnauthorized: false,
  },
});

module.exports = {
  query: (text, params) => pool.query(text, params),
};
