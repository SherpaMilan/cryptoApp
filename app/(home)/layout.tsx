import TabSwitcher from "../components/ui/TabSwitcher";
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
