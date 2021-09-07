import React from "react";
import App from "next/app";
import "../style.css";
import { AnimatePresence } from "framer-motion";

class MyApp extends App {
  render() {
    const { Component, pageProps, router } = this.props;

    return (
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    );
  }
}

export default MyApp;

// AnimatePresence allows components to animate out when they're removed from the React tree.
//exitBeforeEnter: boolean
// If set to true, AnimatePresence will only render one component at a time. The exiting component will finished its exit animation before the entering component is rendered.
