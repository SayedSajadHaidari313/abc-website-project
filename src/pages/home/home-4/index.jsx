import React from "react";

import Home from "@/components/home-4";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home - Explore Businesses & Services | ABC.AF Directory Platform",
  description:
    "Discover and connect with businesses, services, and professionals across Afghanistan on ABC.AF, the leading directory platform. Find what you need quickly and easily!",
};

const HomePage4 = () => {
  return (
    <>
      <MetaComponent meta={metadata} />
      <Home />
    </>
  );
};

export default HomePage4;
