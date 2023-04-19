import logo from "/assets/logo.svg?raw"
import ThemeToggle from "./ThemeToggle"
import { RootStore, loadSession } from "~/store"
import { Show, createMemo } from "solid-js"
import { useNavigate } from "solid-start"

function splitEmoji(text: string) {
  const [icon, title] = text
    .split(
      /^([\u{1F300}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F900}-\u{1F9FF}\u{1F1E0}-\u{1F1FF}])\s*(.+)$/u
    )
    .filter(Boolean)
  if (title)
    return {
      icon,
      title
    }
  return {
    icon: undefined,
    title: icon
  }
}

function scrollTo(selector: string, yOffset = 0) {
  const el = document.querySelector(selector) as HTMLElement
  const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
  window.scrollTo({ top: y, behavior: "smooth" })
}

export default function Header() {
  const { store } = RootStore
  const navigate = useNavigate()
  const iconTitle = createMemo(() => splitEmoji(store.sessionSettings.title))

  function handleImageClick() {
    const imageContainer = document.getElementById("image-container");
    imageContainer.style.display = "block";
  }

  function handleCloseClick() {
    const imageContainer = document.getElementById("image-container");
    imageContainer.style.display = "none";
  }

  return (
    <>
      <div
        id="logo"
        class="pl-1em cursor-pointer inline-block"
        onClick={() => {
          navigate("/", { replace: true });
          loadSession("index");
        }}
      >
        <Show
          when={iconTitle().icon}
          fallback={<div class="w-8em h-8em" innerHTML={logo} />}
        >
          <div class="text-7em h-1em mb-8">{iconTitle().icon}</div>
        </Show>
      </div>
      <header class="px-4 py-2 sticky top-0 z-99 flex justify-between items-center">
        <div
          class="flex items-center text-2xl cursor-pointer"
          onClick={() => {
            scrollTo("main", -48);
          }}
        >
          <Show
            when={iconTitle().title}
            fallback={
              <>
                <a
                  href="#"
                  class="text-transparent font-extrabold bg-clip-text bg-gradient-to-r dark:from-yellow-300 from-yellow-600 dark:to-red-700 to-red-700 mr-1"
                  onClick={handleImageClick}
                >
                  ChatGPT
                </a>
                <span class="ml-1 font-extrabold text-slate-7 dark:text-slate">
                  Fitz
                </span>
                <div id="image-container" style={{ display: "none" }}>
                  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-500 bg-opacity-50">
                    <div class="bg-white shadow-lg rounded-lg p-6">
                    <button class="absolute top-0 right-0 mt-4 mr-4 text-gray-500 hover:text-gray-700 cursor-pointer" 
                    onClick={handleCloseClick}>X</button>
                      <div class="text-xl font-bold mb-4">请选择适合您的方式扫码转账，请备注您的邮箱地址或者手机号，在完成转账后的 2 小时内，网站密码会以短信或者邮件的形式发送给您，请注意查收。点击任意图片可以关闭弹窗</div>
                      <div class="flex justify-around">
                        <div>
                        <button onClick={() => {
                        const imageContainer = document.getElementById("image-container");
                         imageContainer.style.display = "none";
                        }}>
                         <img
                         alt="支付宝"
                          src="https://3o.hk/images/2023/04/18/Xnip2023-04-18_14-48-52.jpg"
                          class="w-32 h-32 object-contain cursor-pointer"
                              />
                          </button>
                          <p class="text-center mt-2">支付宝</p>
                        </div>
                        <div>
                          <button onClick={() => {
                            const imageContainer = document.getElementById("image-container");
                             imageContainer.style.display = "none";
                            }}>
                            <img
                              alt="微信"
                              src="https://3o.hk/images/2023/04/18/Xnip2023-04-18_14-49-01.jpg"
                              class="w-32 h-32 object-contain cursor-pointer"
                            />
                          </button>
                          <p class="text-center mt-2">微信</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            }
          >
            <span class="ml-1 font-extrabold text-slate-7 dark:text-slate">
              {iconTitle().title}
            </span>
          </Show>
        </div>
        <ThemeToggle />
      </header>
    </>
  );
}