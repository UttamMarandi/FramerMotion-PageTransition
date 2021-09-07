import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { motion } from "framer-motion";

//animate : final state of animation
//inital : initial state of animation
//exit : exit props define animation when a component exit
const easing = [0.6, -0.05, 0.01, 0.99];
const fadeInUp = {
  initial: {
    y: 60,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: easing,
    },
  },
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.5,
    },
  },
};

const Index = (props) => (
  <motion.div
    exit={{ opacity: 0 }}
    initial="initial"
    animate="animate"
    // initial={{ opacity: 0 }}//this changes the opacity of component
    // animate={{ opacity: 1 }}
  >
    {/*exit props define animation when a component exit  */}
    <div className="container center">
      <div className="title">
        <h1>Select a protein</h1>
      </div>
      <motion.div variants={stagger} className="product-row">
        {/* parent element should have staggerChidren for the child to stagger */}
        {props.products.map((product) => (
          <Link
            key={product.id}
            href="/products/[id]"
            as={`/products/${product.id}`}
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={fadeInUp}
              className="card"
            >
              <span className="category">Protein</span>
              <motion.img
                initial={{
                  x: 60,
                  opacity: 0,
                }}
                animate={{
                  x: 0,
                  opacity: 1,
                }}
                transition={{
                  delay: 1,
                }}
                key={product.image}
                src={product.image}
                width={250}
              />
              <div className="product-info">
                <h4>{product.name}</h4>
                <span>{product.price}</span>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </div>
  </motion.div>
);

Index.getInitialProps = async function () {
  const res = await fetch(
    "http://my-json-server.typicode.com/wrongakram/demo/products"
  );
  const data = await res.json();
  return {
    products: data,
  };
};

export default Index;
