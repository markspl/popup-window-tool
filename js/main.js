/**
 * @author Markus (https://github.com/markspl)
 */

// Check if array is saved in local storage
if (localStorage.popupLinks) {
    var popupLinks = JSON.parse(localStorage.popupLinks);
} else {
    var popupLinks = [];
}

// Check if style is set in local storage
if (localStorage.style) {
    var style = JSON.parse(localStorage.style);
} else {
    var style = "light";
}

function checkLength() {
    /**
     * Check and returns the count of popup links.
     */
    return popupLinks.length || 0;
}

window.onload = function () {
    if (window.chrome === null || window.chrome === undefined) {
        document.getElementById("warning").style.display = "block";
    }

    if (localStorage.style) {
        if (style == "light") { document.body.className = "style-light"; }
        if (style == "dark") { document.body.className = "style-dark"; }
    }

    if (localStorage.popupLinks) {
        let num = checkLength();

        let link = "";
        for (i = 0; i < (num); i++) {
            if (popupLinks[i].includes("file:///")) {
                link += '<i class="fa fa-file" aria-hidden="true"></i>'
                link += "<a href='#' onclick='openLink(" + i + ");'>" + popupLinks[i] + "</a>";
                if (i < 5) {
                    link += "<br>";
                }
            } else {
                link += "<img src='https://www.google.com/s2/favicons?domain=" + popupLinks[i] + "'>";
                link += "<a href='#' onclick='openLink(" + i + ");'>" + popupLinks[i] + "</a>";
                if (i < 5) {
                    link += "<br>";
                }
            }
        }

        document.getElementById("latestLink").innerHTML = link;
        document.getElementById("trash").innerHTML = '<a href="#" title="Remove visited links" onclick="removeLinks();"><i class="fa fa-trash-o" aria-hidden="true"></i></span></a>';
    }
}

function openAddress() {
    /**
     * Open popup window
     * TODO: Open another link in another popup window
     */
    let num = checkLength();
    if (num > 4) { num = 4; }
    let address = document.getElementById("address").value;

    if (address.includes("http://") || address.includes("https://")) {
        window.open(address, "popup", "width=809,height=525");
    } else if (address.includes("file:///")) {
        address.replace("file:///", "");
        window.open(address, "popup", "width=809,height=525");
    } else {
        window.open("https://" + address, "popup", "width=809,height=525");
    }

    for (i = num; i > -1; i--) {
        if (i == 0) {
            popupLinks[0] = address;
            break;
        }
        let temp = popupLinks[i - 1]
        popupLinks[i] = temp;
        if (i == 0) {
            popupLinks[i] = address;
            break;
        }
    }

    localStorage.popupLinks = JSON.stringify(popupLinks);
    document.location.reload(true);
}

function openLink(i) {
    /**
     * Open specific link listed on Last Used Link(s) -topic
     * TODO: Show page title as name instead of the actual link
     */
    if (popupLinks[i].includes("http://") || popupLinks[i].includes("https://")) {
        window.open(popupLinks[i], "popup", "width=809,height=525");
    } else if (popupLinks[i].includes("file:///")) {
        popupLinks[i].replace("file:///", "");
        window.open(popupLinks[i], "popup", "width=809,height=525");
    } else {
        window.open("http://" + popupLinks[i], "popup", "width=809,height=525");
    }
}

function removeLinks() {
    /**
     * Remove all listed links
     */
    localStorage.removeItem("popupLinks");
    location.reload();
}

function changeTheme() {
    /**
     * Change page theme between dark and light theme
     */
    if (style == "light") {
        document.body.className = "style-dark";
        localStorage.style = JSON.stringify("dark");
    }
    if (style == "dark") {
        document.body.className = "style-light";
        localStorage.style = JSON.stringify("light");
    }

    location.reload();
}