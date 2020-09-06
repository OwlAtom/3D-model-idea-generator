function getYear() {
    let currentYear = new Date().getFullYear();
    let title = document.getElementById("copyright");
    title.innerHTML = `©${currentYear} OwlAtom`;
}
let body = document.querySelector("body");
body.addEventListener("keydown", function (event) {
    console.log(event.keyCode)
});
body.addEventListener("mousedown", function (event) {
    // console.log(event.path[0])
});



let blockerElement = document.createElement("div");
blockerElement.classList.add("pageBlocker");
blockerElement.id = "pageBlocker";
let confirmResponseValue = false;
let promptResponseValue = "";

let owl = {
    alert: function (message) {
        owl.blockPage();
        //must have ok button and nothing else.
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">Alert</p>
        <p >${message}</p>
        <button onclick="owl.unblockPage();">OK</button>
        </div>`;
        body.addEventListener("keyup", owl.eventListener.alert(event));
    },
    customAlert: function (title, message) {
        owl.blockPage();
        //alerts the user with a custom message and title
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">${title}</p>
        <p >${message}</p>
        <button onclick="owl.unblockPage();">OK</button>
        </div>`;
        body.addEventListener("keyup", owl.eventListener.alert(event));
    },
    confirm: function (message) {
        owl.blockPage();
        // Works like connfirm();
        // except the return value is stored in "confirmResponseValue"
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">Confirm</p>
        <p >${message}</p>
        <button onclick="owl.confirmResponse(true);">OK</button>
        <button onclick="owl.confirmResponse(false);">Cancel</button>
        </div>`
        body.addEventListener("keyup", owl.eventListener.confirm(event));
    },
    customConfirm: function (title, message) {
        owl.blockPage();
        //The same as the other confirm, but with custom title
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">${title}</p>
        <p >${message}</p>
        <button onclick="owl.confirmResponse(true);">OK</button>
        <button onclick="owl.confirmResponse(false);">Cancel</button>
       </div>`
        // body.addEventListener("keyup", owl.eventListener.confirm(event));

    },
    fullCustomConfirm: function (title, message, trueFunction, falseFunction) {
        owl.blockPage();
        //The same as the other confirm, but with custom title and custom functions
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">${title}</p>
        <p >${message}</p>
        <button onclick="${trueFunction}">OK</button>
        <button onclick="${falseFunction}">Cancel</button>
        </div>`
    },
    confirmResponse: function (value) {
        owl.unblockPage()
        confirmResponseValue = value;
        return value;
    },
    prompt: function (message, placeholder) {
        owl.blockPage();
        //text input
        //returns input as string
        blockerElement.innerHTML = `<div class="modalBox">
        <p class="modalTitle">Attention</p>
        <p>${message}</p>
        <input type="text" id="promptTextBox" placeholder="${placeholder}">
        <button onclick="owl.promptResponse(this);">OK</button>
        </div>`
        let textBox = document.querySelector("#promptTextBox")
        textBox.focus();
        textBox.addEventListener("keyup", function (event) {
            if (event.keyCode === 13) {
                owl.promptResponse(this);
            }
        });

    },
    promptResponse: function (value) {
        value = document.querySelector("#promptTextBox").value;
        owl.unblockPage()
        promptResponseValue = value;
        console.log(promptResponseValue);
        return value;
    },
    /* listen for y/enter or n/ESC clicks on keyboard
        eventListener: {
            alert: function (event) {
                if (event.keyCode === 13) {
                    owl.unblockPage();
                }
            },
            confirm: function (event) {
                if (event.keyCode === 13 || event.keyCode === 89) {
                    //accept
                    owl.confirmResponse(true)
                } else if (event.keyCode === 78 || event.keyCode === 27) { 
                    //cancel
                    owl.confirmResponse(false)
                }
            },
            prompt: function (event) {

            }
        },*/
    blockPage: function () {
        let body = document.querySelector("body");
        body.append(blockerElement);
    },
    unblockPage: function (value) {
        owl.removeElement(blockerElement);
        blockerElement.innerHTML = "";
        return value;
    },
    removeElement: function (element) {
        element.parentNode.removeChild(element);
    },
    fillAllBlanks: function (type, fill) {
        document.querySelector(`#${type}`).innerText = fill;
        let string = "";
        if (type == "prefix") {
            string = `What Does ${fill} Mean`
            document.querySelector(`#${type}LinkText`).innerText = string;
            string = `https://www.google.com/search?&q=${fill}+definition`
            document.querySelector(`#${type}Link`).href = string;
        } else {
            string = `Need Reference Images Of ${fill}?`
            document.querySelector(`#${type}LinkText`).innerText = string;
            string = `https://www.google.com/search?tbm=isch&q=${fill}`
            document.querySelector(`#${type}Link`).href = string;
        }
    },
    random3DModel: function () {
        let chosenPrefix = prefix[Math.floor(Math.random() * prefix.length)];
        let chosenItem = item[Math.floor(Math.random() * item.length)];
        owl.fillAllBlanks("prefix", chosenPrefix)
        owl.fillAllBlanks("item", chosenItem)
    }
}

