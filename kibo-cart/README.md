## Product Categories

The application fetches product categories from the FakeStoreAPI:

- electronics
- jewelery
- men's clothing
- women's clothing

To provide a complete browsing experience, the app also includes a custom
“All products” category that displays the full product list.

This category is not part of the API and is manually injected by the
`useCategories` hook:

```ts
export const AllProductsCategory = "All products";

setCategories([AllProductsCategory, ...normalizedApiCategories]);
```

This ensures consistent behavior across:

the Navbar category dropdown

the HomePage category filter

the search bar category selector

the /category/:name route