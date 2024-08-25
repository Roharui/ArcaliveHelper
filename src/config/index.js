
const DEFAULT_CONFIG = {
    "default_comment_hide": "false",
    "default_right_sidebar_hide": "true"
}

function config() {
    Object.keys(DEFAULT_CONFIG).forEach(k => {
        if (localStorage.getItem(k) == undefined) {
            localStorage.setItem(k, DEFAULT_CONFIG[k])
        }
    })

    if (localStorage.getItem("default_comment_hide") === "true") {
        $("#comment").hide()
    }
    if (localStorage.getItem("default_right_sidebar_hide") === "true") {
        $(".right-sidebar").hide()
    }
}

function resetConfig() {
    Object.keys(DEFAULT_CONFIG).forEach(k => {
        localStorage.setItem(k, DEFAULT_CONFIG[k])
    })
}

export { config, resetConfig }