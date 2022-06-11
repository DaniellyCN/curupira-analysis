import React from "react";
import { Link } from "@mui/material";
import Image from "next/image";
import Logo from "../../../assets/logo.svg";

const LogoIcon = () => {
  return (
    <Link href="/">
      <Image src={Logo} alt="Curupira logo" />
    </Link>
  );
};

export default LogoIcon;
