import fs from "fs/promises";
import Link from "next/link";
import path from "path";

function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  // CWD = Current Working Directory
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // First comes in JSON format
  const jsonData = await fs.readFile(filePath);
  // Then it converts into a javascript object
  const data = JSON.parse(jsonData);

  if (!data) {
    return {
      redirect: {
        destination: "/no-data",
      },
    };
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: {
      products: data.products,
    },
  };
}

export default HomePage;
