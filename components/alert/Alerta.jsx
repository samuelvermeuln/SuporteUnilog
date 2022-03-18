import Swal from 'sweetalert2'

const Alerta = class {

    error(titulo, texto){
        Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            icon: 'error',
            title: titulo,
            text: texto,
        })
    }

    success(titulo, texto){
        Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            icon: 'success',
            title: titulo,
            text: texto,
        })
    }

    warning(titulo, texto){
        Swal.fire({
            customClass: {
                container: 'my-swal'
            },
            icon: 'warning',
            title: titulo,
            text: texto,
        })
    }

    info(titulo, texto){
        Swal.fire({
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
