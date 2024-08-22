import { AvatarComponent } from "@rainbow-me/rainbowkit";
import Image from "next/image";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";

const CustomAvatar: AvatarComponent = ({ address, ensImage, size }) => {
  return ensImage ? (
    <Image src={ensImage} width={size} height={size} style={{ borderRadius: size }} alt="avatar" />
  ) : (
    <Jazzicon diameter={size} seed={jsNumberForAddress(address)} />
  );
};

export default CustomAvatar;