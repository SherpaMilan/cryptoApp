import Image from "next/image";
import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" className="flex flex-row items-center gap-2 p-2">
      <Image src="/logo.png" alt="Logo" width={30} height={20} />
      <span className="text-[21px] font-bold">Cryptium</span>
    </Link>
  );
}
