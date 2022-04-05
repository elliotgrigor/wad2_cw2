# WAD2 Coursework 2, Part 2
Restaurant web application created using Express, Mustache, and NeDB

## Installation
1. First, clone this repository
```bash
git clone https://github.com/elliotgrigor/wad2_cw2.git
```

2. Create a `.env` file
```bash
touch .env
```

3. Add the following environment variables to the `.env` file
```
HOST=<ip_address> (localhost, 127.0.0.1, 0.0.0.0, etc.)
PORT=<port_number>
SECRET=<secret_text>

MENU_DB=/absolute/path/to/db/file
STAFF_DB=/absolute/path/to/db/file
MSG_DB=/absolute/path/to/db/file
FAQ_DB=/absolute/path/to/db/file
```

4. Change into the project directory, and run the application
```bash
cd wad2_cw2 && npm start
```
