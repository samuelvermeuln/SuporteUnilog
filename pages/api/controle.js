import Conferencia from "../../db/models/Conferencia"

export default async (req, res) => {

    try {
        const { action } = req.body
        if (!action) res.status(404).json({ error: "Informe a ação." })

        const validateActions = ['LISTAR', 'DELETAR']
        const isValidAction = validateActions.includes(action)
        if (!isValidAction) res.status(404).json({ error: "Ação informada invalida." })

        if (action == 'LISTAR') {
            const buscaTodos = await Conferencia.find()
            return res.status(200).json(buscaTodos)
        }

        if (action == 'DELETAR') {
            await Conferencia.deleteMany()
            return res.status(200).json({ message: "Deletados com sucesso." })
        }
    } catch (error) {
        return res.status(500).json({ error })
    }

}
