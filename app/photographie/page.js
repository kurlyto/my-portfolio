import Image from "next/image";
import nextImg from "../images/profile-pic.png";

export default function photographiePage() {
  return (
    <div className="p-8">
      Mes photographies
      <Image
        src={nextImg}
        alt="Nathan Knaebel profile picture"
        width={300}
        height={300}
        className="w-full rounded-lg"
      />
    </div>
  );
}
