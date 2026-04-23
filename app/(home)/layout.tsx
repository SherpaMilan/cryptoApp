import TabSwitcher from "../components/ui/tabSwitcher";
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
