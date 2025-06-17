export default function Login() {
  const render = () => {
    const section = document.createElement("section");
    section.innerHTML = "<h1>로그인</h1>";
    console.log(section);

    return section;
  };
  return { render };
}
