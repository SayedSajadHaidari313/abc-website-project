

const Block9 = () => {
  const blockContent = [
    {
      id: 1,
      img: "/images/index-12/images/1.png",
      serialNo: "01",
      title: "Explore Insights",
      text: `Browse a growing archive of shared insights from professionals. Discover trends, ideas, and experiences that inspire action.`,
    },
    {
      id: 2,
      img: "/images/index-12/images/2.png",
      serialNo: "02",
      title: "Vote And Bookmark",
      text: `Found something valuable? Click the ⭐ or 👍 to save it or vote it up. Help surface the best ideas for others too.`,
    },
    {
      id: 3,
      img: "/images/index-12/images/3.png",
      serialNo: "03",
      title: "Share Your Insight",
      text: `Got something worth sharing? Post your own insight in seconds and let others learn from your experience!.`,
    },
  ];

  return (
    <>
      {blockContent.map((item) => (
        <div className="col-xl-4 col-lg-4 col-md-6" key={item.id}>
          <div className="step-item text-center">
            <div className="image">
              <img  src={item.img} alt="image" />
            </div>
            <h3 className="title">
              <span className="text-red">{item.serialNo}</span> {item.title}
            </h3>
            <p className="text">{item.text}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Block9;