let prefix = ["new", "old", "modern", "asian", "useless", "tall", "big", "small", "short", "blue", "green", "red", "yellow", "sad",
    "happy", "dangerous", "calm", "safe", "computer", "efficient", "smart", "cool", "hot", "broken", "empty", "full", "dirty", "clean",
    "custom", "fabricated", "different", "dimensional", "large", "linear", "multidimensional", "parallel", "rectangular", "regular", "solar", "vast",
    "attractive", "bald", "beautiful", "chubby", "clean", "dazzling", "drab", "elegant", "fancy", "fit", "flabby", "glamorous", "gorgeous", "handsome",
    "long", "magnificent", "muscular", "plain", "plump", "quaint", "scruffy", "shapely", "short", "skinny", "stocky", "ugly", "unkempt", "unsightly",
    "ashy", "black", "blue", "gray", "green", "icy", "lemon", "mango", "orange", "purple", "red", "salmon", "white", "yellow", "alive", "better",
    "careful", "clever", "dead", "easy", "famous", "gifted", "hallowed", "helpful", "important", "inexpensive", "mealy", "mushy", "odd", "poor",
    "powerful", "rich", "shy", "tender", "unimportant", "uninterested", "vast", "wrong", "aggressive", "agreeable", "ambitious", "brave", "calm",
    "delightful", "eager", "faithful", "gentle", "happy", "jolly", "kind", "lively", "nice", "obedient", "polite", "proud", "silly", "thankful",
    "victorious", "witty", "wonderful", "zealous", "angry", "bewildered", "clumsy", "defeated", "embarrassed", "fierce", "grumpy", "helpless",
    "itchy", "jealous", "lazy", "mysterious", "nervous", "obnoxious", "panicky", "pitiful", "repulsive", "scary", "thoughtless", "uptight", "worried",
    "broad", "chubby", "crooked", "curved", "deep", "flat", "high", "hollow", "low", "narrow", "refined", "round", "shallow", "skinny", "square", "steep",
    "straight", "wide", "big", "colossal", "fat", "gigantic", "great", "huge", "immense", "large", "little", "mammoth", "massive", "microscopic",
    "miniature", "petite", "puny", "scrawny", "short", "small", "tall", "teeny", "tiny", "crashing", "deafening", "echoing", "faint", "harsh", "hissing",
    "howling", "loud", "melodic", "noisy", "purring", "quiet", "rapping", "raspy", "rhythmic", "screeching", "shrilling", "squeaking", "thundering",
    "tinkling", "wailing", "whining", "whispering", "ancient", "brief", "early", "fast", "future", "late", "long", "modern", "old", "old-fashioned",
    "prehistoric", "quick", "rapid", "short", "slow", "swift", "young", "acidic", "bitter", "cool", "creamy", "delicious", "disgusting", "fresh",
    "greasy", "juicy", "hot", "moldy", "nutritious", "nutty", "putrid", "rancid", "ripe", "rotten", "salty", "savory", "sour", "spicy", "spoiled",
    "stale", "sweet", "tangy", "tart", "tasteless", "tasty", "yummy", "breezy", "bumpy", "chilly", "cold", "cool", "cuddly", "damaged", "damp", "dirty",
    "dry", "flaky", "fluffy", "freezing", "greasy", "hot", "icy", "loose", "melted", "prickly", "rough", "shaggy", "sharp", "slimy", "sticky", "strong",
    "tight", "uneven", "warm", "weak", "wet", "wooden", "abundant", "billions", "enough", "few", "full", "hundreds", "incalculable", "limited", "little",
    "many", "most", "millions", "numerous", "scarce", "some", "sparse", "substantial", "thousands"
];
let item = ["pen", "sword", "cup", "wallet", "cake", "candy bar", "mouse", "cover", "fork", "spoon", "knife", "outlet", "controller",
    "lens", "charger", "plug", "headset", "flyer", "case", "monitor", "keyboard", "light", "model", "screw", "mask", "speaker", "lint roller",
    "cabinet", "drawer", "desk", "phone", "coin", "cash", "journal", "book", "coupon", "battery", "toy", "bowl", "device", "cable", "shirt", "pair of pants",
    "camera", "calculator", "calendar", "watch", "clock", "mousemat", "chocolate", "tissue box", "bread", "pen", "playing card", "lamp", "hanger",
    "wallet", "plate", "speakers", "nail clippers", "chair", "thread", "drill press", "clothes", "hair tie", "ice cube tray", "blanket", "sun glasses",
    "bow", "desk", "scotch tape", "car", "house", "sailboat", "greeting card", "grid paper", "cat", "thermometer", "video games", "nail file", "tv",
    "magnet", "perfume", "soap", "watch", "towel", "bowl", "spring", "glasses", "puddle", "eraser", "glow stick", "chalk", "clock", "fork", "mp3 player",
    "toe ring", "boom box", "tree", "doll", "candle", "rubber duck", "sponge", "box", "charger", "clamp", "paint brush", "sand paper", "bananas",
    "cookie jar", "soy sauce packet", "floor", "lace", "screw", "water bottle", "carrots", "clay pot", "street lights", "mop", "bag", "beef", "truck",
    "door", "rusty nail", "blouse", "teddies", "USB drive", "bookmark", "lotion", "needle", "knife", "plastic fork", "air freshener", "keyboard",
    "book", "flag", "slipper", "mouse pad", "apple", "shirt", "picture frame", "checkbook", "packing peanuts", "helmet", "brocolli", "stockings",
    "lamp shade", "drawer", "controller", "lip gloss", "soda can", "shoes", "toothbrush", "washing machine", "sofa", "hair brush", "shampoo", "sandal",
    "radio", "rug", "pillow", "buckel", "bed", "zipper", "conditioner", "sticky note", "table", "glass", "newspaper", "remote", "deodorant", "CD",
    "tomato", "stop sign", "ipod", "fridge", "monitor", "flowers", "phone", "window", "cup", "toothpaste", "sharpie", "fake flowers", "twezzers",
    "sidewalk", "camera", "tire swing", "paper", "coasters", "ring", "pants", "bottle cap", "toilet", "shawl", "face wash", "milk", "television",
    "seat belt", "candy wrapper", "pool stick", "white out", "wagon", "couch", "model car", "headphones", "computer", "cork", "piano", "balloon",
    "pencil", "outlet", "money", "mirror", "thermostat", "shovel", "spoon", "cell phone", "bracelet", "credit card", "photo album", "eye liner",
    "shoe lace", "key chain", "tooth picks", "socks", "button", "food", "canvas", "rubber band", "leg warmers", "twister", "bottle", "sketch pad",
    "chapter book", "cinder block", "keys", "purse", "vase"
];