import swal from 'sweetalert2'

export const Swal = {
    ok: function () { swal.fire({ title: 'Done!', icon: 'success' }) },
    err: function (data) { swal.fire({ icon: 'error', text: data }) } 
}