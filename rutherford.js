// rutherford.js

// Physics simulation and animation logic for alpha particles and Coulomb force calculation

class AlphaParticle {
    constructor(mass, charge, position, velocity) {
        this.mass = mass; // Mass of the alpha particle
        this.charge = charge; // Charge of the alpha particle
        this.position = position; // Position vector
        this.velocity = velocity; // Velocity vector
    }

    updatePosition(deltaTime) {
        this.position.x += this.velocity.x * deltaTime;
        this.position.y += this.velocity.y * deltaTime;
    }
}

class CoulombForce {
    static calculateForce(particle1, particle2) {
        const k = 8.9875517873681764e9; // Coulomb's constant in N m²/C²
        const distanceVector = {
            x: particle2.position.x - particle1.position.x,
            y: particle2.position.y - particle1.position.y,
        };
        const distance = Math.sqrt(distanceVector.x ** 2 + distanceVector.y ** 2);
        const forceMagnitude = (k * particle1.charge * particle2.charge) / (distance ** 2);
        const forceDirection = {
            x: distanceVector.x / distance,
            y: distanceVector.y / distance,
        };
        return {
            x: forceDirection.x * forceMagnitude,
            y: forceDirection.y * forceMagnitude,
        };
    }
}

function animateScene(context) {
    const particles = [
        new AlphaParticle(4.001506, 2 * 1.602176634e-19, {x: 100, y: 100}, {x: 1, y: 0}),
        new AlphaParticle(4.001506, 2 * 1.602176634e-19, {x: 300, y: 100}, {x: -1, y: 0})
    ];

    function render() {
        context.clearRect(0, 0, context.canvas.width, context.canvas.height);
        particles.forEach(particle => {
            particle.updatePosition(0.1);
            context.beginPath();
            context.arc(particle.position.x, particle.position.y, 5, 0, Math.PI * 2);
            context.fill();
        });
        requestAnimationFrame(render);
    }
    render();
}

// Example usage with drawing context
// const canvas = document.getElementById('myCanvas');
// const context = canvas.getContext('2d');
// animateScene(context); 
