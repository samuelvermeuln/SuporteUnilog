// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function cards(req, res) {
  const cards = [
    {
      "title": "Sistema de Suporte",
      "subTitle": "Click Aqui para ir para o sistema de Suporte",
      "caminho": "/suporte",
      "color": "#260d33"
    },
    {
      "title": "Sistema Para Contabilidade",
      "subTitle": "Click aqui para ir para o sistema Contabilidade",
      "caminho": "/contabilidade",
      "color": "#106b87"
    }
    
  ]

  res.status(200).json(cards)
}
