# NOIR / FORM — Clothing Store Frontend

A responsive, premium-minimalist men's clothing storefront starter built with HTML, CSS, and vanilla JavaScript.

## Run locally

1. Extract the ZIP file.
2. Open the `noir-form-clothing-store` folder in VS Code.
3. Open `index.html` in your browser. Recommended: use the VS Code **Live Server** extension and click **Go Live**.

No Node.js installation is required for this frontend-only demo.

## Included

- Responsive landing page
- Product cards and category filters
- Add-to-bag interaction, quantity controls, remove item, and subtotal
- Mobile navigation
- Demo newsletter form
- Sample products and PKR prices

## Project structure

```text
noir-form-clothing-store/
├── index.html
├── css/
│   └── styles.css
├── js/
│   ├── products.js
│   └── app.js
└── README.md
```

## Important notes

- **Brand:** `NOIR / FORM` is a placeholder. Check trademark, domain, and social handle availability before using it commercially.
- **Products:** The current product catalogue and prices are sample content. Replace them with your real products.
- **Images:** Product/editorial photos load from Unsplash, so an internet connection is needed for those images.
- **Backend is not connected yet:** cart contents are temporary and reset on refresh; newsletter signups are not saved; there is no real checkout, order processing, admin login, inventory, or database yet.
- Never put database service-role keys or other secrets in frontend JavaScript. In the next phase, we can add a secure backend and Supabase integration.

## Suggested next phases

1. Connect Supabase database and product image storage.
2. Add secure admin authentication and product CRUD.
3. Build checkout and save orders to the database.
4. Add Cash on Delivery workflow and order status management.
5. Test security and deploy.
