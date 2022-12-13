const timeline = [
  {
    id: "0",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4b/4b0ac04c6229da7a9caa112d57fb6fa679d9b6ea_full.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "1",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/e7/e72f5146afe7796a9506fbc524ade461936739a7_full.jpg",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "2",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/07/071e4c6046f9f2ce9a270e7a3c965a50b2baef5c_full.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "3",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4b/4b0ac04c6229da7a9caa112d57fb6fa679d9b6ea_full.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "4",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/e7/e72f5146afe7796a9506fbc524ade461936739a7_full.jpg",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "5",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/07/071e4c6046f9f2ce9a270e7a3c965a50b2baef5c_full.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
  {
    id: "6",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/4b/4b0ac04c6229da7a9caa112d57fb6fa679d9b6ea_full.jpg",
    username: "wongmjane",
    message: `Twitter Web App now runs ES6+ for modern browsers*, reducing the polyfill bundle size by 83%
  
  (gzipped size went from 16.6 KB down to 2.7 KB!!)
  
  * Chrome 79+, Safari 14+, Firefox 68+`,
  },
  {
    id: "7",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/e7/e72f5146afe7796a9506fbc524ade461936739a7_full.jpg",
    username: "midudev",
    message: "Wow, devter está funcionando y vivo 🦉",
    name: "Miguel Ángel Durán",
  },
  {
    id: "8",
    username: "d4nidev",
    name: "Daniel de la Cruz",
    avatar:
      "https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/avatars/07/071e4c6046f9f2ce9a270e7a3c965a50b2baef5c_full.jpg",
    message: `Abro paraguas Paraguas
  
  Clean Code es un libro obsoleto que en 2020, con los paradigmas de desarrollo de software que manejamos, puede hacerte más daño que beneficio.`,
  },
]

export default (req, res) => {
  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.send(timeline)
}
