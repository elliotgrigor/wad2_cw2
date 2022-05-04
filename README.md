# WAD2 Coursework 2, Part 2
Restaurant web application created using Express, Mustache, Passport and NeDB

## Installation
1. First, clone this repository
```bash
git clone https://github.com/elliotgrigor/wad2_cw2.git
```

2. Change into the project directory and create the `.env` file
```bash
cd wad2_cw2 && touch .env
```

3. Add the following environment variables to the `.env` file
```
HOST=<ip_address>    # localhost, 127.0.0.1, 0.0.0.0, etc.
PORT=<port_number>
SECRET=<secret_text>

MENU_DB=/absolute/path/to/db/file
STAFF_DB=/absolute/path/to/db/file
MSG_DB=/absolute/path/to/db/file
FAQ_DB=/absolute/path/to/db/file
```

4. Run the script to seed the database
```bash
npm run seed
```

5. Start the application
```bash
npm start
```

6. Visit the website in the browser
```
http://<ip_address>:<port_number>
```

## Features

A live version of the site can be found [here](https://pingu-seafood-shack.herokuapp.com/)

---

### Main Site

- **Global**
	- Navigation bar
	- Footer with link to staff login
- **Home**
	- ***The landing page of the website***
	- Hero section
	- Call to action (menu)
	- Info section
- **Menu**
	- Dish names & prices
	- Dishes separated by type and special status
	- Denotations for vegetarian/vegan suitable meals
	- **View Dish** *(nested)*
		- Displays dish's full details;
			- Name,
			- Price,
			- Description,
			- Ingredients,
			- Allergens
- **Contact**
	- Shows 3 pinned FAQs *(+ link to FAQs page)*
	- **FAQs** *(nested)*
		- Lists all frequently asked questions
	- Contact form to make enquiries
	- Contact details;
		- Address,
		- Phone,
		- Email
- **About**
	- Describes restaurant's philosophy
	- Lists information about where food is sourced

---

## Changes

WIP.
