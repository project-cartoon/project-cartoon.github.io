const log = (a, ...args) => {
    // return // no log
    console.log(`%c ${a} `, "background:gold;color:black", ...args);
}

const _IMGNAME_ = "p"; //p1.png .. p10.png in local directory

// **************************************************************************** languages
const languages = {
    // underscore character "_" will be replaced with a line break "<br>"
    wc: [
        "We need a reusable_tree-swing Web Component",
        "This Web Component will revolutionize the industry!",
        "We should use a_UI Framework for this",
        "Nah, it will work fine in Safari…",
        "We need a component with 500 props and shadow DOM",
        "And auto-generated JSDoc comments…",
        "Sorry, that Web Component only works with Svelte",
        "Why is the component using_React inside shadow DOM?",
        "lightweight, framework-agnostic with minimal dependencies!!",
        "AI: You want a basic vanilla JS_Web Component?"
    ],
    // ------------------------------------------------------------------------ English
    en: [
        "the Customer_described",
        "the Consultant_heard",
        "the Analyst_designed",
        "the Programmer_programmed",
        "the Project Manager communicated",
        "the Testers_documented",
        "DEVOPS_installed",
        "the Helpdesk_supports",
        "the Customer_was billed for",
        "the Customer_really needed"
    ],
    // ------------------------------------------------------------------------ Spanish
    es: [
        "el Cliente_describió",
        "el Consultor_escuchó",
        "el Analista_diseñó",
        "el Programador_programó",
        "el Gerente de Proyecto_comunicó",
        "los Testers_documentaron",
        "DEVOPS_instaló",
        "el Soporte Técnico_apoya",
        "el Cliente_fue facturado por",
        "el Cliente_realmente necesitaba"
    ],
    // ------------------------------------------------------------------------ Dutch
    nl: [
        "de Klant_beschreef",
        "de Consultant_schreef op",
        "de Analist_ontwierp",
        "de Programmeur_codeerde",
        "de Project Manager_communiceerde",
        "de Testers_hebben getest",
        "ICT Beheer_installeerde",
        "de Helpdesk ondersteund",
        "de Klant kreeg_een rekening voor",
        "de Klant_had nodig"]
}
// **************************************************************************** footerText
const footerHTML = [
    `<b>Drag and drop images to reorder`, `edit headers</b>`,
    `Edits are saved in localStorage`,
    `<a href="javascript:document.querySelector('project-cartoon').reset();location.reload()">Reset & Clear LocalStorage</a>`,
    `<a href="https://github.com/project-cartoon/project-cartoon.github.io">GitHub source</a>` +
    `<br>` +
    `<language-links></language-links>`,
    `Images by: <a href="https://projectcartoon.com">Justin Hourigan</a>`,
    `Tree Swing history : <a href="https://www.businessballs.com/amusement-stress-relief/tree-swing-cartoon-pictures-early-versions/">all versions since the 1970s</a>`].join(" - ");
// **************************************************************************** styles
const styles = `
    :host{
        --title-background-color: #316300;
        --title-color: beige;
        --cartoon-gap: .5vw;
        display:inline-block;
        width: 100%;
        height: 88vh;
    }` +
    `project-cartoon-images {
        display:grid;
        grid: 1fr 1fr/ repeat(5, 1fr);
        gap: var(--cartoon-gap);
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
    }` +
    `project-img {
        box-sizing: border-box;
        overflow: hidden;
        position: relative;
        border-radius: calc(1.5 * var(--cartoon-gap));
        width: 100%;
        height: 100%;
        box-shadow: 1px 1px 1px 0px rgba(0, 0, 0, 0.5);
        border: 1px solid rgba(10, 10, 10, 0.5);
        cursor: pointer;
        display: inline-block;
        opacity: 1;
    }` +
    `project-img img {
        position: absolute;
        top: 2em;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 90%;
    }` +
    `project-img editable-header {
        font-size: 70%;
        position: absolute;
        top: 0;
        left: 0;
        display: inline-block;
        width: 100%;
        height: 5em;
        padding: .1em .1em;
        background: var(--title-background-color);
        color: var(--title-color);
        text-shadow: 1px 1px 1px black;
        opacity: 1;
        box-sizing: border-box;
        text-align: center;
        border-bottom: 1px solid black;
    }` +
    `footer {
        margin: .5em;
        text-align: center;
        font-size: 80%;
    }`
