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
  const [showPayImg, setShowPayImg] = createSignal(false)
  const [showWechatImg, setShowWechatImg] = createSignal(false)

  function handlePayClick() {
    setShowPayImg(true)
  }

  function handleWechatClick() {
    setShowWechatImg(true)
  }

  function handleCloseClick() {
    setShowPayImg(false)
    setShowWechatImg(false)
  }

  return (
    <>
      <div
        id="logo"
        class="pl-1em cursor-pointer inline-block"
        onClick={() => {
          navigate("/", { replace: true })
          loadSession("index")
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
            scrollTo("main", -48)
          }}
        >
          <Show
            when={iconTitle().title}
            fallback={
              <>
                <a
                  href="#"
                  class="text-transparent font-extrabold bg-clip-text bg-gradient-to-r dark:from-yellow-300 from-yellow-600 dark:to-red-700 to-red-700 mr-1"
                  onClick={handlePayClick}
                >
                  支付宝
                </a>
                <a
                  href="#"
                  class="text-transparent font-extrabold bg-clip-text bg-gradient-to-r dark:from-yellow-300 from-yellow-600 dark:to-red-700 to-red-700"
                  onClick={handleWechatClick}
                >
                  微信
                </a>
              </>
            }
          >
            <span class="ml-1 font-extrabold text-slate-7 dark:text-slate">
              {iconTitle().title}
            </span>
          </Show>
          <Show when={showPayImg() || showWechatImg()}>
            <div
              class="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center"
              onClick={handleCloseClick}
            >
              <Show when={showPayImg()}>
                <img
                  alt="支付宝"
                  src="https://s1.ax1x.com/2023/04/18/p9ipDoV.jpg"
                  class="max-w-full max-h-full"
                />
              </Show>
              <Show when={showWechatImg()}>
                <img
                  alt="微信"
                  src="https://s1.ax1x.com/2023/04/18/p9ipGi8.jpg"
                  class="max-w-full max-h-full"
                />
              </Show>
            </div>
          </Show>
        </div>
        <ThemeToggle />
      </header>
    </>
  )
}