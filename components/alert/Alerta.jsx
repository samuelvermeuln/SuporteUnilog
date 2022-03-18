import Swal from 'sweetalert2'

const Alerta = class {

    async error(titulo, texto){
        await Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            icon: 'error',
            title: titulo,
            text: texto,
        })
    }

    async success(titulo, texto){
        await Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            icon: 'success',
            title: titulo,
            text: texto,
        })
    }

    async warning(titulo, texto){
        await Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            icon: 'warning',
            title: titulo,
            text: texto,
        })
    }

    async info(titulo, texto){
        await Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            icon: 'info',
            title: titulo,
            text: texto,
        })
    }

}

export default new Alerta()