// **************************************************************************** helper functions
let urlParamater = name => new URLSearchParams(window.location.search).get(name);
// ---------------------------------------------------------------------------- createElement
let createElement = (tag, props = {}) => {
    let el = Object.assign(document.createElement(tag), props);
    Object.entries(props.styles || {}).forEach(([key, value]) => el.style[key] = value);
    return el;
}
// ---------------------------------------------------------------------------- createSTYLEelement
let createSTYLEElement = (styles) => createElement("style", { innerHTML: styles });

// **************************************************************************** BaseClass
class BaseClassHTMLElement extends HTMLElement {
    // ======================================================================== connectedCallback
    connectedCallback() {
        this.$connected && this.$connected();
    }
    // ======================================================================== attachEvents
    // process all methods starting with "event_" and attach them to the root element
    attachEvents(root = this) {
        Object.getOwnPropertyNames(Object.getPrototypeOf(this))
            .filter(method => method.startsWith('event_'))
            .forEach(method => {
                let eventType = method.split('_').pop();
                root[eventType] = (evt) => {
                    log("event_" + eventType);
                    this[method](evt)
                }
            });
    }
} // BaseClassHTMLElement

// **************************************************************************** <laguage-links>
customElements.define("language-links", class extends BaseClassHTMLElement {
    $connected() {
        this.append(
            "translations: ",
            ...Object.keys(languages).map((lang, index, array) => {
                // ------------------------------------------------------------ create links
                let elements = [
                    createElement("a", {
                        href: `?lang=${lang}`,
                        innerHTML: lang.toUpperCase(),
                        style: { margin: "0 .2em" },
                        onclick: (evt) => {
                            evt.preventDefault();
                            location.search = `?lang=${lang}`;
                        }
                    })
                ];
                // ------------------------------------------------------------ create dividers
                if (index < array.length - 1) {
                    elements.push(document.createTextNode(" - ")); // create dividers inbetween
                }
                // ------------------------------------------------------------ return elements
                return elements;
            }).flat(),
        ) // append
    } // connectedCallback
}); // define <language-links>

// **************************************************************************** <project-cartoon>
customElements.define("project-cartoon", class extends BaseClassHTMLElement {
    $connected() {
        let preferredLanguage = urlParamater("lang") || this.getAttribute("language");
        let titles = languages[preferredLanguage] || languages.en;
        // -------------------------------------------------------------------- main HTML
        this
            .attachShadow({ mode: "open" })
            .append(
                createSTYLEElement(styles),
                // ------------------------------------------------------------ reference to animation <style>
                this.animation = createSTYLEElement(
                    `project-img {opacity: 0;animation: moveIMG 1s forwards}` +
                    `@keyframes moveIMG {` +
                    `0%   {transform: translateX(-200%);opacity: 0}` +
                    `100% {transform: translateY(0%) translateX(0%);opacity: 1} }`
                ),
                // ------------------------------------------------------------ main container
                this.container = createElement("project-cartoon-images"),
                // ------------------------------------------------------------ footer
                createElement("footer", {
                    innerHTML: footerHTML
                })

            );
        // -------------------------------------------------------------------- append images
        this.appendImages(
            titles.map((title, index) => {
                let id = _IMGNAME_ + (++index); // p1...p10 .png images
                // ------------------------------------------------------------ return project-img
                return createElement("project-img", {
                    id,
                    src: id + ".png",
                    title,
                    text: (localStorage.getItem(id) || title).replaceAll("_", "<br>"),
                    styles: {
                        "animation-delay": `${index * 0.1}s`,
                        //"order": index * 2
                    },
                })
            }),
        )
        // -------------------------------------------------------------------- main JS
        setTimeout(() => this.animation.remove(), 2000);
        this.restoreOrder();
        //! Custom drag drop
        // this.ondragover = (evt) => {
        //     let dragging = document.getElementById("DRAGIMAGE");
        //     dragging.style.top = evt.clientY + "px";
        //     dragging.style.left = evt.clientX + "px";
        // }
    }
    // ======================================================================== get projectIMGs
    get projectIMGs() {
        return [...this.shadowRoot.querySelectorAll("project-img")];
    }
    get order() {
        return this.projectIMGs.map(el => el.id).join(",");
    }
    set order(order) {
        this.appendImages(
            order
                .split(",")
                .map(id => this.shadowRoot.getElementById(id))
        )
    }
    // ======================================================================== appendIMGs
    appendImages(imgs = []) {
        this.container.append(...imgs);
    }
    // ======================================================================== saveOrder
    saveOrder(order = this.order) {
        log("saveOrder", order);
        localStorage.setItem(this.nodeName, order);
    }
    // ======================================================================== restoreOrder
    restoreOrder(order = localStorage.getItem(this.nodeName)) {
        log("restoreOrder", order);
        if (order) this.order = order;
    }
    // ======================================================================== reset
    reset() {
        localStorage.clear();
    }
});

