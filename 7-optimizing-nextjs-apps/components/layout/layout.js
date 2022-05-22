import MainHeader from "./main-header";

export default function Layout(props) {
  return (
    <>
      <MainHeader />
      <header></header>
      <main>{props.children}</main>
    </>
  );
}
