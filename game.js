    // module aliases
    const  {Engine,Render,Runner,Body,World,Bodies,Composite,Events} = Matter;
    // create an engine
    const engine = Engine.create();
    
    // create a renderer
    const render = Render.create({
        element: document.body,
        engine: engine,
        options : {
            wireframes: false,
        }
    });
    
    // create two boxes and a ground
    const boxA = Bodies.rectangle(400, 200, 80, 80,{
      render: {
        fillStyle: "red",
        strokeStyle: "black",
        lineWidth: 1,
      }
    }
    );
    const boxB = Bodies.rectangle(450, 50, 80, 80);
    const ground = Bodies.rectangle(400, 610, 810, 60, { isStatic: true });
    const circle = Bodies.circle(300,40, 25);
    
    
    // add all of the bodies to the world
    Composite.add(engine.world, [circle,boxA, boxB, ground]);
    
     
    
    
    document.addEventListener("keydown", (event) => {
        let keyCode = event.keyCode;
        let position = boxA.position;
        let speed = 5; // set the speed of movement
        
        // move the body based on the key pressed
        if (keyCode === 37) {
            // move left
            Body.translate(boxA, { x: -speed, y: 0 });
        } else if (keyCode === 38) {
            // move up
            Body.translate(boxA, { x: 0, y: -speed });
        } else if (keyCode === 39) {
            // move right
            Body.translate(boxA, { x: speed, y: 0 });
        } else if (keyCode === 40) {
            // move down
            Body.translate(boxA, { x: 0, y: speed });
        }
    });
    
    document.body.addEventListener("mousedown", (event) => {
      const { x, y } = event;
      const newBody = Bodies.rectangle(x, y, 50, 50);
      World.add(engine.world, newBody);
    });
    
    // Check for collisions
    Events.on(engine, "collisionStart", (event) => {
      const pairs = event.pairs;
    
      for (let i = 0; i < pairs.length; i++) {
        const pair = pairs[i];
    
        if (pair.bodyA === boxA && pair.bodyB === circle) {
          // Game over
          alert("Game over!");
          window.location.reload(true);
    
        }
      }
    });
    
    
    
    // run the renderer
    Render.run(render);
    
    // create runner
    const runner = Runner.create();
    
    // run the engine
    Runner.run(runner, engine);