// **************************************************************************** <editable-header>
customElements.define("editable-header", class extends BaseClassHTMLElement {
    // ======================================================================== connectedCallback
    $connected() {
        this.contentEditable = true;
        this.attachEvents();
    } // connectedCallback
    // ======================================================================== onkeydown
    event_onkeydown(evt) {
        if (evt.keyCode == 13) {
            evt.preventDefault(); // ignore enter
            return;
            //!! Makes this work with shadowDOM
            // Insert an _ character at the current caret position.
            const selection = window.getSelection();
            const range = selection.getRangeAt(0);
            const textNode = document.createTextNode('_');
            range.insertNode(textNode);
            // Move the caret to the position after the inserted _ character.
            range.setStartAfter(textNode);
            range.setEndAfter(textNode);
            selection.removeAllRanges();
            selection.addRange(range);
        }
    }
    // ======================================================================== onkeyup
    event_onkeyup(evt) {
        localStorage.setItem(this.id, (evt.target.innerHTML));
    }
    // ======================================================================== onclick 
    event_onclick(evt) {
        if (evt.ctrlKey) {
            localStorage.removeItem(this.id);
            evt.target.innerHTML = evt.target.parentNode.title;
        }
    }

}); // define <editable-header>

// **************************************************************************** <project-img>
customElements.define("project-img", class extends BaseClassHTMLElement {
    // ======================================================================== connectedCallback
    $connected() {
        log("<project-img>", this.id)
        this.render(); // render once
    }
    // ======================================================================== render
    render() {
        // -------------------------------------------------------------------- 
        this.render = () => { }; // render once, drag-drop makes connectedCallback run again
        this.ondragover = evt => evt.preventDefault(); //! required
        this.onanimationend = () => {
            this.style.animationDelay = ""; // reset original delay
        }
        // -------------------------------------------------------------------- append <img> and <editable-header>
        this.append(
            createElement("editable-header", {
                id: this.id,
                innerHTML: this.text,
            }),
            this.img = createElement("img", {
                src: this.src,
                draggable: true, // dragging <img> not <project-img>
            }),
        ); // append
        // -------------------------------------------------------------------- attach events
        this.attachEvents(this.img); // attach all event_ methods to IMG
    } // render
    // ======================================================================== ondragstart
    event_ondragstart(evt) {
        let draggingID = this.id; //evt.target.parentNode.id
        evt.dataTransfer.setData("id", draggingID);
        //! Custom drag drop
        // const dragImage = this.cloneNode(true);
        // dragImage.style.position = 'absolute';
        // dragImage.style.left = '-9999px';
        // dragImage.style.width = this.style.width;
        // dragImage.id = "DRAGIMAGE";
        // dragImage.style.top = '-9999px';
        // document.body.append(dragImage);
        // evt.dataTransfer.setDragImage(dragImage, evt.clientX, evt.clientY);
    }
    // ======================================================================== ondragend
    // event_ondragend(evt) {
    //     //! Custom drag drop
    //     // document.getElementById("DRAGIMAGE")?.remove();
    // }
    // ======================================================================== ondrop
    event_ondrop(evt) {
        let projectCartoonImages = this.closest("project-cartoon-images");
        let id = evt.dataTransfer.getData("id"); // p1 ... p10
        let draggedElement = projectCartoonImages.querySelector("#" + id); // <project-img> dragged
        log("switch ", draggedElement.id, this.id);
        let imgs = [...projectCartoonImages.children];
        // -------------------------------------------------------------------- insert draggedElement before/after this
        if (imgs.indexOf(draggedElement) < imgs.indexOf(this)) this.after(draggedElement);
        else this.before(draggedElement);
        // -------------------------------------------------------------------- save order
        this.getRootNode().host.saveOrder();
    }

}) // define <project-img> 