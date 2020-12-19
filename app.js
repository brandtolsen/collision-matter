// first thing matter needs: an engine - computation and math
// second thing matter needs: a renderer - this draw the engine

// alias is a shortcut to make the code cleaner
// const Engine = Matter.Engine
// const Render = Matter.Render
const {Engine, Render, Bodies, World, MouseConstraint, Composites} = Matter

// where is matter being deployed
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


// create shapes
const createShape = function (x, y) {
    return Bodies.circle(x, y, 20 + 20 * Math.random(), {
        render: {
            fillStyle: "#475DA7"
        }
    })
}

const bigBall = Bodies.circle(w / 2, h / 2, 250, {
    isStatic: true,
    render: {
        fillStyle: "#1E1F41"
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
    return createShape(x, y)
})

World.add(engine.world, [
    bigBall, 
    ground,
    ceiling,
    leftWall,
    rightWall,
    mouseControl,
    initialShapes
])

// when we click the page, add a new shape
document.addEventListener("click", function (event) {
    const shape = createShape(event.pageX, event.pageY)
    World.add(engine.world, shape)
})

// run both engine and renderer
Engine.run(engine)
Render.run(renderer)