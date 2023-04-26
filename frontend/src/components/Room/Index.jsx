import React from "react";
import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
export default function Index({ room }) {
  return (
    <>
      <Header room={room} />
      <Body room={room} />
      <Footer />
    </>
  );
}
