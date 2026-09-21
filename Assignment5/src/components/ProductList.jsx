import ProductCard from './ProductCard';

export default function ProductList({ products }) {
  return (
    <section className="catalog-section">
      <div className="catalog-header">
        <h2>Flagship Electronics</h2>
        <p>Premium curated gear with nationwide express warranty</p>
      </div>

      <div className="product-grid">
        {products.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </section>
  );
}