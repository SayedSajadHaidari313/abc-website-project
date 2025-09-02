import { useRef, useEffect, useState } from "react";
import { useGetAuthUserData } from "@/queries/user.query";
import PropTypes from "prop-types";

import { Image, QRCode, notification } from "antd";
import html2canvas from "html2canvas";
import { BASE_IMAGE_URL } from "@/utils/linkActiveChecker";
import LazyImage from "@/components/common/LazyImage";
import {
  getDownloadObjectUrl,
  revokeObjectUrl,
  downloadDataUrl,
} from "@/utils/imageUtils";

const VisitCardPreview = ({ companyData: propCompanyData }) => {
  // replaced single ref with two refs for front and back
  const frontRef = useRef();
  const backRef = useRef();

  // get auth user as fallback/source of truth
  const { data: userData } = useGetAuthUserData();

  const user = userData?.user || userData || {};
  const companyFromUser = user.items?.[0] || null;
  const [isLoading, setIsLoading] = useState(false);
  const formatImageUrlUser = (path) => {
    if (!path) return null;
    const normalized = path.replace(/\\/g, "/").replace(/^\/+|\/+$/g, "");
    const isDev =
      typeof window !== "undefined" &&
      window.location &&
      window.location.hostname === "localhost";
    // In dev, return relative path to leverage Vite proxy and avoid CORS
    if (isDev) {
      return `/${normalized}`;
    }
    return `${BASE_IMAGE_URL}/${normalized}`;
  };

  const companyData =
    companyFromUser || {
      companyName: user.items?.item_title,
      companyImage: user.items?.item_image,
      CompanyDescription: user.items?.item_description,
      tagline: user.tagline,
      PhoneNumber: user.items?.item_phone,
      EmailAddress: user.email,
      address: user.address,
      city: user.city,
      country: user.country,
    } ||
    {};

  // --- ADDED: helper to safely convert objects to displayable text ---
  const toText = (val) => {
    if (val == null) return "";
    if (typeof val === "string" || typeof val === "number") return String(val);
    if (typeof val === "object") {
      // prefer common readable properties
      return (
        val.name ||
        val.title ||
        val.label ||
        val.code ||
        val.value ||
        JSON.stringify(val)
      );
    }
    return String(val);
  };

  // normalized values used in render
  const companyName = toText(companyData.item_title) || "Company Name";
  const CompanyDescription =
    toText(companyData.item_description) || "Company Details";
  const tagline = toText(companyData.tagline);
  const PhoneNumber = toText(companyData.item_phone);
  const website = toText(
    companyData.item_website || companyData.item_website || user.item_website
  );
  const CompanyImage = toText(
    companyData.item_image || companyData.item_image || user.item_image
  );
  const EmailAddress = toText(user.email);
  const addressText =
    toText(user.address) ||
    toText(user.city) ||
    toText(user.country) ||
    "No address provided";

  // local blob URL for company logo (used for html2canvas capture)
  const [companyLogoUrl, setCompanyLogoUrl] = useState(null);

  useEffect(() => {
    let objectUrl = null;
    const loadLogo = async () => {
      if (!CompanyImage) return;
      try {
        // extract clean filename (strip query/hash)
        const raw = CompanyImage || "";
        const baseName = raw.split("/").pop() || raw;
        const cleanName = baseName.split("?")[0].split("#")[0];
        objectUrl = await getDownloadObjectUrl(cleanName);
        if (!objectUrl) return;
        setCompanyLogoUrl(objectUrl);
      } catch (e) {
        console.error("logo fetch failed", e);
      }
    };
    loadLogo();

    return () => {
      if (objectUrl) {
        try {
          revokeObjectUrl(objectUrl);
        } catch (e) {}
      }
    };
  }, [CompanyImage]);

  // show backend download page as fallback (kept for manual fallback, not used for automatic capture)

  // wait for all <img> and background images inside element to finish loading
  const ensureImagesLoaded = (element, timeout = 8000) => {
    if (!element) return Promise.resolve();

    const imgs = Array.from(element.querySelectorAll("img"));
    const bgUrls = new Set();

    Array.from(element.querySelectorAll("*")).forEach((el) => {
      try {
        const bg = getComputedStyle(el).backgroundImage;
        if (!bg || bg === "none") return;
        const m = bg.match(/url\((['"]?)(.*?)\1\)/);
        if (m && m[2]) bgUrls.add(m[2]);
      } catch (e) {
        // ignore
      }
    });

    const imgPromises = imgs.map((img) => {
      if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
      return new Promise((resolve) => {
        let settled = false;
        const onFinish = () => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        };
        const onError = () => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        };
        const cleanup = () => {
          img.removeEventListener("load", onFinish);
          img.removeEventListener("error", onError);
        };
        img.addEventListener("load", onFinish);
        img.addEventListener("error", onError);
        // timeout fallback
        setTimeout(() => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        }, timeout);
      });
    });

    const bgPromises = Array.from(bgUrls).map((url) => {
      return new Promise((resolve) => {
        if (!url) return resolve();
        const image = new Image();
        let settled = false;
        const onFinish = () => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        };
        const onError = () => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        };
        const cleanup = () => {
          image.removeEventListener("load", onFinish);
          image.removeEventListener("error", onError);
        };
        // try anonymous to avoid CORS taint when possible (blob URLs won't be affected)
        try {
          image.crossOrigin = "anonymous";
        } catch (e) {}
        image.addEventListener("load", onFinish);
        image.addEventListener("error", onError);
        image.src = url;
        // timeout fallback
        setTimeout(() => {
          if (settled) return;
          settled = true;
          cleanup();
          resolve();
        }, timeout);
      });
    });

    return Promise.all([...imgPromises, ...bgPromises]);
  };

  // fetch image from backend download endpoint and replace <img> src and background-image with blob URL
  const fetchAndReplaceImages = async (rootElement) => {
    if (!rootElement) return [];
    const createdUrls = [];
    const imgs = Array.from(rootElement.querySelectorAll("img"));
    const bgElements = Array.from(rootElement.querySelectorAll("*")).filter(
      (el) => {
        try {
          const bg = getComputedStyle(el).backgroundImage;
          return bg && bg !== "none" && bg.includes("url(");
        } catch (e) {
          return false;
        }
      }
    );

    const processSrc = async (src) => {
      if (!src) return null;
      if (src.startsWith("data:") || src.startsWith("blob:")) return src;

      // Normalize src to filename
      let fileName = null;
      try {
        // if contains BASE_IMAGE_URL, extract last segment
        if (src.includes(BASE_IMAGE_URL)) {
          const parts = src.split("/");
          fileName = (parts.pop() || parts.pop() || "")
            .split("?")[0]
            .split("#")[0];
        } else {
          // relative path or other host
          const parts = src.split("/");
          fileName = (parts.pop() || parts.pop() || "")
            .split("?")[0]
            .split("#")[0];
        }
        if (!fileName) return null;
      } catch (e) {
        return null;
      }

      const objectUrl = await getDownloadObjectUrl(fileName);
      if (objectUrl) {
        createdUrls.push(objectUrl);
        return objectUrl;
      }
      return null;
    };

    // process <img>
    await Promise.all(
      imgs.map(async (img) => {
        try {
          const src = img.src;
          if (!src || src.startsWith("data:") || src.startsWith("blob:"))
            return;
          if (/^https?:/i.test(src) || src.startsWith("/")) {
            const objectUrl = await processSrc(src);
            if (objectUrl) {
              try {
                img.crossOrigin = "anonymous";
              } catch (e) {}
              img.src = objectUrl;
            } else {
              // fallback: do nothing, downloadFile used only for manual fallback
            }
          }
        } catch (err) {
          console.warn("img replace error", err);
        }
      })
    );

    // process background-image
    await Promise.all(
      bgElements.map(async (el) => {
        try {
          const bg = getComputedStyle(el).backgroundImage;
          const m = bg && bg.match(/url\((['"]?)(.*?)\1\)/);
          if (!m || !m[2]) return;
          const src = m[2];
          if (src.startsWith("data:") || src.startsWith("blob:")) return;
          if (/^https?:/i.test(src) || src.startsWith("/")) {
            const objectUrl = await processSrc(src);
            if (objectUrl) {
              el.style.backgroundImage = `url("${objectUrl}")`;
            }
          }
        } catch (err) {
          console.warn("bg replace error", err);
        }
      })
    );

    return createdUrls;
  };

  // handleDownload now accepts an element (front or back) to capture
  const handleDownload = async (element, filename = "visit-card.png") => {
    if (!element) return;
    setIsLoading(true);
    let createdUrls = [];
    try {
      // replace backend images/backgrounds with blob URLs so html2canvas can capture them reliably
      createdUrls = await fetchAndReplaceImages(element);

      // --- ADDED: simpler robust image loading (based on your other project) ---
      const imgs = Array.from(element.querySelectorAll("img"));
      console.log("handle download", imgs);

      await Promise.all(
        imgs.map((img) => {
          try {
            img.crossOrigin = "anonymous";
          } catch (e) {
            // ignore
          }
          if (img.complete && img.naturalWidth !== 0) return Promise.resolve();
          return new Promise((resolve) => {
            const onFinish = () => {
              cleanup();
              resolve();
            };
            const onError = () => {
              cleanup();
              resolve();
            };
            const cleanup = () => {
              img.removeEventListener("load", onFinish);
              img.removeEventListener("error", onError);
            };
            img.addEventListener("load", onFinish);
            img.addEventListener("error", onError);
            // timeout fallback
            setTimeout(() => {
              cleanup();
              resolve();
            }, 8000);
          });
        })
      );

      const canvas = await html2canvas(element, {
        backgroundColor: null,
        useCORS: true,
        scrollY: -window.scrollY,
      });

      downloadDataUrl(filename, canvas.toDataURL("image/png"));
    } catch (error) {
      console.error("download failed", error);
      try {
        notification.error({
          message: "Download failed",
          description:
            "There was a problem generating the image. Please try again.",
        });
      } catch (_) {}
    } finally {
      // cleanup any created object URLs
      createdUrls.forEach((u) => {
        try {
          revokeObjectUrl(u);
        } catch (e) {
          // ignore
        }
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="visit-card-preview">
      {/* FRONT SIDE */}
      <div
        ref={frontRef}
        className="vc-front"
        style={{
          position: "relative",
          display: "inline-block",
          width: "100%",
          maxWidth: 720,
        }}
      >
        <Image
          src="/images/card-visit/front.png"
          alt="Visit Card"
          preview={false}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 8,
          }}
        />

        {/* Overlay area positioned on the right dark panel of the background */}
        <div
          className="vc-overlay"
          style={{
            position: "absolute",
            top: "30%",
            left: 39,
            transform: "translateY(-50%)",
            // textAlign: "right",
            color: "#ffffff",
            pointerEvents: "none",
            maxWidth: "100%",
          }}
        >
          <div
            className="vc-company-name"
            style={{
              fontSize: 30,
              fontWeight: 800,
              color: "#f5c087",
              lineHeight: 1,
            }}
          >
            {companyName}
          </div>
          {tagline && (
            <div
              className="vc-tagline"
              style={{ fontSize: 14, marginTop: 6, opacity: 0.95 }}
            >
              {tagline}
            </div>
          )}

          <div
            style={{
              marginTop: 18,
              textAlign: "center",
              color: "gray",
              fontSize: 16,
            }}
          >
            {CompanyDescription && (
              <div
                className="vc-desc"
                style={{
                  display: "flex",
                  justifyContent: "flex-center",
                  gap: 8,
                  alignItems: "left",
                  top: "112%",
                  left: 57,
                  position: "absolute",
                }}
              >
                <span style={{ marginLeft: 8 }}>{CompanyDescription}</span>
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: 18,
              textAlign: "right",
              color: "black",
              fontSize: 16,
            }}
          >
            {EmailAddress && (
              <div
                className="vc-email"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  alignItems: "center",
                  top: "340%",
                  left: 50,
                  position: "absolute",
                }}
              >
                <span style={{ marginLeft: 8 }}>{EmailAddress}</span>
              </div>
            )}
          </div>
          <div
            style={{
              marginTop: 18,
              textAlign: "right",
              color: "black",
              fontSize: 16,
            }}
          >
            {PhoneNumber && (
              <div
                className="vc-phone"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  alignItems: "center",
                  top: "257%",
                  left: 50,
                  position: "absolute",
                }}
              >
                <span style={{ marginLeft: 8 }}>{PhoneNumber}</span>
              </div>
            )}
          </div>

          <div
            style={{
              marginTop: 18,
              textAlign: "right",
              color: "black",
              fontSize: 16,
            }}
          >
            {CompanyImage && (
              <div
                className="vc-logo-overlay"
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  gap: 8,
                  alignItems: "center",
                  top: "-73%",
                  right: -158,
                  position: "absolute",
                }}
              >
                <span style={{ marginLeft: 8 }}>
                  {/* render fetched blob URL when available so html2canvas captures it */}
                  {companyLogoUrl ? (
                    <img
                      src={companyLogoUrl}
                      alt="user logo"
                      style={{
                        padding: 4,
                        backgroundColor: "white",
                        width: 90,
                        height: 90,
                        borderRadius: "10%",
                        objectFit: "cover",
                      }}
                    />
                  ) : (
                    <LazyImage
                      className="avatar-img"
                      src={formatImageUrlUser(CompanyImage)}
                      alt="user logo"
                      style={{
                        padding: 4,
                        backgroundColor: "white",
                        width: 90,
                        height: 90,
                        borderRadius: "10%",
                      }}
                    />
                  )}
                </span>
              </div>
            )}
          </div>

          <div style={{ marginTop: 22, color: "black", opacity: 0.95 }}>
            <div
              className="vc-address-overlay"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                alignItems: "center",
                top: "425%",
                position: "absolute",
                left: 54,
              }}
            >
              <span>{addressText}</span>
            </div>
          </div>
          {/* QR code added at top-left */}
          <div
            className="vc-qr-overlay"
            style={{
              position: "absolute",
              top: 175,
              left: 545,
              zIndex: 5,
              textAlign: "center",
              pointerEvents: "none",
            }}
          >
            {/* Inline QRCode (raw) - uses antd's QRCode component */}
            <div
              style={{
                background: "#fff",
                borderRadius: 8,
                display: "inline-block",
              }}
            >
              <QRCode
                value={`${window.location.origin}/company/${
                  companyData?.item_slug || propCompanyData?.item_slug || ""
                }`}
                size={95}
                icon={companyLogoUrl || undefined}
              />
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() =>
            handleDownload(frontRef.current, "visit-card-front.png")
          }
          className="theme-btn btn-style-one"
          disabled={isLoading}
        >
          {isLoading ? "Downloading..." : "Download Front Card"}
        </button>
      </div>
      {/* BACK SIDE - logo centered on back.png */}
      <div
        ref={backRef}
        className="vc-back"
        style={{
          position: "relative",
          display: "inline-block",
          width: "100%",
          maxWidth: 720,
          marginTop: 12,
        }}
      >
        <Image
          src="/images/card-visit/back.png"
          alt="Visit Card Back"
          preview={false}
          style={{
            width: "100%",
            height: "auto",
            display: "block",
            borderRadius: 8,
          }}
        />

        {/* centered company logo */}
        <div
          className="vc-back-overlay"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            pointerEvents: "none",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          {CompanyImage ? (
            companyLogoUrl ? (
              <img
                src={companyLogoUrl}
                alt="company logo"
                style={{
                  width: 120,
                  height: 96,
                  objectFit: "contain",
                  // background: "#fff",
                }}
              />
            ) : (
              <LazyImage
                src={formatImageUrlUser(CompanyImage)}
                alt="company logo"
                style={{
                  width: 120,
                  height: 96,
                  objectFit: "contain",
                  background: "#fff",
                }}
              />
            )
          ) : null}
          <div
            className="vc-back-company-name"
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#f5c087",
              lineHeight: 1,
              position: "absolute",
              top: 113,
            }}
          >
            {companyName}
          </div>
        </div>
      </div>
      <div style={{ marginTop: 12 }}>
        <button
          onClick={() => handleDownload(backRef.current, "visit-card-back.png")}
          className="theme-btn btn-style-one "
          disabled={isLoading}
        >
          {isLoading ? "Downloading..." : "Download Back Card"}
        </button>
      </div>
    </div>
  );
};

export default VisitCardPreview;

VisitCardPreview.propTypes = {
  companyData: PropTypes.object,
};

VisitCardPreview.defaultProps = {
  companyData: {},
};
