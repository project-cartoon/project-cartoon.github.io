!(function () {
/*
    <project-cartoon>
        <project-cartoon-images>
            <project-img>
                <editable-header></editable-header>
                <img>
            </project-img>
            <project-img>
                <editable-header></editable-header>
                <img>
            </project-img>
        </project-cartoon-images>
        <footer>
            <language-links></language-links>
        </footer>
    </project-cartoon>
*/
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
        `Tree Swing history : <a href="https://www.businessballs.com/amusement-stress-relief/tree-swing-cartoon-pictures-early-versions/">all versions since the 1970s</a>` +
        `<div id=desktop>Best viewed on Desktop</div>`
    ].join(" - ");
    // **************************************************************************** styles
    const styles = `
    :host{
        --title-background-color: #316300;
        --title-color: beige;
        --cartoon-gap: 8px;
        --cartoon-height: 88vh;
        --cartoon-height-img: 91%;
        display:inline-block;
        width: 100%;
        height: var(--cartoon-height);
        }
        #desktop {
            display:none;
            color:darkred;
            font-size:120%;
            font-weight:bold;
            }
            project-cartoon-images {
                display:grid;
                grid: 1fr 1fr/ repeat(5, 1fr);
                gap: var(--cartoon-gap);
                justify-content: center;
                align-items: center;
                width: 100%;
                height: 100%;
                }
                @media (max-width: 600px) {
                    :host {
                        }
        #desktop {
            display:block;
            }
            project-cartoon-images {
                grid: repeat(5,1fr) / repeat(2, 1fr);

                }
                }
                project-img {
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
                    }
                    project-img::after{
                        content: attr(id);
                        position: absolute;
                        color: beige;
                        opacity: .5;
                        text-align: center;
                        font-size: 80%;
                        bottom: 0;
                        width: 100%;
                        }
                        project-img img {
                            position: absolute;
                            top: 2em;
                            right: 0;
                            bottom: 0;
                            left: 0;
                            width: 100%;
                            height: var(--cartoon-height-img);
                            }
                            project-img editable-header {
                                font-size: 80%;
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
                                }
                                footer {
                                    margin: .5em;
                                    text-align: center;
                                    font-size: 80%;
                                    }
                                    `;
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
        get projectCartoon() {
            return this.getRootNode().host;
        }
        // ======================================================================== BaseClass connectedCallback
        connectedCallback() {
            this.$connected && this.$connected();
        }
        // ======================================================================== BaseClass attachEvents
        // process all methods starting with "event_" and attach them to the root element
        attachEvents({
            root = this, // where events are attached
            prefix = "event_", // prefix on method name to match
            logEvents = false // log events to console
        }) {
            Object.getOwnPropertyNames(Object.getPrototypeOf(this))
                .filter(method => method.startsWith(prefix))
                .forEach(method => {
                    let eventType = method.split('_').pop();
                    if (logEvents) log(this.nodeName, this.id, "add Event:", eventType);
                    root[eventType] = (evt) => {
                        if (logEvents) log(prefix + eventType);
                        this[method](evt)
                    }
                });
        }
        // ======================================================================== BaseClass ElementFromXY
        // drill down shadowRoots to find the element under the XY coordinates
        ElementFromXY(clientX, clientY, root = document) {
            function ElementFromXY(clientX, clientY, root) {
                let elements = root.elementsFromPoint(clientX, clientY);
                let element = elements[0];
                return element?.shadowRoot ? ElementFromXY(clientX, clientY, element.shadowRoot) : element;
            }
            return ElementFromXY(clientX, clientY, root);
        }

    } // BaseClassHTMLElement

    // **************************************************************************** <laguage-links>
    customElements.define("language-links", class extends BaseClassHTMLElement {
        // ======================================================================== <language-links> connectedCallback
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
        draggingIMG = undefined;
        // ======================================================================== <project-cartoon> connectedCallback
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
                    // ------------------------------------------------------------ main projectCartoonImages
                    this.projectCartoonImages = createElement("project-cartoon-images"),
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
                        projectCartoonImages: this.projectCartoonImages,
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
            ) // appendImages
            // -------------------------------------------------------------------- main JS
            setTimeout(() => this.animation.remove(), 2000);
            this.restoreOrder();
        }
        // ======================================================================== <project-cartoon> get projectIMGs
        get projectIMGs() {
            return [...this.shadowRoot.querySelectorAll("project-img")];
        }
        // ======================================================================== <project-cartoon> get/set order
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
        // ======================================================================== <project-cartoon> appendIMGs
        appendImages(imgs = []) {
            this.projectCartoonImages.append(...imgs);
        }
        // ======================================================================== <project-cartoon> saveOrder
        saveOrder(order = this.order) {
            log("saveOrder", order);
            localStorage.setItem(this.nodeName, order);
        }
        // ======================================================================== <project-cartoon> restoreOrder
        restoreOrder(order = localStorage.getItem(this.nodeName)) {
            log("restoreOrder", order);
            if (order) this.order = order;
        }
        // ======================================================================== <project-cartoon> reset
        reset() {
            localStorage.clear();
        }
    });

    // **************************************************************************** <editable-header>
    customElements.define("editable-header", class extends BaseClassHTMLElement {
        // ======================================================================== <editable-header> connectedCallback
        $connected() {
            this.contentEditable = true;
            this.attachEvents({});
        } // connectedCallback
        // ======================================================================== <editable-header> onkeydown
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
        // ======================================================================== <editable-header> onkeyup
        event_onkeyup(evt) {
            localStorage.setItem(this.id, (evt.target.innerHTML));
        }
        // ======================================================================== <editable-header> onclick
        event_onclick(evt) {
            if (evt.ctrlKey) {
                localStorage.removeItem(this.id);
                evt.target.innerHTML = evt.target.parentNode.title;
            }
        }

    }); // define <editable-header>

    // **************************************************************************** <project-img>
    customElements.define("project-img", class extends BaseClassHTMLElement {
        // ======================================================================== <project-img> connectedCallback
        $connected() {
            log("<project-img>", this.id)
            this.render(); // render once
        }
        // ======================================================================== <project-img> render
        render() {
            // -------------------------------------------------------------------- render ONCE
            this.render = () => { }; // render once, drag-drop makes connectedCallback run again

            // -------------------------------------------------------------------- append <img> and <editable-header>
            this.append(
                createElement("editable-header", {
                    id: this.id,
                    innerHTML: this.text,
                }),
                this.img = createElement("img", {
                    src: this.src,
                    draggable: true, // dragging <img> not <project-img> on DeskTop
                }),
            ); // append
            // -------------------------------------------------------------------- attach events
            // attach all event_ methods to IMG
            this.attachEvents({ root: this.img, prefix: "event_", logEvents: true });
            // attach all touchevent_ methods to <project-img>
            this.attachEvents({ root: this, prefix: "touchevent_", logEvents: true });
        } // render

        // ======================================================================== <project-img> onanimationend
        event_onanimationend() {
            this.style.animationDelay = ""; // reset original delay
            console.log("animationend", this.id);
        }
        // ======================================================================== <project-img> swapDOMnodes
        swapDOMnodes(id1, id2 = this.id) {
            const getCartoon = id => this.projectCartoonImages.querySelector("#" + id);
            // -------------------------------------------------------------------- get <project-img> elements
            let el1 = getCartoon(id1);
            let el2 = getCartoon(id2);
            // -------------------------------------------------------------------- get relative elements
            let el1Next = el1.nextElementSibling;
            let el2Next = el2.nextElementSibling;
            // -------------------------------------------------------------------- swap elements
            if (el1Next === el2) {
                el1.before(el2);
            } else if (el2Next === el1) {
                el2.before(el1);
            } else {
                el1.replaceWith(el2);
                el2Next ? el2Next.before(el1) : this.projectCartoonImages.append(el1);
            }
            // -------------------------------------------------------------------- save order
            this.getRootNode().host.saveOrder();
        }

        // ======================================================================== DRAG DROP
        // ======================================================================== <project-img> ondragenter
        event_ondragenter(evt) {
            evt.preventDefault();
        }
        // ======================================================================== <project-img> ondragleave
        event_ondragleave(evt) {
            evt.preventDefault();
        }
        // ======================================================================== <project-img> ondragstart
        #customdragdropIMG = false;
        event_ondragstart(evt) {
            let draggingID = this.id; //evt.target.parentNode.id
            evt.dataTransfer.setData("id", draggingID);
            let { width, height } = this.img.getBoundingClientRect();
            if (this.#customdragdropIMG) {
                const __DRAGeffect_copy__ = "copy";
                const __DRAGeffect_move__ = "move";
                const __DRAGeffect_none__ = "none";
                // -------------------------------------------------------------------- set dataTransfer
                evt.dataTransfer.setData("text/html", ""); //! required for FireFox
                evt.dataTransfer.effectAllowed = evt.ctrlKey ? __DRAGeffect_copy__ : __DRAGeffect_move__;
                // -------------------------------------------------------------------- create dragImage
                const dragImage = this.img.cloneNode(true);
                dragImage.style.position = 'absolute';
                dragImage.style.top = '-9999px';
                dragImage.style.transform = 'translate(-50%, -50%)';
                this.projectCartoon.draggingIMG = document.body.appendChild(dragImage);
                // -------------------------------------------------------------------- setDragImage
                evt.dataTransfer.setDragImage(new Image(), 0, 0);
                evt.dataTransfer.setDragImage(document.createElement("div"), 0, 0); // Invisible div
                //evt.dataTransfer.setDragImage(dragImage, width/2, height/2);
                // setTimeout(() => document.body.removeChild(dragImage), 0);
            }
        }
        // ======================================================================== <project-img> ondragover
        event_ondragover(evt) {
            //! dragover Event must exist, defines a drop target captured by drop Event
            evt.preventDefault();
            let dragImage = this.projectCartoon.draggingIMG;
            if (dragImage) {
                dragImage.style.top = evt.clientY + "px";
                dragImage.style.left = evt.clientX + "px";
            }
        }
        // ======================================================================== <project-img> ondragend
        event_ondragend(evt) {
            //! executed when mouse button is released
            this.projectCartoon.draggingIMG?.remove?.();
            this.projectCartoon.draggingIMG = null;
        }
        // ======================================================================== <project-img> ondrop
        event_ondrop(evt) {
            //! dropped on valid drop target, ondragover must be defined to allow drop
            let id = evt.dataTransfer.getData("id"); // p1 ... p10
            this.swapDOMnodes(id);
        }

        // ======================================================================== TOUCHEVENTS
        // ======================================================================== <project-img> ontouchstart
        touchevent_ontouchstart(evt) {
            this.touchStartX = evt.touches[0].clientX;
            this.touchStartY = evt.touches[0].clientY;
            this.touchStartElement = this;
            log("touchstart", this.touchStartElement.id);
        }
        // ======================================================================== <project-img> ontouchmove
        touchevent_ontouchmove(evt) {
            evt.preventDefault();
            // -------------------------------------------------------------------- find element under touch
            let { clientX, clientY } = evt.touches[0];
            let draggingOverImg = this.ElementFromXY(clientX, clientY).closest("project-img");
            // -------------------------------------------------------------------- highlight element under touch
            if (draggingOverImg && draggingOverImg !== this.touchStartElement) {
                log("touchmove over", draggingOverImg.id);
                this.touchOverElement = draggingOverImg;
            } else {
                this.touchOverElement = null;
            }
        }
        // ======================================================================== <project-img> ontouchend
        touchevent_ontouchend(evt) {
            if (this.touchOverElement) {
                log("touchend", "this:", this.id, "start:", this.touchStartElement.id, "over:", this.touchOverElement.id);
                this.swapDOMnodes(this.touchOverElement.id);
            }
        }
    }) // define <project-img>
})()