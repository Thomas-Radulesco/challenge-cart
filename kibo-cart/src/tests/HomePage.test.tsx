import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import { useProducts } from "../hooks/useProducts";
import { useUser } from "../contexts/UserContext";
import { AllProductsCategory } from "../hooks/useCategories";

vi.mock("../hooks/useProducts");
vi.mock("../contexts/UserContext");

// Mock ProductCard so we don’t test it again
vi.mock("../components/product/ProductCard", () => ({
  ProductCard: vi.fn(({ product }) => (
    <div data-testid="product-card">{product.title}</div>
  )),
}));

// Mock SkeletonCard
vi.mock("../components/product/SkeletonCard", () => ({
  SkeletonCard: () => <div data-testid="skeleton-card" />,
}));

const mockProducts = [
  {
    id: 1,
    title: "Red Shirt",
    category: "men's clothing",
    price: 10,
    description: "A red shirt",
    image: "",
    rating: { rate: 4, count: 10 },
  },
  {
    id: 2,
    title: "Laptop",
    category: "electronics",
    price: 999,
    description: "A laptop",
    image: "",
    rating: { rate: 5, count: 100 },
  },
];

describe("HomePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useUser as vi.Mock).mockReturnValue({ user: null });
  });

  function renderWithRouter(path = "/") {
    return render(
      <MemoryRouter initialEntries={[path]}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:name" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    );
  }

  it("shows loading skeletons", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: true,
      products: null,
      error: null,
    });

    renderWithRouter();

    expect(screen.getAllByTestId("skeleton-card")).toHaveLength(8);
  });

  it("shows error message", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: null,
      error: "Something broke",
    });

    renderWithRouter();

    expect(screen.getByText("Error: Something broke")).toBeInTheDocument();
  });

  it("shows 'No products found.' when products is null", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: null,
      error: null,
    });

    renderWithRouter();

    expect(screen.getByText("No products found.")).toBeInTheDocument();
  });

  it("renders all products", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: mockProducts,
      error: null,
    });

    renderWithRouter();

    expect(screen.getAllByTestId("product-card")).toHaveLength(2);
  });

  it("filters by category via /category/:name", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: mockProducts,
      error: null,
    });

    renderWithRouter("/category/electronics");

    expect(screen.getByTestId("product-card")).toHaveTextContent("Laptop");
    expect(screen.queryByText("Red Shirt")).not.toBeInTheDocument();
  });

  it("filters by ?q= query", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: mockProducts,
      error: null,
    });

    renderWithRouter("/?q=shirt");

    expect(screen.getByTestId("product-card")).toHaveTextContent("Red Shirt");
    expect(screen.queryByText("Laptop")).not.toBeInTheDocument();
  });

  it("filters by ?cat=electronics", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: mockProducts,
      error: null,
    });

    renderWithRouter("/?cat=electronics");

    expect(screen.getByTestId("product-card")).toHaveTextContent("Laptop");
    expect(screen.queryByText("Red Shirt")).not.toBeInTheDocument();
  });

  it("shows logged-out UI when no user", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: mockProducts,
      error: null,
    });

    (useUser as vi.Mock).mockReturnValue({ user: null });

    renderWithRouter();

    expect(screen.getByText("You are not logged in.")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /login/i })).toBeInTheDocument();
  });

  it("shows logged-in UI when user exists", () => {
    (useProducts as vi.Mock).mockReturnValue({
      loading: false,
      products: mockProducts,
      error: null,
    });

    (useUser as vi.Mock).mockReturnValue({ user: { name: "Thomas" } });

    renderWithRouter();

    expect(screen.getByText("You are logged in as Thomas")).toBeInTheDocument();
    expect(screen.getByText("Go to Dashboard")).toBeInTheDocument();
  });
});
