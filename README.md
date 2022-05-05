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

7. To log in, click "Staff Login" in the footer and use the following credentials:

| Username | Password |
|----------|----------|
| A001     | admin    |

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
- **Login**
	- Form to access the admin interface

---

### Admin Interface

- **Global**
	- Header with register & log out
	- Navigation sidebar for menu, messages, and FAQs
- **Register**
	- Form for adding new administrator users
- **Menu**
	- Scrollable container listing all dishes, separated by type and special status
	- Hidden dishes are greyed and score out
	- **Edit Dish** *(nested)*
		- Form for updating the information for a specific dish
		- Dish hiding can be toggled here
	- Button for deleting a dish
- **Messages**
	- Scrollable container listing all contact form messages
	- Unread messages are displayed differently *(bold name + dot highlight)*
	- Once viewed, unread messages are marked as read
- **FAQs**
	- Scrollable container listing all FAQs, sorted by pinned first
	- Pinned FAQs are displayed bold
	- **Edit FAQ** *(nested)*
		- Form for updating the information for a specific FAQ
		- FAQ pinning can be toggled here
	- Button for deleting a FAQ

## Changes

### Database

**Dish Schema**
```javascript
{
	"name": String,
	"description": String,
	"content": {
		"ingredients": [ String ],
		"allergyInfo": {
			"allergens": [ String ],
			"advice": String
		}
	},
	"chefSpecial": Boolean,
	"vegetarian": Boolean, // Added
	"vegan": Boolean,      // Added
	"dishType": String,
	"price": String,       // Changed from Number to String to support trailing 0s
	"hidden": Boolean,     // Added
	"slug": String         // Renamed from urlSlug to slug
}
```

**Staff Schema** *(no changes)*
```javascript
{
	"staffId": String,
	"firstName": String,
	"lastName": String,
	"password": String,
	"email": String
}
```

**Message Schema** *(no changes)*
```javascript
{
	"name": String,
	"email": String,
	"subject": String,
	"body": String,
	"sentAt": Date,
	"unread": Boolean
}
```

**FAQ Schema**
```javascript
{
	"question": String,
	"answer": String,
	"pinned": Boolean // Added
}
```

---

### Main Site

- **Home**
	- Centred hero section text on desktop
	- Centred info section text on mobile
- **Menu**
	- Removed allergens from dish cards
	- Added chef special sections for each dish type
	- Added vegetarian/vegan icons to dish cards
	- **View Dish**
		- Changed from pop-up to separate view
			- *Done to prevent bloated HTML on menu page*
		- Added ingredients section
		- Moved price beside dish name
		- Kept all dishes on single page on mobile view
- **Contact**
	- Changed title to "Contact" from "Enquiries"
	- Moved FAQ page link to left side
	- **FAQs**
		- *No changes*
	- Removed headings from contact form section
	- Centred form submit button
	- Kept contact details displayed in mobile view
- **About**
	- *No changes*

---

### Admin Interface

- **Global**
	- Added register link to header
- **Register**
	- New page --- *Not mentioned in design document*
- **Dashboard**
	- Removed --- *Adds bloat; only displays functionality of other sections*
- **Menu**
	- Added special section for each dish type
	- Replaced icons with text for edit/remove functions
	- **Add/Edit Dish**
		- Changed from grid to column layout
		- Added toggles for marking as vegetarian/vegan
		- Added toggle to hide dish from menu
		- Added field for setting URL slug name
		- Added cancel button
- **Messages**
	- Added view button to each message
	- Unread dot highlight displays to left of name instead of right
	- **View Message**
		- Added email to message
- **FAQs**
	- Added support for pinned FAQs
	- Replaced icons with text for edit/remove functions
	- **Add/Edit FAQ**
		- Added toggle for pinning FAQ
		- Added cancel button

## Credits

Hero section image --- Julia Khalimova on [Pexels](https://www.pexels.com/photo/cooked-shrimp-and-seashell-dish-3649208/)

All icons from [FontAwesome](https://fontawesome.com/search?m=free)
