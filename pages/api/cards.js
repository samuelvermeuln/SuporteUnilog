// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function cards(req, res) {
  const cards = [
    {
      "title": "Sistema de Suporte",
      "subTitle": "Click Aqui para ir para o sistema de Suporte",
      "caminho": "/suporte",
      "cor": ""
    },
    {
      "title": "Sistema Para Contabilidade",
      "subTitle": "Click aqui para ir para o sistema Contabilidade",
      "caminho": "/contabilidade",
      "cor": ""
    }
  ]

  res.status(200).json(cards)
}
