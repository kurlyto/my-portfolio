import Image from "next/image";

const photos = [
  { src: "/images/profile-pic.png", alt: "Nathan Knaebel profile picture" },
  // Ajoutez d'autres images ici :
  // { src: "/images/photo2.png", alt: "Description photo 2" },
  // { src: "/images/photo3.png", alt: "Description photo 3" },
];

export default function photographiePage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Mes photographies</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {photos.map((photo, index) => (
          <Image key={index} src={photo.src} alt={photo.alt} width={300} height={300} className="w-full rounded-lg" />
        ))}
      </div>
    </div>
  );
}
