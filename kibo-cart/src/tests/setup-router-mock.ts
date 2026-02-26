import { vi } from "vitest";

vi.mock("react-router-dom", async (importOriginal) => {
  const actual = await importOriginal();

  return {
    ...actual,
    createBrowserRouter: (routes, opts) => {
      return actual.createMemoryRouter(routes, {
        initialEntries: ["/"],
        ...opts,
      });
    },

    // useParams: vi.fn(() => ({ id: "1" })),  
    // useLocation: vi.fn(() => ({ search: "" })),
  };
});

export {};
