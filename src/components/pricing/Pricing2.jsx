
import { Link } from "react-router-dom";

const Pricing2 = () => {
  const pricingCotent = [
    {
      id: 1,
      img: "/images/index-11/pricing/1.png",
      type: "Start Up",
      price: "Free",
      duration: "per month",
      width: "180",
      height: "180",
      features: [
        "1 job posting",
        "0 featured job",
        "Job displayed for 20 days",
        "Premium Support 24/7",
      ],
    },
    {
      id: 2,
      img: "/images/index-11/pricing/2.png",
      type: "Company",
      price: "599",
      duration: "per month",
      width: "180",
      height: "180",
      features: [
        "1 job posting",
        "0 featured job",
        "Job displayed for 20 days",
        "Premium Support 24/7",
      ],
    },
    {
      id: 3,
      img: "/images/index-11/pricing/3.png",
      type: "Enterprise",
      price: "999",
      duration: "per month",
      width: "130",
      height: "108",
      features: [
        "1 job posting",
        "0 featured job",
        "Job displayed for 20 days",
        "Premium Support 24/7",
      ],
    },
    {
      id: 4,
      img: "/images/index-11/pricing/4.png",
      type: "Business",
      price: "2999",
      duration: "per month",
      width: "120",
      height: "120",
      features: [
        "1 job posting",
        "0 featured job",
        "Job displayed for 20 days",
        "Premium Support 24/7",
      ],
    },
  ];

  return (
    <>
      {pricingCotent.map((item) => (
        <div className="col-lg-3 col-md-6" key={item.id}>
          <div className="pricingCard">
            <div className="pricingCard__img">
              <img
                width={item.width}
                height={item.height}
                src={item.img}
                alt="images"
              />
            </div>
            <h4 className="pricingCard__title">{item.type}</h4>
            <div className="pricingCard__price">{item.price}</div>
            <div className="pricingCard__subtitle">{item.duration}</div>

            <ul className="pricingCard__list">
              {item.features.map((val, i) => (
                <li key={i}>{val}</li>
              ))}
            </ul>

            <div className="pricingCard__btn">
              <Link to="/shop/cart" className="theme-btn btn-style-modern">
                Add to cart
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Pricing2;
