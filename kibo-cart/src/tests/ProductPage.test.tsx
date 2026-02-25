import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProductPage } from "../pages/ProductPage";
import { CartContext } from "../contexts/CartContext";
import { fetchProductById } from "../api/products";

vi.mock("../api/products");

// Mock QuantityControls so we don’t test it again here
vi.mock("../components/common/QuantityControls", () => ({
  QuantityControls: vi.fn(({ id, quantity }) => (
    <div data-testid="quantity-controls">
      QuantityControls id={id} quantity={quantity}
    </div>
  )),
}));

const mockProduct = {
  id: 1,
  title: "Test Product",
  price: 20,
  description: "A very nice product for testing",
  category: "electronics",
  image: "test.jpg",
  rating: { rate: 4.5, count: 100 },
};

describe("ProductPage", () => {
  const mockAdd = vi.fn();

  function renderWithContext(items = []) {
    return render(
      <CartContext.Provider
        value={{
          items,
          add: mockAdd,
          increment: vi.fn(),
          decrement: vi.fn(),
          remove: vi.fn(),
          clear: vi.fn(),
          cartCount: 0,
        }}
      >
        <MemoryRouter initialEntries={["/product/1"]}>
          <Routes>
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/" element={<div>Home Page</div>} />
          </Routes>
        </MemoryRouter>
      </CartContext.Provider>
    );
  }

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state first", async () => {
    (fetchProductById as vi.Mock).mockResolvedValue(mockProduct);

    renderWithContext();

    expect(screen.getByText("Loading product...")).toBeInTheDocument();

    await waitFor(() =>
      expect(screen.getByText("Test Product")).toBeInTheDocument()
    );
  });

  it("renders product details after loading", async () => {
    (fetchProductById as vi.Mock).mockResolvedValue(mockProduct);

    renderWithContext();

    await screen.findByText("Test Product");

    expect(screen.getByText("Test Product")).toBeInTheDocument();
    expect(screen.getByText(/Price:/i)).toBeInTheDocument();
    expect(screen.getByText(/\$20\.00/)).toBeInTheDocument();
    expect(screen.getByText(/electronics/i)).toBeInTheDocument();
    expect(screen.getByText(/4.5/)).toBeInTheDocument();
    expect(screen.getByText(/100 reviews/)).toBeInTheDocument();
  });

  it("calls add() when clicking Add to Cart", async () => {
    const user = userEvent.setup();
    (fetchProductById as vi.Mock).mockResolvedValue(mockProduct);

    renderWithContext();

    await screen.findByText("Test Product");

    const button = screen.getByRole("button", { name: /add to cart/i });
    await user.click(button);

    expect(mockAdd).toHaveBeenCalledWith({
      ...mockProduct,
      quantity: 1,
    });
  });

  it("shows QuantityControls when product is already in cart", async () => {
    (fetchProductById as vi.Mock).mockResolvedValue(mockProduct);

    renderWithContext([{ id: 1, quantity: 3 }]);

    await screen.findByText("Test Product");

    expect(screen.getByTestId("quantity-controls")).toBeInTheDocument();
  });

  it("navigates back to home when clicking Back to Shop", async () => {
    const user = userEvent.setup();
    (fetchProductById as vi.Mock).mockResolvedValue(mockProduct);

    renderWithContext();

    await screen.findByText("Test Product");

    const backButton = screen.getByRole("link", { name: /back to shop/i });
    await user.click(backButton);

    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("shows 'Product not found.' when API returns null", async () => {
    (fetchProductById as vi.Mock).mockResolvedValue(null);

    renderWithContext();

    await screen.findByText("Product not found.");
  });
});
