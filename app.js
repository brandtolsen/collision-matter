const {Engine, Render, Bodies, World, MouseConstraint, Composites} = Matter

const sectionTag = document.querySelector("section.shapes")

const w = window.innerWidth
const h = window.innerHeight

const engine = Engine.create()
const renderer = Render.create({
    element: sectionTag,
    engine: engine,
    options: {
        height: h,
        width: w,
        background: "#ffffff",
        wireframes: false,
        pixelRatio: window.devicePixelRatio
    }
})

// create vector shapes
const boxA = function (x, y) {
    return Bodies.rectangle(x, y, 75, 75, {
        render: {
                    fillStyle: "#C6DBBA" // green
        }
    })
}
const boxB = function (x, y) {
    return Bodies.rectangle(x, y, 100, 100, {
        render: {
                    fillStyle: "#F7CA17" // yellow
        }
    })
}


// create shapes from sprites
const createShape = function (x, y) {
    const randomNum = Math.random()

    if (randomNum > 0.8) {
        return Bodies.rectangle(x, y, 75, 62.25, {
            render: {
                sprite: {
                    texture: "halfcircle-2x.png",
                    xScale: 0.75,
                    yScale: 0.75
                }
            }
        })
    }
    
    else if (randomNum > 0.5) { 
        return Bodies.circle(x, y, 50, {
            render: {
                sprite: {
                    texture: "splitcircle-2x.png",
                    xScale: 0.50,
                    yScale: 0.50
                }
            }
        })
    }

    else if (randomNum > 0.2) { 
        return Bodies.circle(x, y, 50, {
            render: {
                sprite: {
                    texture: "splitcircle-2x.png",
                    xScale: 0.50,
                    yScale: 0.50
                }
            }
        })
    }

    else {
        return Bodies.circle(x, y, 75, {
            render: {
                sprite: {
                    texture: "circle-2x.png",
                    xScale: 0.75,
                    yScale: 0.75
                }
            }
        })
    }
}

const bigBall = Bodies.rectangle(w / 2, h / 2, Math.min(w/1.5, h/1.5), 110, {
    isStatic: true,
    render: {
        fillStyle: "#fff"
    }
})

const wallOptions = {
    isStatic: true,
    render: {
        visible: false
    }
}

const ground = Bodies.rectangle(w / 2, h + 50, w + 100, 120, wallOptions)
const ceiling = Bodies.rectangle(w / 2, -50, w + 100, 120, wallOptions)
const leftWall = Bodies.rectangle(-50, h / 2, 100, h + 100, wallOptions)
const rightWall = Bodies.rectangle(w + 50, h / 2, 100, h + 100, wallOptions)

const mouseControl = MouseConstraint.create(engine, {
    element: sectionTag,
    constraint: {
        render: {
            visible: false
        }
    }
})

const initialShapes = Composites.stack(50, 50, 15, 5, 40, 40, function (x, y) {
    return createShape (x, y)
})
const box1 = Composites.stack(50, 50, 10, 1, 40, 40, function (x, y) {
    return boxA (x, y)
})
const box2 = Composites.stack(50, 50, 10, 1, 40, 40, function (x, y) {
    return boxB (x, y)
})

World.add(engine.world, [
    bigBall, 
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl,
    initialShapes,
    box1,
    box2,
])

// run both engine and renderer
Engine.run(engine)
Render.run(renderer)

window.addEventListener("deviceorientation", function (event) {
    engine.world.gravity.x = event.gamma / 30
    engine.world.gravity.y = event.beta / 30
})