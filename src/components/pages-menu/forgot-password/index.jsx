import ForgotPassword from "@/components/common/form/forgot-password";
import MobileMenu from "@/components/header/MobileMenu";
import Header from "../login/Header";

const Forgot = () => {
  return (
    <>
      <Header />
      {/* <!--End Main Header -->  */}

      <MobileMenu />
      {/* End MobileMenu */}

      <div
        className="login-section"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "120px 20px 50px",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0, 0, 0, 0.6)",
            zIndex: 1,
          }}
        ></div>
        <div
          className="outer-box"
          style={{
            position: "relative",
            zIndex: 2,
            marginLeft: 0,
            width: "100%",
            maxWidth: "500px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <!-- Forgot Password Form --> */}
          <div
            className="login-form default-form"
            style={{
              backgroundColor: "rgba(255, 255, 255, 0.95)",
              borderRadius: "15px",
              padding: "40px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
              backdropFilter: "blur(10px)",
              width: "100%",
            }}
          >
            <ForgotPassword />
          </div>
          {/* <!--End Forgot Password Form --> */}
        </div>
      </div>
      {/* <!-- End Info Section --> */}
    </>
  );
};

export default Forgot;
