import TabSwitcher from "../ui/tabSwitcher";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TabSwitcher />
      {children}
    </>
  );
}
