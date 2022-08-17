let start = document.querySelector(".control span");
start.onclick = function () {
    let theName = prompt("What's your name?");
    if (theName == null || theName == "") {
        document.querySelector(".name span").innerHTML = "Unknown";
    } else {
        document.querySelector(".name span").innerHTML = theName;
    }
    document.querySelector(".control").remove();
};

let duration = 1000;
let blockContainer = document.querySelector(".memory-game-container");
let blocks = Array.from(blockContainer.children);

let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange);

blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
    block.addEventListener('click', function () {
        flipBlock(block)
    })
});

function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
    return array;
}

function flipBlock(selectedBlock) {
    selectedBlock.classList.add('flip')
    let flipBlocks = blocks.filter(flipedBlock => flipedBlock.classList.contains('flip'))
    if (flipBlocks.length === 2) {
        stopClick()
        isMatched(flipBlocks[0], flipBlocks[1])
    }
}
function stopClick() {
    //add class no click on main container
    blockContainer.classList.add('no-click')

    setTimeout(() => {
        blockContainer.classList.remove('no-click')
    }, duration);
}

function isMatched(first, second) {
    let triesEle = document.querySelector('.tries span')
    if (first.dataset.tech === second.dataset.tech) {
        first.classList.remove('flip')
        second.classList.remove('flip')
        first.classList.add('match')
        second.classList.add('match')
        // document.getElementById('#success').play
    } else {
        setTimeout(() => {
            first.classList.remove('flip')
            second.classList.remove('flip')
        }, duration);
        triesEle.innerHTML = parseInt(triesEle.innerHTML) + 1
        // document.getElementById('#failure').play
    }
}