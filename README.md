# Product Carousel and Detail Page Project

This project includes a product carousel and a product detail page, entirely built using JavaScript. The project is designed to run in the Chrome Developer Tools console and consists of a single JavaScript file. HTML and CSS structures are also dynamically created using JavaScript.

## Features

### Responsive Design
- The carousel and product detail page are designed to adapt to different screen sizes.

### Dynamic URL Management
- When a URL in the format `#product/{id}` is entered, the corresponding product's detail page is displayed.
- If an invalid URL is entered or a page other than the homepage is attempted to be opened, a **"Wrong page"** warning is shown.

### Favorite Products
- Users can add or remove products from their favorites by clicking the heart icon.
- Favorite products are stored in the browser's `localStorage`, and this information is preserved even after the page is refreshed.

### Data Management
- The product list is fetched and stored in `localStorage` on the first run. In subsequent runs, the product list is retrieved from `localStorage`, and no new fetch request is made.

### No External Libraries Used
- No external libraries or frameworks were used in this project. All functionalities are implemented using **pure JavaScript**.

### Single File
- The project is developed within a single JavaScript file (`script.js`).

## How to Run?

### Running in Chrome Developer Tools
- The project is designed to run in the Chrome Developer Tools console.
- You can start the project by pasting the contents of the (`script.js`) file into the console or by running the file directly in the console.

## Project Structure

### HTML and CSS
- All HTML and CSS structures are dynamically created using JavaScript.

### JavaScript
- All functionalities of the project are contained within a single JavaScript file (`script.js`).

### localStorage
- The product list and favorite products are stored in the browser's `localStorage`.


## Demo

You can watch a demo of the project in action at the link below. The video shows how the code runs both in a local environment and in Chrome Developer Tools.

📌 **[Watch Demo](https://www.loom.com/share/e909a44ab601490e85c2d1fa30e293da?sid=bd6d7cdd-7b99-43a3-97bd-efc9a0282d48)**


