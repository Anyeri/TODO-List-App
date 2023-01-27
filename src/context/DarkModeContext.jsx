import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext();

//인자로 자식 노드 받아왔음
export function DarkModeProvider({ children }) {
  //처음 시작은 무조건 라이트 모드 활성화
  const [darkMode, setDarkMode] = useState(false);
  //자식들은 토글만 누르면 이전 상태를 반대로 설정해줌
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    updateDarkMode(!darkMode);
  };

  useEffect(() => {
    const isDark =
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches);
    setDarkMode(isDark);
    updateDarkMode(isDark);
  }, []);
  return (
    //자식중에 필요한 사람만 다크모드와 토글다크모드에 접근 할 수 있음
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}
//hook 으로 다크모드 컨텍스트 사용 할 수 있게 만듬
function updateDarkMode(darkMode) {
  if (darkMode) {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
  } else {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
  }
}
export const useDarkMode = () => useContext(DarkModeContext);
