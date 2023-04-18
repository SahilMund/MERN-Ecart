import React, { useEffect, useState } from "react";

import styles from "../styles/style";
import { Header,  ProfileSidebar } from './../components/';

const ProfilePage = () => {
  const [active, setActive] = useState(1);

  return (
    <div>
      <Header />
      <div className={`${styles.section} flex bg-[#f5f5f5] py-10`}>
        <div className="w-[50px] 800px:w-[335px] sticky 800px:mt-0 mt-[18%]">
          <ProfileSidebar active={active} setActive={setActive} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
