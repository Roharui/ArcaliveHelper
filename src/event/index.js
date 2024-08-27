
import { changeConfig, resetConfig } from "../config";
import { Vault } from "../vault";
import { nextComment, prevComment } from "./comment";
import { toggle, view } from "./image"
import { nextPage, prevPage } from "./next";

const KEYBORD_EVENT = {
    "ArrowLeft": prevPage,
    "ArrowRight": nextPage,
    "Enter": nextComment,
    "Shift": view,
    "/": toggle,
    "\\": () => changeConfig("default_viewer"),
    "`": () => resetConfig(),
    "Tab": () => {
        let v = new Vault()
        console.log(v.isViewer())
    },
}

const CONTROL_KEYBORD_EVENT = {
    "Enter": prevComment,
    "/": () => changeConfig("default_widthfit"),
    "ArrowLeft": () => {
        let v = new Vault()
        if (v.isViewer()) {
            return
        }
        history.back()
    },
    "ArrowRight": () => {
        let v = new Vault()
        if (v.isViewer()) {
            return
        }
        history.forward()
    },
}

function event() {
    $(document).on("keydown", function(e) {
        console.log(e.key)
        if (KEYBORD_EVENT[e.key] == undefined) return;
        if (e.ctrlKey) {
            CONTROL_KEYBORD_EVENT[e.key]()
        } else {
            KEYBORD_EVENT[e.key]()
        }
    })
}

export { event }