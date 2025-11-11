//푸터

import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <p className="footer-note">
          "본 웹페이지는 2025년 workSpace의 에코페스타 프로젝트로 제작되었습니다."
        </p>

        <p className="footer-fonts">
          Fonts used: 문경감홍사과체는 문경시 제작, MBC1961는 주)문화방송 제작,<br />
          프리텐다드는 길형진 (orioncactus) 제작하였습니다. 모든 폰트는 오픈 폰트 라이선스(OFL)에 따라 사용되었습니다.
        </p>

        <hr className="footer-divider" />

        <p className="footer-copy">
          © 2025 에코페스타 workSpace. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;