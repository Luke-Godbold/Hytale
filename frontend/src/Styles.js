// 20/01/2026
// created and exported style tags for navItems, card and title
// 21/01/2026
// added inputBox, inputDiv, button, linkText
const lightTheme = ["stone-200","black", "white"]
const darkTheme = ["stone-200","black", "white"]
const colourShceme = darkTheme
export const navItems = `text-xl cursor-pointer font-semibold p-5 transition duration-200 ease-in-out hover:-translate-y-2 hover:text-blue-700`
export const deskNav = `bg-${colourShceme[0]} text-${colourShceme[1]} w-1/2 rounded-2xl justify-self-center flex items-center`
export const mobileNav = `bg-${colourShceme[0]} text-${colourShceme[1]} w-3/4 md:w-1/2 rounded-2xl justify-self-center flex flex-col py-5` 
export const card = `bg-${colourShceme[0]} text-${colourShceme[1]} lg:w-3/10 md:w-1/2 w-3/4 rounded-2xl justify-self-center flex flex-col items-center gap-5 mt-40 p-5`
export const title = `w-full text-center font-semibold text-3xl`
export const inputBox = `outline-1 hover:outline-blue-700 p-2 rounded-xl`
export const inputDiv = `gap-2 flex flex-col`
export const button = `rounded-2xl bg-blue-700 cursor-pointer py-3 lg:w-1/5 md:w-1/3 w-1/2 text-${colourShceme[2]} hover:bg-blue-500 outline-1 outline-${colourShceme[1]} font-semibold`
export const linkText = `text-blue-700 font-semibold cursor-pointer transition duration-200 ease-in-out hover:-translate-y-2`


