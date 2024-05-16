import { sql } from "./db.js";

sql`
  CREATE TABLE IF NOT EXISTS videos (
    id TEXT PRIMARY KEY,
    title TEXT,
    description TEXT,
    duration INTEGER
  );
`
  .then(() => {
    console.log('Tabela criada!');
  })
  .catch(err => {
    console.error('Erro ao criar a tabela:', err);
  });
