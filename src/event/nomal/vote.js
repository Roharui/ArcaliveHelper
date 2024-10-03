
import Toastify from 'toastify-js'

function voteUp() {
    Toastify({
        text: "Voteup Complete",
        className: "info",
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();

    $("#rateUp").trigger("click")
}


export { voteUp }