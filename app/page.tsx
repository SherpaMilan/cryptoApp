// import TabSwitcher from "./ui/tabSwitcher"

// export default function Home() {
//   return (
//     <div className="w-full bg-[var(--brand-gray)]">
//       <div className="max-w-[1440px] mx-auto px-[72px] py-12 flex ">
//         <TabSwitcher/>
//      <h1>Home page</h1>
//       </div>
//     </div>
//   );
// }

"use client";

import TabSwitcher from "@/app/ui/tabSwitcher";

export default function HomePage() {
  return (
 <div className="w-full bg-[var(--brand-gray)]">
      <TabSwitcher />
      <div className="max-w-[1440px] mx-auto px-[72px] py-12">
        <h1>Welcome to Cryptium</h1>
        <p>Some home page content here...</p>
      </div>
    </div>
  );
}