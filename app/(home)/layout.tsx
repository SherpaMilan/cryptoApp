import TabSwitcher from "../components/Ui/TabSwitcher";
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
