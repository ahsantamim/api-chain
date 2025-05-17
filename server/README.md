# Server

This is a Node.js Express server using the MVC folder structure and Sequelize ORM (with SQLite for development).

## Getting Started

1. Install dependencies:
   ```powershell
   npm install
   ```
2. To start the server (after you create your entry file):
   ```powershell
   npm start
   ```

## Project Structure

- `models/` - Sequelize models
- `migrations/` - Sequelize migrations
- `seeders/` - Sequelize seeders
- `config/` - Sequelize config
- `controllers/` - Express controllers (to be created)
- `routes/` - Express routes (to be created)

## Sequelize CLI

- To generate a model: `npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string`
- To run migrations: `npx sequelize-cli db:migrate`

## License

MIT
