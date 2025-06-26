import Wrapper from "@/layout/Wrapper";
import HomeComponent from "@/components/home-4";

import MetaComponent from "@/components/common/MetaComponent";

const metadata = {
  title: "Home || InsightDeed - Job Portal Platform",
  description: "InsightDeed - Job Portal Platform",
};

export default function Home() {
  return (
    <Wrapper>
      <MetaComponent meta={metadata} />
      <HomeComponent />
    </Wrapper>
  );
}
